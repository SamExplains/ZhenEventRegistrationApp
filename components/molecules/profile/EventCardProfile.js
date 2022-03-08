import { Text, View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import {
  Layout,
  Button,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export const EventCardProfile = () => {
  const navigation = useNavigation();
  const navigateEventDetails = () => {
    navigation.navigate("EventDetails");
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
            <Text>A event name goes here.</Text>
          </Layout>
          {/* Event Date */}
          <Layout style={styles.cardText}>
            <Text style={styles.cardLabel}>Event Date:</Text>
            <Text>00/00/0000</Text>
          </Layout>
          {/* Event ID */}
          <Layout style={styles.cardText}>
            <Text style={styles.cardLabel}>Event ID:</Text>
            <Text>0000</Text>
          </Layout>
        </Layout>
      </Layout>
      {/* Buttons */}
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
          <Text style={{ color: "#3F295A" }}>Check In</Text>
        </Button>
      </Layout>
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
  buttonAlternate: {
    width: "33%",
    marginTop: 20,
    backgroundColor: "white",
    borderColor: "#3F295A",
  },
});

export default EventCardProfile;
