import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import CheckInScreen from "../../../screens/Profile/OrganizerCheckInScreen";

export const EventCard = () => {
  const navigation = useNavigation();
  const navigateEventDetails = () => {
    navigation.navigate("EventDetails");
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateEventDetails}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../../../assets/Rectangle44.png")}
      />
      {/* Event Date */}
      <Text style={styles.date}>00 Jan</Text>
      <Text category="h6" style={styles.title}>
        Event Title
      </Text>
      <Text category="p1" style={styles.id}>
        ID: 0000
      </Text>
      <Layout style={styles.location}>
        <Image
          resizeMode="contain"
          source={require("../../../assets/Vector(10).png")}
        />
        <Text category="p2">{"     "}000 Street, City, State ZIP</Text>
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    borderRadius: 7,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E6E5E5",
    position: "relative",
    marginTop: 15,
  },
  image: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    marginTop: 10,
  },
  id: { marginTop: 10 },
  location: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  date: {
    backgroundColor: "white",
    width: 65,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
    color: "#301A4B",
    borderRadius: 5,
    position: "absolute",
    right: 20,
    top: 105,
  },
});

export default EventCard;
