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
// fetchEventDetails
export const EventDetailedScreen = ({ navigation, route }) => {
  useEffect(() => {
    console.log("Details ", route.params.eventId);
  }, [route.params.eventId]);

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text>{route.params.title}</Text>}
        alignment="center"
        accessoryLeft={BackAction}
        style={styles.topnav}
        // backgroundColor="transparent"
      />
      <Text>Event Details State with ID of {route.params.eventId}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topnav: {
    backgroundColor: "white",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  imageContainerShareButton: {
    // width: 32,
    // height: 32,
    tintColor: "white",
    position: "absolute",
    color: "white",
    top: 10,
    right: 10,
  },
  imageContainerImageThumbnail: {
    bottom: 0,
    marginBottom: 35,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 5,
    marginRight: 5,
    height: 25,
    width: 25,
    borderWidth: 2.5,
    borderColor: "white",
  },
  title: {
    fontWeight: "700",
    marginTop: 15,
  },
  contentContainer: {
    position: "relative",
    padding: 15,
    marginTop: -25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  spotsLeft: {
    color: "#301A4B",
    fontWeight: "600",
    marginTop: 15,
  },
  fourLabelsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  purpleLabel: {
    backgroundColor: "#301A4B",
    color: "white",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 25,
    fontSize: 12,
  },
  description: { lineHeight: 30 },
  DMLContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 15,
    // padding: 15,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: "#454545",
  },
  DMLItemLeft: {
    width: "10%",
    textAlignVertical: "center",
    alignItems: "center",
  },
  DMLItemMiddle: {
    width: "70%",
    textAlignVertical: "center",
    paddingLeft: 20,
  },
  DMLItemRight: {
    width: "20%",
    textAlign: "right",
    color: "#301A4B",
    textAlignVertical: "center",
    alignItems: "flex-end",
  },
  checkbox: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  socialsContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
  },
  social: {
    // backgroundColor: "orange",
    // padding: 25,
    width: 25,
    height: 25,
    tintColor: "#301A4B",
  },
  pagelinkContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pagelinkText: {
    width: "90%",
  },
  pagelinkBtn: {
    width: "15%",
  },
  copy: {
    width: 25,
    height: 25,
    tintColor: "#301A4B",
  },
  button: {
    marginBottom: 15,
    // marginLeft: 15,
    // marginRight: 15,
    marginTop: 35,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
});

export default EventDetailedScreen;
