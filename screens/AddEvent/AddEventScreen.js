import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { CalendarOutline, MenuIcon, PlusOutline } from "../../assets/icons";
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
} from "@ui-kitten/components";

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-native-modern-datepicker";
// import ImagePicker from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import baseUrl from "../../settings.json";

export const AddEventScreen = () => {
  const [email, setEmail] = useState("");

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

  // Camera
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);

  const checked = false;
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

  const pickImage = async (flag) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      flag === "first" ? setFirstImage(result.uri) : setSecondImage(result.uri);
    }
  };

  const onSubmitEvent = async () => {
    console.log(baseUrl.api, " --- ", firstImage);
    await axios
      .post(
        `${baseUrl.api}/create`,
        { image: firstImage },
        {
          "content-type": "multipart/form-data",
        }
      )
      .then(({ data }) => console.log(data));
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

            <Input
              style={styles.input}
              value={email}
              label="Image"
              placeholder="..."
            />
            {/* Address */}
            <Layout style={styles.locationContainer}>
              <Input
                style={styles.location_a}
                value={email}
                label="Address"
                placeholder="..."
              />
              <Input
                style={styles.location_b}
                value={email}
                label="city"
                placeholder="..."
              />
              <Input
                style={styles.location_c}
                value={email}
                label="Zipcode"
                placeholder="..."
              />
            </Layout>
            {/* Role */}
            <Input
              style={styles.input}
              value={email}
              label="Role"
              placeholder="..."
            />
            {/* Public/Private */}
            <Input
              style={styles.input}
              value={email}
              label="Public/Private"
              placeholder="..."
            />
            {/* On/Off Line */}
            <Input
              style={styles.input}
              value={email}
              label="On/Off Line"
              placeholder="..."
            />
            {/* Capacity */}
            <Input
              style={styles.input}
              value={email}
              label="Capacity"
              placeholder="..."
            />
            {/* Check in required */}
            <Input
              style={styles.input}
              value={email}
              label="Check in Required"
              placeholder="..."
            />
            {/* Event URL */}
            <Input
              style={styles.input}
              value={email}
              label="Event URL or Meeting Link"
              placeholder="..."
            />
            {/* Additional Items */}
            <Input
              style={styles.input}
              value={email}
              label="List of items needed"
              placeholder="..."
            />
            {/* Email */}
            <Input
              style={styles.input}
              value={email}
              label="Email for people to see"
              placeholder="..."
            />
            {/* Phone */}
            <Input
              style={styles.input}
              value={email}
              label="Number to call you"
              placeholder="..."
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
      {authenticated ? addEventForm() : notAuthenticated()}
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
    width: "32%",
  },
  location_b: {
    width: "32%",
  },
  location_c: {
    width: "32%",
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
    marginBottom: 15,
    marginLeft: 75,
    marginRight: 75,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
    marginTop: -15,
  },
});

export default AddEventScreen;
