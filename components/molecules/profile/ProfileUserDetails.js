import { View, StyleSheet, Image, ScrollView } from "react-native";
import React, { Component, useState } from "react";
import {
  Layout,
  Tab,
  TabView,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";
import EventCard from "./EventCardProfile";
import { useSelector, useDispatch } from "react-redux";
import { updateAuthenticated } from "../../../store/actions/user";

// Tab menu toggle

export const ProfileUserDetails = (props) => {
  // State / Authenticated
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(1);

  const toggleTab = (tab) => {
    // alert(tab);
    setToggle(tab);
  };

  const tabs = () => {
    return (
      <Layout style={styles.tabContainer}>
        {/* Top Tabs */}
        {/* Organizer */}
        <Layout style={toggle === 1 ? styles.tabActive : styles.tabInactive}>
          <Text
            style={toggle === 1 ? styles.tabActiveText : styles.tabInactiveText}
            onPress={() => toggleTab(1)}
          >
            I am the Organizer
          </Text>
        </Layout>
        {/* Participant */}
        <Layout style={toggle === 2 ? styles.tabActive : styles.tabInactive}>
          <Text
            style={
              toggle === 2 ? styles.tabActiveTextRight : styles.tabInactiveText
            }
            onPress={() => toggleTab(2)}
          >
            I am the Participant
          </Text>
        </Layout>
      </Layout>
    );
  };

  const onSignOut = () => {
    dispatch(updateAuthenticated(false));
  };

  const tabView = () => {
    if (toggle === 1) {
      return (
        <Layout>
          <EventCard />
        </Layout>
      );
    } else {
      return (
        <Layout>
          <EventCard />
          <EventCard />
        </Layout>
      );
    }
  };
  return (
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
            Event Registration
          </Text>
          <Button
            style={styles.signoutBtn}
            status="basic"
            size="small"
            onPress={onSignOut}
          >
            Sign Out
          </Button>
          {/* Vector 1 */}
          <Image
            style={styles.vector1}
            source={require("../../../assets/Vector(3).png")}
          />
          {/* Vector2 */}
          <Image
            style={styles.vector2}
            source={require("../../../assets/Vector(1).png")}
          />
          {/* Vector3 */}
          <Image
            style={styles.vector3}
            source={require("../../../assets/Vector(2).png")}
          />
        </Layout>
        {/* Content Main Container */}
        <Layout style={styles.body}>
          {/* Image / Username / ID Container */}
          <Layout
            style={{
              marginTop: -70,
              alignItems: "center",
              backgroundColor: "rgba(52, 52, 52, alpha)",
            }}
          >
            {/* Image with ring background and photo icon */}
            <Layout style={styles.profileImageBackside}>
              <Image
                style={styles.profileImage}
                // source={{ uri: props.authenticatedUser.profile_image_src }}
                source={{
                  uri: "http:10.0.2.2:8000/img/dog-1558962_960_720.jpg",
                }}
              />
              <Button style={styles.cameraUploadButton}>
                <Icon style={styles.icon} name="camera" />
              </Button>
            </Layout>

            <Text category="h4" style={{ marginTop: 15 }}>
              {props.authenticatedUser.name}
            </Text>
            <Text
              style={{ fontWeight: "bold", marginTop: 10, color: "#301A4B" }}
            >
              Member ID: {props.authenticatedUser.id}
            </Text>
          </Layout>

          {/* Email / Zip / Phone / EDIT */}
          <Layout style={styles.userDetailsContainerParent}>
            {/* Name */}
            <Layout style={styles.userDetailsContainer}>
              <Text style={styles.userDetail_1}>Email</Text>
              <Text style={styles.userDetail_2}>
                {props.authenticatedUser.email}
              </Text>
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
              <Text style={styles.userDetail_2}>
                {props.authenticatedUser.zip}
              </Text>
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
                {props.authenticatedUser.phone || "no phone number present"}
              </Text>
              <Text style={styles.userDetail_3}>
                <Icon
                  style={styles.iconDetail}
                  name="arrow-ios-forward-outline"
                />
              </Text>
            </Layout>
          </Layout>
          {/* Tabs */}
          {tabs()}
          {/* Tab Views */}
          {tabView()}
        </Layout>
      </Layout>
    </ScrollView>
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
  signoutBtn: {
    color: "white",
    marginLeft: "auto",
    marginTop: 25,
    marginRight: 15,
    height: 15,
    borderRadius: 20,
    borderWidth: 0,
    zIndex: 1,
  },
  profileImageBackside: {
    borderWidth: 3,
    borderColor: "#E26D7D",
    padding: 8,
    borderRadius: 100,
    backgroundColor: "rgba(52, 52, 52, 0)",
    position: "relative",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  cameraUploadButton: {
    zIndex: 1,
    position: "absolute",
    bottom: -10,
    right: -10,
    borderRadius: 50,
    backgroundColor: "#3F295A",
    borderColor: "white",
    borderWidth: 4,
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
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "orange",
    padding: 20,
  },
  tabActive: {
    borderBottomWidth: 2.5,
    borderColor: "#3F295A",
    width: "50%",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
  },
  tabActiveText: {
    color: "#3F295A",
    fontWeight: "700",
    // backgroundColor: "lightpink",
    padding: 15,
    borderRightWidth: 1,
    borderRightColor: "#969595",
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
    textAlign: "center",
  },
  tabActiveTextRight: {
    color: "#3F295A",
    fontWeight: "700",
    padding: 15,
    borderLeftWidth: 1,
    borderLeftColor: "#969595",
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
    textAlign: "center",
  },
  tabInactive: {
    borderBottomWidth: 2.5,
    borderColor: "#969595",
    width: "50%",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
  },
  tabInactiveText: {
    fontWeight: "700",
    // backgroundColor: "lightgreen",
    color: "#969595",
    padding: 20,
  },
});

export default ProfileUserDetails;
