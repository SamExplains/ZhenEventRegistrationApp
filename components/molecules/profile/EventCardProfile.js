import { Text, View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import { Layout, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setProfileTabEventDetails } from "../../../store/actions/event";

export const EventCardProfile = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateEventDetails = () => {
    // Set event details
    dispatch(setProfileTabEventDetails(props.tabEventId));
    navigation.navigate("EventDetails", {
      fromComponent: props.fromComponent,
    });
  };
  const navigateToCheckIn = () => {
    navigation.navigate("CheckIn");
  };

  const activeTabButtonsToShow = () => {
    // Dispatch to set event Details
    if (props.activeTab == 1) {
      return (
        <Layout style={styles.cardBottom}>
          {/* View */}
          <Button style={styles.button} onPress={navigateEventDetails}>
            View
          </Button>
          {/* Edit / Check In */}
          <Button style={styles.buttonAlternate}>
            <Text style={{ color: "#3F295A" }}>Edit</Text>
          </Button>
          <Button style={styles.buttonAlternate}>
            <Text style={{ color: "#3F295A" }} onPress={navigateToCheckIn}>
              Check In
            </Text>
          </Button>
        </Layout>
      );
    } else {
      return (
        <Layout style={styles.cardBottom}>
          {/* View */}
          <Button style={styles.buttonFull} onPress={navigateEventDetails}>
            View
          </Button>
        </Layout>
      );
    }
  };

  return (
    <View style={styles.card}>
      <Layout style={styles.cardContent}>
        <Image source={require("../../../assets/Rectangle_53.png")} />
        {/* Details */}
        <Layout style={styles.cardTextContainer}>
          {/* Event Name */}
          <Layout style={styles.cardText}>
            <Text style={styles.cardLabel}>Event Name:</Text>
            <Text>{props.title}</Text>
          </Layout>
          {/* Event Date */}
          <Layout style={styles.cardText}>
            <Text style={styles.cardLabel}>Event Date:</Text>
            <Text>{props.date}</Text>
          </Layout>
          {/* Event ID */}
          <Layout style={styles.cardText}>
            <Text style={styles.cardLabel}>Event ID:</Text>
            <Text>{props.eventId}</Text>
          </Layout>
        </Layout>
      </Layout>
      {/* Buttons */}
      {activeTabButtonsToShow()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "#D9D8D8",
    borderWidth: 1,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
  },
  cardTextContainer: {
    justifyContent: "center",
  },
  cardLabel: {
    fontWeight: "bold",
    color: "#454545",
    paddingRight: 5,
    paddingLeft: 15,
  },
  cardText: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "33%",
    marginTop: 20,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
  buttonFull: {
    width: "99%",
    marginTop: 20,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
  buttonAlternate: {
    width: "33%",
    marginTop: 20,
    backgroundColor: "white",
    borderColor: "#3F295A",
  },
});

export default EventCardProfile;
