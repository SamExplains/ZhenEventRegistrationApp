import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Text,
  Button,
  Layout,
  CheckBox,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { ArrowBackIcon } from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import axios from "axios";
import ROOT_URL from "../../settings.json";

export const AddPrivateEvent = ({ navigation }) => {
  const currentUser = useSelector((state) => state.eventsAndUsers.currentUser);
  const authenticated = useSelector(
    (state) => state.eventsAndUsers.authenticated
  );
  const [privateEventKey, setPrivateEventKey] = useState(null);

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );

  const launchCheckinScanner = () => {
    navigation.navigate("CheckInScanner", {
      fromComponent: "sidebar",
    });
  };

  const addPrivateEvent = async () => {
    if (privateEventKey === null) {
      Toast.show({
        type: "error",
        text1: "No code entered!",
      });
    } else {
      await axios
        .post(`${ROOT_URL.api}/events/private/${privateEventKey}`, {
          creator_id: currentUser.id,
        })
        .then(({ data }) => {
          if (data.message === "ok") {
            // reset value
            setPrivateEventKey(null);
            Toast.show({
              type: "success",
              text1: "You have been registered for the private event.",
            });
          } else if (data.message === "error") {
            Toast.show({
              type: "error",
              text1: "You are already registered for this private event.",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "No event was found with the shared code.",
            });
          }
        });
    }
  };

  const isAuthenticated = () => {
    if (authenticated) {
      return (
        <Layout>
          <Layout style={styles.content_container}>
            <Text style={{ marginBottom: 15 }}>
              Add private event through shared code
            </Text>
            <Input
              style={{ marginBottom: 15 }}
              placeholder="Event code"
              value={privateEventKey}
              maxLength={10}
              onChangeText={(nextValue) => setPrivateEventKey(nextValue)}
            />
            <Button
              size="medium"
              style={styles.button}
              onPress={addPrivateEvent}
            >
              Add event
            </Button>
          </Layout>
          <Layout style={styles.content_container}>
            <Text style={{ marginBottom: 15 }}>
              Launch the QR code scanner to add a private event.
            </Text>
            <Button
              size="medium"
              style={styles.button}
              onPress={launchCheckinScanner}
            >
              Use scanner to add private event
            </Button>
          </Layout>
        </Layout>
      );
    } else {
      return (
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text category="h5">Not authorized</Text>
        </Layout>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title="Add Private Event"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Layout style={styles.container}>{isAuthenticated()}</Layout>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  content_container: {
    padding: 15,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    // marginBottom: 15,
    // marginLeft: 15,
    // marginRight: 15,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
});

export default AddPrivateEvent;
