import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { findEventDetails } from "../../../store/actions/event";
import CheckInScreen from "../../../screens/Profile/UserCheckInScreen";

export const EventCard = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateEventDetails = async () => {
    // console.log("Navigating to details!");
    // Dispatch ID to set event
    await Promise.all([dispatch(findEventDetails(props.details.id))]).then(
      () => {
        navigation.navigate("EventDetails", {
          fromComponent: props.fromComponent,
        });
      }
    );
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

  const eventCardPublic = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={navigateEventDetails}>
        <Layout style={styles.split_container}>
          {/* Image */}
          <Layout style={styles.split_container_image}>
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
          </Layout>
          {/* Right */}
          <Layout style={styles.split_container_content}>
            <Text category="p1" style={styles.title}>
              {props.details.title}
            </Text>
            <Text category="c1" style={styles.id}>
              {props.details.start_time}
              {"   "}-{"   "}
              {props.details.end_time}
            </Text>
            <Layout style={styles.location}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/Vector(10).png")}
              />
              <Text category="c2">
                {"     "}
                {props.details.address}, {props.details.city},{" "}
                {props.details.zip}
              </Text>
            </Layout>
          </Layout>
        </Layout>
      </TouchableOpacity>
    );
  };

  const eventIsPrivate = () => {
    //   return props.details.public_private === 1 ? (
    //     <Layout style={styles.container}>
    //       <Text>Event is Private...only showing for debug purposes.</Text>
    //     </Layout>
    //   ) : (
    //     eventCardPublic()
    //   );
    // };
    return props.details.public_private !== 1 ? eventCardPublic() : null;
  };

  return eventIsPrivate();
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
  split_container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  split_container_image: {
    width: "30%",
  },
  split_container_content: {
    width: "70%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: "100%",
    height: 100,
  },
  title: {
    fontWeight: "bold",
    // marginTop: 10,
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
  eid: {
    backgroundColor: "white",
    width: 65,
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
    color: "#301A4B",
    borderRadius: 5,
    position: "absolute",
    left: 20,
    top: 20,
  },
});

export default EventCard;
