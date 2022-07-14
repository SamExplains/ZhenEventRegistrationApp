import { StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  Button,
  Spinner,
} from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBackIcon } from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { setUser } from "../../store/actions/user";
import Toast from "react-native-toast-message";
import ROOT_URL from "../../settings.json";

const EditProfileDetailsScreen = ({ navigation }) => {
  // State / Authenticated
  const currentUser = useSelector((state) => state.eventsAndUsers.currentUser);
  const dispatch = useDispatch();

  const [editEmail, setEditEmail] = useState(currentUser.email);
  const [editZip, setEditzip] = useState(currentUser.zip);
  const [editPhone, setEditPhone] = useState(currentUser.phone);

  // Spinner
  const [awaiting, setAwaiting] = useState(false);

  // Image
  // Camera Library
  const [image, setImage] = useState(null);

  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );
  const navigateBack = () => {
    navigation.goBack();
  };

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
      setImage(result.uri);
    }
  };

  const onUpdateProfileDetails = async () => {
    setAwaiting(true);
    let firstBase64Image = null;

    // Check if the email is null to not send
    // also check to make sure it has file:///

    // Compress image
    if (image !== null && image.substr(0, 7) === "file://") {
      // console.log("We have an image to compress and update");
      firstBase64Image = await FileSystem.readAsStringAsync(image, {
        encoding: "base64",
      });
    }

    await axios
      .patch(`${ROOT_URL.api}/user/details`, {
        id: currentUser.id,
        email: editEmail,
        zip: editZip,
        phone: editPhone,
        image: firstBase64Image !== null ? firstBase64Image : null,
      })
      .then(({ data }) => {
        // console.log("We got a response ", data);
        setAwaiting(false);
        dispatch(setUser(data));
        Toast.show({
          type: "success",
          text1: "Your details have been updated",
        });
      });
  };

  const isGoogleAccount = () => {
    return /^\d+$/.test(currentUser.uuid) ? 1 : 0;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={"Edit Profile Details"}
        alignment="center"
        accessoryLeft={BackAction}
      />
      {awaiting ? (
        <Layout style={styles.spinnerContainer}>
          <Spinner />
        </Layout>
      ) : (
        <Layout style={{ display: "flex", flex: 1 }}>
          <Layout style={{ alignItems: "center" }}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="contain"
            />
            <Button
              style={styles.buttonAlt}
              size="small"
              title="Pick an image from camera roll"
              onPress={() => pickImage()}
            >
              Select photo
            </Button>
          </Layout>
          <Layout
            // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            style={styles.container}
          >
            {/* Email */}
            {isGoogleAccount() !== 1 && (
              <Layout>
                <Text style={styles.label}>Email</Text>
                <Input
                  placeholder="Place your Text"
                  style={styles.input}
                  value={editEmail}
                  onChangeText={(nextValue) => setEditEmail(nextValue)}
                />
              </Layout>
            )}

            {/* Zip */}
            <Text style={styles.label}>Zip</Text>
            <Input
              placeholder="Place your Text"
              style={styles.input}
              value={editZip}
              maxLength={5}
              onChangeText={(nextValue) => setEditzip(nextValue)}
            />
            {/* Phone */}
            <Text style={styles.label}>Phone</Text>
            <Input
              placeholder="Place your Text"
              style={styles.input}
              value={editPhone}
              maxLength={10}
              onChangeText={(nextValue) => setEditPhone(nextValue)}
            />

            <Button
              style={styles.button}
              size="medium"
              onPress={onUpdateProfileDetails}
            >
              Update
            </Button>
          </Layout>
        </Layout>
      )}
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  label: {
    marginBottom: 10,
  },
  input: {
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditProfileDetailsScreen;
