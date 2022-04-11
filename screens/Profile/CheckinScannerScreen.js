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
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
export default CheckinScannerScreen;
