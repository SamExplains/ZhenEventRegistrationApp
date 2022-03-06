import { View, Image, StyleSheet } from "react-native";
import React, { Component, useState } from "react";
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Divider,
  CheckBox,
} from "@ui-kitten/components";
import {
  ArrowBackIcon,
  CalendarOutline,
  NavigationOutline2,
  MapOutline,
  GlobeOutline,
} from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

export const EventDetailedScreen = ({ navigation }) => {
  const [checked, setChecked] = React.useState(true);
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    // fill="white"
    // <TopNavigationAction icon={ArrowBackIconWhite} onPress={navigateBack} />
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => (
          // <Text style={{ color: "white" }}>Event Details Title</Text>
          <Text>Event Details Title</Text>
        )}
        alignment="center"
        accessoryLeft={BackAction}
        style={styles.topnav}
        // backgroundColor="transparent"
      />
      <ScrollView>
        {/* Image Containe "TOP" */}
        <Layout style={styles.imageContainer}>
          <Image
            // style={{ top: -55, zIndex: -10 }}
            source={require("../../assets/Rectangle_28.png")}
          />
          <Text style={styles.imageContainerImageNumber}>1/3</Text>
        </Layout>
        {/* Content Container */}
        <Layout style={styles.contentContainer}>
          <Text category="h6" style={styles.title}>
            Anim occaecat duis esse reprehenderit irure excepteur proident et
            dolor velit.
          </Text>
          <Text style={styles.spotsLeft}>
            Spots Left:
            <Text> 0/10 Full</Text>
          </Text>
          {/* Four Purple Labels */}
          <Layout style={styles.fourLabelsContainer}>
            <Text style={styles.purpleLabel}>ID: 0000</Text>
            <Text style={styles.purpleLabel}>Private</Text>
            <Text style={styles.purpleLabel}>Off Line</Text>
            <Text style={styles.purpleLabel}>4/10</Text>
          </Layout>
          <Text category="p1" style={styles.description}>
            Mollit proident nostrud laboris laboris aute et eiusmod elit labore
            reprehenderit. Nulla est laboris irure minim Lorem id aliqua. In
            mollit voluptate reprehenderit aliqua pariatur id deserunt et
            laborum nostrud aliqua mollit ipsum deserunt. Velit minim laborum
            consequat irure nisi sit mollit ad officia. Pariatur est do cillum
            fugiat adipisicing eiusmod et Lorem velit exercitation ex. Occaecat
            aute in sit aliqua voluptate ipsum exercitation anim est.
          </Text>

          {/* Date */}
          <Layout style={styles.DMLContainer}>
            <Layout style={styles.DMLItemLeft}>
              <CalendarOutline style={styles.icon} />
            </Layout>
            <Text style={styles.DMLItemMiddle}>00 Month 0000/YYYY</Text>
            <Text style={styles.DMLItemRight}></Text>
          </Layout>
          {/* Location */}
          <Layout style={styles.DMLContainer}>
            <Layout style={styles.DMLItemLeft}>
              <MapOutline style={styles.icon} />
            </Layout>
            <Text style={styles.DMLItemMiddle}>00 Month 0000/YYYY</Text>
            <Layout style={styles.DMLItemRight}>
              <NavigationOutline2 style={styles.icon} />
            </Layout>
          </Layout>
          {/* Website */}
          {/* Location */}
          <Layout style={styles.DMLContainer}>
            <Layout style={styles.DMLItemLeft}>
              <GlobeOutline style={styles.icon} />
            </Layout>
            <Text style={styles.DMLItemMiddle}>www.your_website.com</Text>
            <Layout style={styles.DMLItemRight}></Layout>
          </Layout>

          <Divider style={{ marginTop: 25, marginBottom: 25 }} />
          <Text category="p2" style={{ color: "#454545" }}>
            Items needed for the Party
          </Text>
          <CheckBox
            style={styles.checkbox}
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
          >
            {`Checked: ${checked}`}
          </CheckBox>
          <CheckBox
            style={styles.checkbox}
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
          >
            {`Checked: ${checked}`}
          </CheckBox>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topnav: {
    backgroundColor: "transparent",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  imageContainerImageNumber: {
    position: "absolute",
    color: "white",
    bottom: 0,
    marginBottom: 35,
  },
  title: {
    fontWeight: "700",
    marginTop: 15,
  },
  contentContainer: {
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
});

export default EventDetailedScreen;
