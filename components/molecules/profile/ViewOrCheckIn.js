import { View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { ProfileIcon } from "../../../assets/icons";
export const ViewOrCheckIn = (props) => {
  return (
    <View>
      {/* View Registered Users for the Event */}
      <Text>Props passed: Are you an Organizer? {props.organizer}</Text>
      <Layout style={styles.status}>
        <Text style={styles.status_icon}>
          <ProfileIcon fill="#606060" style={{ width: 20, height: 20 }} />
        </Text>
        <Text style={styles.status_people}>2</Text>
        <Text style={styles.status_view}>
          <Button size="tiny" style={styles.button}>
            View Registered
          </Button>
        </Text>
      </Layout>
      {/* View Pending Users for Register(Check-In) for the Event */}
      <Layout style={styles.status}>
        <Text style={styles.status_icon}>
          <ProfileIcon fill="#606060" style={{ width: 20, height: 20 }} />
        </Text>
        <Text style={styles.status_people}>12</Text>
        <Text style={styles.status_view}>
          <Button size="tiny" style={styles.button}>
            View Registered
          </Button>
        </Text>
      </Layout>
    </View>
  );
};

const styles = StyleSheet.create({
  status: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    marginBottom: 15,
  },
  status_icon: {
    width: "10%",
  },
  status_people: {
    width: "10%",
    fontWeight: "bold",
  },
  status_view: {
    width: "80%",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#301A4B",
    borderWidth: 0,
    borderRadius: 50,
  },
});

export default ViewOrCheckIn;
