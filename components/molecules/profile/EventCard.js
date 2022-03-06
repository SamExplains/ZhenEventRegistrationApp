import { Text, View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import { Layout, Button, ButtonGroup } from "@ui-kitten/components";

export default class EventCard extends Component {
  render() {
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
          <Button style={styles.button}>View</Button>
          {/* Edit / Check In */}
          {/* <Button style={styles.buttonAlternate}>
            <Text style={{ color: "#3F295A" }}>Edit or Check In</Text>
          </Button> */}
          <ButtonGroup style={styles.buttonGroup} status="control">
            <Button style={{ width: "42%" }}>
              <Text style={{ color: "#3F295A" }}>Edit</Text>
            </Button>
            <Button style={{ width: "58%" }}>
              <Text style={{ color: "#3F295A" }}>Check In</Text>
            </Button>
          </ButtonGroup>
        </Layout>
      </View>
    );
  }
}

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
    width: "48.5%",
    marginTop: 20,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
  buttonAlternate: {
    width: "48.5%",
    marginTop: 20,
    backgroundColor: "white",
    borderColor: "#3F295A",
  },
  buttonGroup: {
    width: "48.5%",
    borderWidth: 0,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#3F295A",
    // borderColor: "white",
  },
});
