import { Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
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
} from "@ui-kitten/components";
import {
  ArrowBackIcon,
  CalendarOutline,
  NavigationOutline2,
  MapOutline,
  GlobeOutline,
  ShareLink,
  Twitter,
  Facebook,
} from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import axios from "axios";
import { BarCodeScanner } from "expo-barcode-scanner";
import ROOT_URL from "../../settings.json";

export const CheckinScannerScreen = ({ navigation, route }) => {
  const currentUser = useSelector((state) => state.eventsAndUsers.currentUser);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [capacity, setCapacity] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      (async () => {
        await axios
          .get(`${ROOT_URL.api}/registration/checkin/${route.params.eventId}`)
          .then(({ data }) => {
            setCapacity(data);
            setLoading(true);
          });
      })();
    }
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const addPrivateEvent = async (privateEventKey) => {
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

  const checkUserIn = async (uuid, email) => {
    if (capacity <= route.params.capacity) {
      await axios
        .patch(`${ROOT_URL.api}/registration/user/checkin`, {
          eid: route.params.eventId,
          uuid: uuid,
          email: email,
        })
        .then(({ data }) => {
          // console.log(data);
          if (data.success) {
            // Increase checkin
            setCapacity(capacity + 1);
            Toast.show({
              type: "success",
              text1: "User was checked in.",
            });
          } else if (data.error === "User already checked in") {
            Toast.show({
              type: "error",
              text1: "User already checked in!",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Could not find user or registration record",
            });
          }
        });
    } else {
      Toast.show({
        type: "error",
        text1: "Max capcity reached",
      });
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setIsRequesting(true);
    if (route.params.fromComponent === "sidebar") {
      // parse the data to get the event key
      const parsedKey = data.split("/"); // [6] is the key we need
      await addPrivateEvent(parsedKey[6]);
      setIsRequesting(false);
    } else {
      const parsed = data.split(":");
      // If the PHONE key is still in the QR code
      if (parsed[3].slice(0, -5).trim() === "--- --- ----") {
        // console.log("Google QR");
        await checkUserIn(
          parsed[6].slice(0, -4).trim(),
          parsed[4].slice(0, -3).trim()
        );
      } else {
        // console.log("Standard");
        await checkUserIn(
          parsed[6].slice(0, -4).trim(),
          parsed[3].slice(0, -3).trim()
        );
      }
      setIsRequesting(false);
      // alert(`Profile: Bar code with type data: ${data} has been scanned!`);
    }
  };

  const privateEventMetricsKey = () => {
    return route.params.fromComponent !== "sidebar" ? (
      <Text style={styles.event_key_label}>
        Event Key: {route.params.eventKey}
      </Text>
    ) : null;
  };

  const privateEventMetricsCapacity = () => {
    return route.params.fromComponent !== "sidebar" ? (
      <Text style={styles.capacity_label}>
        Event Capacity: {capacity} / {route.params.capacity}
      </Text>
    ) : null;
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );

  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text>Check-In Scanner</Text>}
        alignment="center"
        accessoryLeft={BackAction}
      />

      <Layout style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && !isRequesting && (
          <Button
            size="large"
            style={styles.scan_button}
            onPress={() => setScanned(false)}
          >
            Tap to Scan Again
          </Button>
        )}

        {isRequesting && (
          <Layout style={styles.waiting_container}>
            <Text style={styles.waiting_text}>Registration in progress...</Text>
          </Layout>
        )}
        {privateEventMetricsKey()}
        {privateEventMetricsCapacity()}
      </Layout>

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  },
  scan_button: {
    margin: 50,
    color: "white",
  },
  waiting_container: {
    backgroundColor: "white",
    margin: 50,
    padding: 15,
    alignItems: "center",
  },
  waiting_text: {
    fontSize: 20,
  },
  event_key_label: {
    backgroundColor: "rgba(255,255,255,0.75)",
    padding: 15,
    top: 0,
    position: "absolute",
    fontWeight: "bold",
  },
  capacity_label: {
    backgroundColor: "rgba(255,255,255,0.75)",
    padding: 15,
    top: 45,
    position: "absolute",
    fontWeight: "bold",
  },
});
export default CheckinScannerScreen;
