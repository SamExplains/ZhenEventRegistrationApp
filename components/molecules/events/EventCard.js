import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import CheckInScreen from "../../../screens/Profile/OrganizerCheckInScreen";

export const EventCard = (props) => {
  const navigation = useNavigation();

  const navigateEventDetails = () => {
    // Pass the event object from props to the next screen
    navigation.navigate("EventDetails", props.details);
  };

  const parseDate = (date) => {
    const _d = date.split("/");
    const _day = _d[2].split(" ");
    let month = "";
    let day = _day[0];
    switch (_d[1]) {
      case "01":
        month = "JAN";
        break;
      case "02":
        month = "FEB";
        break;
      case "03":
        month = "MAR";
        break;
      case "04":
        month = "APR";
        break;
      case "05":
        month = "MAY";
        break;
      case "06":
        month = "JUN";
        break;
      case "07":
        month = "JUL";
        break;
      case "08":
        month = "AUG";
        break;
      case "09":
        month = "SEP";
        break;
      case "10":
        month = "OCT";
        break;
      case "11":
        month = "NOV";
        break;
      case "12":
        month = "DEC";
        break;
    }
    return `${day} ${month}`;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateEventDetails}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={
          props.details.first_image
            ? {
                uri: props.details.first_image,
              }
            : {
                uri: props.details.second_image,
              }
        }
      />
      {/* Event Date */}
      {/* <Text style={styles.date}>00 Jan</Text> */}
      <Text style={styles.date}>{parseDate(props.details.start_time)}</Text>
      <Text category="h6" style={styles.title}>
        {props.details.title}
      </Text>
      <Text category="p1" style={styles.id}>
        ID: {props.details.event_key || "no event key"}
      </Text>
      <Layout style={styles.location}>
        <Image
          resizeMode="contain"
          source={require("../../../assets/Vector(10).png")}
        />
        <Text category="p2">
          {"     "}
          {props.details.address}, {props.details.city}, {props.details.zip}
        </Text>
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
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    width: "100%",
    height: 230,
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
    top: 170,
  },
});

export default EventCard;
