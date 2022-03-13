import { View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import { ArrowIosBackIcon, MenuIcon } from "../../assets/icons";
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Input,
  CheckBox,
  Button,
} from "@ui-kitten/components";

import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export const AddEventScreen = () => {
  const email = null;
  const checked = false;
  const navigation = useNavigation();

  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Create Event"
        alignment="center"
        accessoryLeft={renderDrawerAction}
      />
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
              value={email}
              label="Event Title"
              placeholder="..."
            />
            {/* Description */}
            <Input
              style={styles.input}
              value={email}
              label="Description"
              placeholder="..."
            />
            <Layout style={styles.timeContainer}>
              <Input
                style={styles.time_a}
                value={email}
                label="From"
                placeholder="..."
              />
              <Input
                style={styles.time_b}
                value={email}
                label="To"
                placeholder="..."
              />
            </Layout>
            {/* Images */}
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
            <Button style={styles.button} size="medium">
              Let's Go!
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
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
    justifyContent: "space-between",
    padding: 15,
  },
  time_a: {
    width: "48%",
  },
  time_b: {
    width: "48%",
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
});

export default AddEventScreen;
