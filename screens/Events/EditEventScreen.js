import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Divider,
  CheckBox,
  Card,
  Button,
  Modal,
  Radio,
  RadioGroup,
  Toggle,
  Input,
  Spinner,
} from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import DatePicker from "react-native-modern-datepicker";
import Slider from "@react-native-community/slider";
import axios from "axios";
import Toast from "react-native-toast-message";
import { updateEditedEventDetails } from "../../store/actions/event";
import ROOT_URL from "../../settings.json";
import {
  ArrowBackIcon,
  CalendarOutline,
  PlusOutline,
} from "../../assets/icons";

const EditEventScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const eventDetails = useSelector(
    (state) => state.eventsAndUsers.tabEventDetails
  );

  // Spinner
  const [awaiting, setAwaiting] = useState(false);

  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );

  const navigateBack = () => {
    navigation.goBack();
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
    if (
      firstImage &&
      !firstImage.includes("https://") &&
      secondImage &&
      !secondImage.includes("https://")
    ) {
      // 2 images will be transfered
      flag = "both";
    } else if (firstImage && !firstImage.includes("https://")) {
      // first image will be transfered
      flag = "first";
    } else if (secondImage && !secondImage.includes("https://")) {
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

  // ************************************
  // EDIT FORM FIELDS
  // **************************************
  // title
  const [title, setTitle] = useState(eventDetails.title);

  // description
  const [decription, setDecription] = useState(eventDetails.description);

  // start date
  const [selectedStartDate, setSelectedStartDate] = useState(
    eventDetails.start_time
  );
  const [showStartSelector, setShowStartSelector] = useState(false);

  // end date
  // start date
  const [selectedEndDate, setSelectedEndDate] = useState(eventDetails.end_time);
  const [showEndSelector, setShowEndSelector] = useState(false);

  // Camera Library
  const [firstImage, setFirstImage] = useState(eventDetails.first_image);
  const [secondImage, setSecondImage] = useState(eventDetails.second_image);

  // Location
  const [address, setAddress] = useState(eventDetails.address);

  const [city, setCity] = useState(eventDetails.city);
  const [zip, setZip] = useState(eventDetails.zip);

  const [publicChk, setPublicChk] = useState(
    eventDetails.public_private === 1 ? true : false
  );
  const [offlineChk, setOfflineChk] = useState(
    eventDetails.on_off_line === 1 ? true : false
  );
  const [checkinChk, setCheckinChk] = useState(
    eventDetails.check_in === 1 ? true : false
  );

  const [capacity, setCapacity] = useState(parseInt(eventDetails.capacity));

  const [eventUrl, setEventUrl] = useState(eventDetails.url);

  // Personal details
  const [email, setEmail] = useState(eventDetails.email);
  const [phone, setPhone] = useState(eventDetails.phone);

  // Date selectors
  const showDateSelector = () => {
    return showStartSelector ? (
      <DatePicker
        onSelectedChange={(date) => {
          setSelectedStartDate(date);
        }}
      />
    ) : null;
  };

  const showEndDateSelector = () => {
    return showEndSelector ? (
      <DatePicker
        onSelectedChange={(date) => {
          setSelectedEndDate(date);
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

  // ************************************
  // EDIT FORM FIELDS
  // **************************************

  useEffect(() => {
    // console.log("Event ID of ", route.params.eid);

    // title
    setTitle(eventDetails.title);

    // description
    setDecription(eventDetails.description);

    // start date
    setSelectedStartDate(eventDetails.start_time);

    // end date
    // start date
    setSelectedEndDate(eventDetails.end_time);

    // Camera Library
    setFirstImage(eventDetails.first_image);
    setSecondImage(eventDetails.second_image);

    // Location
    setAddress(eventDetails.address);

    setCity(eventDetails.city);
    setZip(eventDetails.zip);

    setPublicChk(eventDetails.public_private === 1 ? true : false);
    setOfflineChk(eventDetails.on_off_line === 1 ? true : false);
    setCheckinChk(eventDetails.check_in === 1 ? true : false);

    setCapacity(parseInt(eventDetails.capacity));

    setEventUrl(eventDetails.url);

    // Personal details
    setEmail(eventDetails.email);
    setPhone(eventDetails.phone);
  }, [route.params.eid, eventDetails]);

  const onUpdateEditedEvent = async () => {
    setAwaiting(true);
    // Check for images
    // Default anything left blank to previous input
    const imageFlag = isThereAnImageSelected(); // returns null if there is a https image provided but no images from gallery selected

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

    // console.log("We have an image flag of ", imageFlag);
    // If NULL we skip the image stuff from updating on request
    await axios
      .patch(`${ROOT_URL.api}/events/edit/update`, {
        id: eventDetails.id,
        title: title || eventDetails.title,
        description: decription || eventDetails.description,
        start_time: selectedStartDate || eventDetails.start_time,
        end_time: selectedEndDate || eventDetails.end_time,
        address: address || eventDetails.address,
        city: city || eventDetails.city,
        zip: zip || eventDetails.zip,
        public_private: publicChk ? 1 : 0 || eventDetails.public_private,
        on_off_line: offlineChk ? 1 : 0 || eventDetails.on_off_line,
        check_in: checkinChk ? 1 : 0 || eventDetails.check_in,
        capacity: capacity || eventDetails.capacity,
        url: eventUrl || eventDetails.url,
        email: email || eventDetails.email,
        phone: phone || eventDetails.phone,
        first_image: firstBase64Image,
        second_image: secondBase64Image,
      })
      .then(({ data }) => {
        dispatch(updateEditedEventDetails(data));
        setAwaiting(false);
        Toast.show({
          type: "success",
          text1: "Event has been updated",
        });
        // navigateBack();
      })
      .catch((e) => {
        console.log("Error ", e);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title={"Edit Event"}
        alignment="center"
        accessoryLeft={BackAction}
        style={styles.topnav}
      />
      {awaiting ? (
        <Layout style={styles.spinnerContainer}>
          <Spinner />
        </Layout>
      ) : (
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
                Edit Event Details
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
              />
              {/* Start date */}
              <Layout style={styles.timeContainer}>
                <Input
                  style={styles.time_input}
                  value={selectedStartDate}
                  // disabled={true}
                  label="Start time and date"
                  placeholder="yyyy/mm/dd hh mm:ss"
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
                />
                {/* City / State */}
                <Input
                  style={styles.location_b}
                  value={city}
                  label="State"
                  placeholder="..."
                  textContentType={"none"}
                  clearButtonMode="always"
                  returnKeyType="next"
                  keyboardType="default"
                  onChangeText={(newCity) => setCity(newCity)}
                  maxLength={25}
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
                  maxLength={5}
                />
              </Layout>
              {/* Event Type Details */}
              <Layout style={styles.event_details_container}>
                <Layout style={styles.event_details_container_item}>
                  <Text style={styles.label}>Public / Private</Text>
                  <Toggle
                    checked={publicChk}
                    onChange={onPublicCheckedChange}
                  />
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
                <Text style={styles.label}>
                  Capacity (how many people can register)
                  {"   -   "}
                  {capacity}
                </Text>
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
              />

              <Layout
                style={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                <Divider />
              </Layout>

              {/* Email */}
              <Input
                style={styles.input}
                value={email}
                label="Email (allow people to email you?)"
                placeholder="..."
                textContentType={"none"}
                clearButtonMode="always"
                returnKeyType="next"
                keyboardType="default"
                onChangeText={(newEmail) => setEmail(newEmail)}
              />
              {/* Phone */}
              <Input
                style={styles.input}
                value={phone}
                label="Number (allow people to call you?)"
                placeholder="..."
                textContentType={"none"}
                clearButtonMode="always"
                returnKeyType="next"
                keyboardType={"phone-pad"}
                onChangeText={(newPhone) => setPhone(newPhone)}
              />
              <Button
                style={styles.button}
                size="medium"
                onPress={onUpdateEditedEvent}
              >
                Let's Go!
              </Button>
            </Layout>
          </Layout>
        </ScrollView>
      )}
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topnav: {
    marginTop: 25,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
    borderRadius: 25,
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
    marginTop: 15,
    borderRadius: 25,
  },
  spinnerContainer: {
    display: "flex",
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginTop: -25,
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 45,
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
    borderRadius: 25,
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
    backgroundColor: "orange",
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "65%",
  },
});

export default EditEventScreen;
