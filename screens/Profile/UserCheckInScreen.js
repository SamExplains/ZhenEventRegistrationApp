import { View, StyleSheet, Image, ScrollView } from "react-native";
import React, { Component, useState } from "react";
import {
  Layout,
  Text,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Divider,
  Button,
} from "@ui-kitten/components";
import { ArrowBackIcon, ProfileIcon } from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export const CheckInScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.eventsAndUsers.currentUser);

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Check In <USER>"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <ScrollView>
        <Layout style={styles.container}>
          {/* Header */}
          <Layout style={styles.hero}>
            <Text
              category="h6"
              style={{
                fontWeight: "bold",
                paddingLeft: 15,
                marginTop: 25,
                color: "white",
              }}
            >
              Check In
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
          {/* Content Main Container */}
          <Layout style={styles.body}>
            {/* Image / Username / ID Container */}
            <Layout
              style={{
                marginTop: -70,
                alignItems: "flex-start",
                backgroundColor: "rgba(52, 52, 52, alpha)",
              }}
            >
              {/* Image with ring background and photo icon */}
              <Layout style={styles.profileImageBackside}>
                <Image
                  style={styles.profileImage}
                  resizeMode="cover"
                  source={{ uri: currentUser.profile_image_src }}
                />
              </Layout>

              <Text category="h4" style={{ marginTop: 15, paddingLeft: 15 }}>
                {currentUser.name}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  marginTop: 10,
                  color: "#301A4B",
                  paddingLeft: 15,
                }}
              >
                Member ID: {currentUser.id}
              </Text>
            </Layout>

            {/* Email / Zip / Phone / EDIT */}
            <Layout style={styles.userDetailsContainerParent}>
              {/* Name */}
              <Layout style={styles.userDetailsContainer}>
                <Text style={styles.userDetail_1}>Email</Text>
                <Text style={styles.userDetail_2}>{currentUser.email}</Text>
                <Text style={styles.userDetail_3}>
                  <Icon
                    style={styles.iconDetail}
                    name="arrow-ios-forward-outline"
                  />
                </Text>
              </Layout>

              {/* Zipcode */}
              <Layout style={styles.userDetailsContainer}>
                <Text style={styles.userDetail_1}>Zipcode</Text>
                <Text style={styles.userDetail_2}>{currentUser.zip}</Text>
                <Text style={styles.userDetail_3}>
                  <Icon
                    style={styles.iconDetail}
                    name="arrow-ios-forward-outline"
                  />
                </Text>
              </Layout>
              {/* Phone */}
              <Layout style={styles.userDetailsContainer}>
                <Text style={styles.userDetail_1}>Phone</Text>
                <Text style={styles.userDetail_2}>
                  {currentUser.phone || "no phone present"}
                </Text>
                <Text style={styles.userDetail_3}>
                  <Icon
                    style={styles.iconDetail}
                    name="arrow-ios-forward-outline"
                  />
                </Text>
              </Layout>
              <Divider />
              <Layout style={{ alignItems: "center" }}>
                <Text style={{ marginTop: 15 }}>
                  This QR code will be scanned by the Host "Checking-In" users.
                  This QR code represents a unique User QR Code .
                </Text>
                <Image
                  style={styles.image}
                  resizeMode="contain"
                  source={require("../../assets/Rectangle_56.png")}
                />
              </Layout>
              {/* <Divider />
              <Text
                category="p2"
                style={{ fontWeight: "bold", marginTop: 25, marginBottom: 15 }}
              >
                Event ID: 0000 Check-in-Status
              </Text>
              <ViewOrCheckIn organizer={"true"} /> */}
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
    marginTop: -25,
  },
  about: {
    paddingLeft: 10,
    marginTop: 10,
  },
  tabbar: {
    padding: 20,
  },
  tab: { marginBottom: 50 },
  hero: {
    backgroundColor: "#301A4B",
    height: 175,
    display: "flex",
    flexDirection: "row",
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
  profileImageBackside: {
    borderWidth: 3,
    borderColor: "#E26D7D",
    padding: 8,
    borderRadius: 100,
    backgroundColor: "rgba(52, 52, 52, 0)",
    marginLeft: 25,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: "white",
  },
  userDetailsContainerParent: {
    padding: 20,
    marginTop: 20,
  },
  userDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
  },
  userDetail_1: {
    width: "35%",
    fontWeight: "bold",
    color: "#454545",
  },
  userDetail_2: {
    width: "60%",
  },
  userDetail_3: {
    width: "5%",
    marginRight: 0,
  },
  iconDetail: {
    width: 25,
    height: 25,
    tintColor: "black",
  },
  image: {
    marginTop: 25,
    marginBottom: 25,
  },
});
export default CheckInScreen;
