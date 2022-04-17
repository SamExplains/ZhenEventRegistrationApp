import { StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { CalendarOutline, MenuIcon, PlusOutline } from "../../assets/icons";
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
  Toggle,
  Spinner,
} from "@ui-kitten/components";

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-native-modern-datepicker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Slider from "@react-native-community/slider";
import axios from "axios";
import Toast from "react-native-toast-message";
import baseUrl from "../../settings.json";

export const AddEventScreen = () => {
  // title
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  // description
  const [decription, setDecription] = useState("");
  const [decriptionError, setDecriptionError] = useState(false);

  // start date
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedStartDateError, setSelectedStartDateError] = useState(false);
  const [showStartSelector, setShowStartSelector] = useState(false);

  // end date
  // start date
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedEndDateError, setSelectedEndDateError] = useState(false);
  const [showEndSelector, setShowEndSelector] = useState(false);

  // Camera Library
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);

  // Location
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");

  const [publicChk, setPublicChk] = useState(false);
  const [offlineChk, setOfflineChk] = useState(false);
  const [checkinChk, setCheckinChk] = useState(false);

  const [capacity, setCapacity] = useState(0);

  const [eventUrl, setEventUrl] = useState("");
  const [eventUrlError, setEventUrlError] = useState(false);

  // Personal details
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(true);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(true);

  // Additional items
  const [additionalItem, setAdditionalItem] = useState("");
  const [additionalItems, setAdditionalItems] = useState([]);

  // Spinner
  const [awaiting, setAwaiting] = useState(false);

  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.eventsAndUsers.currentUser);
  const authenticated = useSelector(
    (state) => state.eventsAndUsers.authenticated
  );

  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );

  // Validations
  const onTitleBlur = () => {
    title.length ? setTitleError(true) : setTitleError(false);
  };

  const onDescriptionBlur = () => {
    title.length ? setDecriptionError(true) : setDecriptionError(false);
  };

  const onAddressBlur = () => {
    address.length ? setAddressError(true) : setAddressError(false);
  };
  const onCityBlur = () => {
    city.length ? setCityError(true) : setCityError(false);
  };
  const onZipBlur = () => {
    zip.length ? setZipError(true) : setZipError(false);
  };
  const onEventUrlBlur = () => {
    eventUrl.length ? setEventUrlError(true) : setEventUrlError(false);
  };

  const onEmailBlur = () => {
    email.length ? setEmailError(true) : setEmailError(false);
  };

  const onPhoneBlur = () => {
    phone.length ? setPhoneError(true) : setPhoneError(false);
  };

  // Date selectors
  const showDateSelector = () => {
    return showStartSelector ? (
      <DatePicker
        onSelectedChange={(date) => {
          setSelectedStartDate(date);
          setSelectedStartDateError(true);
        }}
      />
    ) : null;
  };

  const showEndDateSelector = () => {
    return showEndSelector ? (
      <DatePicker
        onSelectedChange={(date) => {
          setSelectedEndDate(date);
          setSelectedEndDateError(true);
        }}
      />
    ) : null;
  };

  const onPublicCheckedChange = (isChecked) => {
    setPublicChk(isChecked);
  };

  const onOfflineCheckedChange = (isChecked) => {
    setOfflineChk(isChecked);
  };

  const onCheckedinCheckedChange = (isChecked) => {
    setCheckinChk(isChecked);
  };

  const renderAdditionalItems = () => {
    const _c = [...additionalItems];
    return _c.map((item) => {
      return <Text key={item.id}>{item.name}</Text>;
    });
  };

  const onAddAdditionalItem = () => {
    additionalItem.length
      ? setAdditionalItems([
          ...additionalItems,
          {
            id: Math.floor(Math.random() * 1000),
            name: additionalItem,
            taken: null,
            checked: false,
          },
        ])
      : Toast.show({
          type: "error",
          text1: "Enter item name!",
        });
  };

  // Select image from library
  const pickImage = async (flag) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      flag === "first" ? setFirstImage(result.uri) : setSecondImage(result.uri);
    }
  };

  const isThereAnImageSelected = () => {
    let flag = null;
    if (firstImage && secondImage) {
      // 2 images will be transfered
      flag = "both";
    } else if (firstImage) {
      // first image will be transfered
      flag = "first";
    } else if (secondImage) {
      // second image will be transfered
      flag = "second";
    } else {
      // no images, send them an alert to choose a image
      Toast.show({
        type: "error",
        text1: "Select atleast 1 image!",
      });
    }
    return flag;
  };

  const onResetFields = () => {
    // title
    setTitle("");
    setTitleError(false);

    // description
    setDecription("");
    setDecriptionError(false);

    // start date
    setSelectedStartDate("");
    setSelectedStartDateError(false);
    setShowStartSelector(false);

    // end date
    // start date
    setSelectedEndDate("");
    setSelectedEndDateError(false);
    setShowEndSelector(false);

    // Camera Library
    setFirstImage(null);
    setSecondImage(null);

    // Location
    setAddress("");
    setAddressError(false);

    setCity("");
    setCityError(false);
    setZip("");
    setZipError("");

    setPublicChk(false);
    setOfflineChk(false);
    setCheckinChk(false);

    setCapacity(0);

    setEventUrl("");
    setEventUrlError(false);

    // Personal details
    setEmail("");
    setEmailError(true);
    setPhone("");
    setPhoneError(true);

    // Additional items
    setAdditionalItem("");
    setAdditionalItems([]);
  };

  const onSubmitEvent = async () => {
    const imageFlag = isThereAnImageSelected();
    // Validations
    if (
      titleError &&
      decriptionError &&
      selectedStartDateError &&
      selectedEndDateError &&
      addressError &&
      cityError &&
      zipError &&
      eventUrlError &&
      imageFlag !== null
    ) {
      setAwaiting(true);
      // Stringify Additional Items if array length exceeds 0
      // Reset state when done
      console.log("success");

      let firstBase64Image = null;
      let secondBase64Image = null;

      if (imageFlag === "both") {
        firstBase64Image = await FileSystem.readAsStringAsync(firstImage, {
          encoding: "base64",
        });
        secondBase64Image = await FileSystem.readAsStringAsync(secondImage, {
          encoding: "base64",
        });
      } else if (imageFlag === "first") {
        firstBase64Image = await FileSystem.readAsStringAsync(firstImage, {
          encoding: "base64",
        });
      } else if (imageFlag === "second") {
        secondBase64Image = await FileSystem.readAsStringAsync(secondImage, {
          encoding: "base64",
        });
      }

      // const base64 = await FileSystem.readAsStringAsync(secondImage, {
      //   encoding: "base64",
      // });

      // console.log("Base64 ", "data:image/png;base64, " + base64);

      await axios
        .post(`${baseUrl.api}/create`, {
          title: title,
          description: decription,
          start_time: selectedStartDate,
          end_time: selectedEndDate,
          first_image: firstBase64Image,
          second_image: secondBase64Image,
          address: address,
          city: city,
          zip: zip,
          public_private: publicChk,
          on_off_line: offlineChk,
          check_in: checkinChk,
          capacity: capacity,
          url: eventUrl,
          additional_items: JSON.stringify(additionalItems),
          email: email,
          phone: phone,
          creator_id: currentUser.id,
        })
        .then(({ data }) => {
          // Save event object to state
          // Check in verification field required for checking in!
          // console.log(data);
          onResetFields();
          setAwaiting(false);
        })
        .catch((error) => {
          console.log(error);
        });

      Toast.show({
        type: "success",
        text1: "Event has been saved.",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Fill all required fields!",
      });
    }
  };

  const addEventForm = () => {
    return (
      <ScrollView style={styles.scrollView}>
        <Layout>
          <Layout style={styles.hero}>
            <Text
              category="h6"
              style={{
                fontWeight: "bold",
                paddingLeft: 15,
                marginTop: 50,
                color: "white",
              }}
            >
              Create Event
            </Text>
            {/* Vector 1 */}
            <Image
              style={styles.vector1}
              source={require("../../assets/Vector(3).png")}
            />
            {/* Vector2 */}
            <Image
              style={styles.vector2}
              source={require("../../assets/Vector(1).png")}
            />
            {/* Vector3 */}
            <Image
              style={styles.vector3}
              source={require("../../assets/Vector(2).png")}
            />
          </Layout>
          <Layout style={styles.container}>
            {/* Title */}
            <Input
              style={styles.input}
              value={title}
              label="Event Title"
              placeholder="title"
              textContentType={"none"}
              clearButtonMode="always"
              returnKeyType="next"
              keyboardType="default"
              maxLength={30}
              onChangeText={(newTitle) => setTitle(newTitle)}
              onBlur={onTitleBlur}
              status={titleError ? "success" : "danger"}
            />
            {/* Description */}
            <Input
              style={styles.input}
              value={decription}
              label="Description"
              placeholder="description"
              textContentType={"none"}
              clearButtonMode="always"
              returnKeyType="next"
              keyboardType="default"
              multiline={true}
              numberOfLines={3}
              onChangeText={(newDescription) => setDecription(newDescription)}
              onBlur={onDescriptionBlur}
              status={decriptionError ? "success" : "danger"}
            />
            {/* Start date */}
            <Layout style={styles.timeContainer}>
              <Input
                style={styles.time_input}
                value={selectedStartDate}
                // disabled={true}
                label="Start time and date"
                placeholder="yyyy/mm/dd hh mm:ss"
                status={selectedStartDateError ? "success" : "danger"}
              />
              <Button
                style={styles.time_button}
                size="medium"
                accessoryLeft={CalendarOutline}
                onPress={() => setShowStartSelector(!showStartSelector)}
              />
            </Layout>
            {showDateSelector()}

            {/* End date */}
            <Layout style={styles.timeContainer}>
              <Input
                style={styles.time_input}
                value={selectedEndDate}
                // disabled={true}
                label="End time and date"
                placeholder="yyyy/mm/dd hh mm:ss"
                status={selectedEndDateError ? "success" : "danger"}
              />
              <Button
                style={styles.time_button}
                size="medium"
                accessoryLeft={CalendarOutline}
                onPress={() => setShowEndSelector(!showEndSelector)}
              />
            </Layout>
            {showEndDateSelector()}

            {/* Images */}
            <Layout style={styles.baseContainer}>
              <Image
                source={{ uri: firstImage }}
                style={styles.image}
                resizeMode="contain"
              />
              <Image
                source={{ uri: secondImage }}
                style={styles.image}
                resizeMode="contain"
              />
            </Layout>

            {/* Image Buttons */}
            <Layout style={styles.baseContainerBtn}>
              <Button
                style={styles.buttonAlt}
                size="small"
                title="Pick an image from camera roll"
                accessoryLeft={PlusOutline}
                onPress={() => pickImage("first")}
              />
              <Button
                style={styles.buttonAlt}
                size="small"
                title="Pick an image from camera roll"
                accessoryLeft={PlusOutline}
                onPress={() => pickImage("second")}
              />
            </Layout>

            {/* Address */}
            <Layout style={styles.locationContainer}>
              <Input
                style={styles.location_a}
                value={address}
                label="Address"
                placeholder="..."
                textContentType={"none"}
                clearButtonMode="always"
                returnKeyType="next"
                keyboardType="default"
                onChangeText={(newAddress) => setAddress(newAddress)}
                onBlur={onAddressBlur}
                status={addressError ? "success" : "danger"}
              />
              {/* City */}
              <Input
                style={styles.location_b}
                value={city}
                label="City"
                placeholder="..."
                textContentType={"none"}
                clearButtonMode="always"
                returnKeyType="next"
                keyboardType="default"
                onChangeText={(newCity) => setCity(newCity)}
                onBlur={onCityBlur}
                status={cityError ? "success" : "danger"}
                maxLength={2}
              />
              <Input
                style={styles.location_c}
                value={zip}
                label="Zipcode"
                placeholder="..."
                textContentType={"none"}
                clearButtonMode="always"
                returnKeyType="next"
                keyboardType="numeric"
                onChangeText={(newZip) => setZip(newZip)}
                onBlur={onZipBlur}
                status={zipError ? "success" : "danger"}
                maxLength={5}
              />
            </Layout>
            {/* Event Type Details */}
            <Layout style={styles.event_details_container}>
              <Layout style={styles.event_details_container_item}>
                <Text style={styles.label}>Public / Private</Text>
                <Toggle checked={publicChk} onChange={onPublicCheckedChange} />
              </Layout>
              <Layout style={styles.event_details_container_item}>
                <Text style={styles.label}>On / Off line</Text>
                <Toggle
                  checked={offlineChk}
                  onChange={onOfflineCheckedChange}
                />
              </Layout>
              <Layout style={styles.event_details_container_item}>
                <Text style={styles.label}>Check-In required</Text>
                <Toggle
                  checked={checkinChk}
                  onChange={onCheckedinCheckedChange}
                />
              </Layout>
            </Layout>

            <Layout
              style={{
                marginTop: 15,
                marginBottom: 15,
                paddingLeft: 15,
                paddinngrRight: 15,
              }}
            >
              <Text style={styles.label}>Capacity {capacity}</Text>
              <Slider
                minimumValue={0}
                maximumValue={500}
                value={capacity}
                onValueChange={(value) => setCapacity(value)}
                step={5}
                minimumTrackTintColor="#3F295A"
                maximumTrackTintColor="#909CB3"
                thumbTintColor="#3F295A"
              />
            </Layout>

            {/* Event URL */}
            <Input
              style={styles.input}
              value={eventUrl}
              label="Event URL or Meeting Link"
              placeholder="..."
              textContentType={"none"}
              clearButtonMode="always"
              returnKeyType="next"
              keyboardType="default"
              onChangeText={(newUrl) => setEventUrl(newUrl)}
              onBlur={onEventUrlBlur}
              status={eventUrlError ? "success" : "danger"}
            />
            {/* Additional Items */}
            <Layout
              style={{
                marginTop: 15,
                marginBottom: 15,
                paddingLeft: 15,
                paddinngrRight: 15,
              }}
            >
              <Text style={styles.label}>Additional items</Text>
              {renderAdditionalItems()}
            </Layout>

            {/* Add additional item input */}
            <Layout style={styles.additional_container}>
              <Input
                style={styles.additional_item_input}
                value={additionalItem}
                label="Add additional item"
                placeholder="..."
                textContentType={"none"}
                clearButtonMode="always"
                returnKeyType="next"
                keyboardType="default"
                maxLength={50}
                onChangeText={(newItem) => setAdditionalItem(newItem)}
              />
              <Button
                style={styles.additional_item_button}
                accessoryRight={PlusOutline}
                size="small"
                onPress={onAddAdditionalItem}
              />
            </Layout>
            {/* Email */}
            <Input
              style={styles.input}
              value={email}
              label="Email for people to see"
              placeholder="..."
              textContentType={"none"}
              clearButtonMode="always"
              returnKeyType="next"
              keyboardType="default"
              onChangeText={(newEmail) => setEmail(newEmail)}
              onBlur={onEmailBlur}
              status={emailError ? "success" : "danger"}
            />
            {/* Phone */}
            <Input
              style={styles.input}
              value={phone}
              label="Number to call you"
              placeholder="..."
              textContentType={"none"}
              clearButtonMode="always"
              returnKeyType="next"
              keyboardType={"phone-pad"}
              onChangeText={(newPhone) => setPhone(newPhone)}
              onBlur={onPhoneBlur}
              status={phoneError ? "success" : "danger"}
            />
            <Button style={styles.button} size="medium" onPress={onSubmitEvent}>
              Let's Go!
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
    );
  };

  const notAuthenticated = () => {
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h5">Not authorized</Text>
      </Layout>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Create Event"
        alignment="center"
        accessoryLeft={renderDrawerAction}
      />
      {authenticated ? (
        awaiting ? (
          <Layout style={styles.spinnerContainer}>
            <Spinner />
          </Layout>
        ) : (
          addEventForm()
        )
      ) : (
        notAuthenticated()
      )}
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -25,
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  hero: {
    backgroundColor: "#301A4B",
    height: 175,
    position: "relative",
  },
  vector1: {
    position: "absolute",
    top: 80,
  },
  vector2: {
    position: "absolute",
    bottom: -20,
    right: 50,
  },
  vector3: {
    position: "absolute",
    right: 0,
    top: -30,
  },
  input: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 20,
  },

  button: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
  timeContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  time_input: {
    width: "80%",
  },
  time_button: {
    width: "15%",
    marginTop: 20,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
    borderRadius: 0,
  },
  locationContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  location_a: {
    width: "50%",
  },
  location_b: {
    width: "23%",
  },
  location_c: {
    width: "23%",
  },
  baseContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  baseContainerBtn: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  image: {
    width: "47%",
    height: 135,
    backgroundColor: "#E7E2F1",
  },
  buttonAlt: {
    marginLeft: 75,
    marginRight: 75,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
    marginTop: -15,
  },
  event_details_container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  event_details_container_item: {
    // backgroundColor: "lightgreen",
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    color: "#909CB3",
  },
  additional_container: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
  },
  additional_item_input: {
    width: "83%",
  },
  additional_item_button: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 18,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
  spinnerContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddEventScreen;
