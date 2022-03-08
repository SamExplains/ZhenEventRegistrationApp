import { View, ScrollView, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Divider, Layout, Text } from "@ui-kitten/components";
import EventCard from "../../components/molecules/events/EventCard";

export default class EventsScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Layout style={{ position: "relative" }}>
            <Layout style={styles.header}>
              <Text category="h5" style={styles.appTitle}>
                Party Be Mine
              </Text>
              <Text style={styles.appSubtitle} category="c2">
                Create Your Favorite Events
              </Text>
              {/* Four Labels */}
              <Layout style={styles.labelsContainer}>
                <Text style={styles.purpleLabel}>Birthday</Text>
                <Text style={styles.purpleLabel}>Potluck</Text>
                <Text style={styles.purpleLabel}>Party</Text>
                <Text style={styles.purpleLabel}>Online</Text>
              </Layout>
              <Text style={styles.appSubtitle} category="c2">
                Assign Party Supplies or Check In Your Guest
              </Text>
            </Layout>
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
          <Layout style={styles.contentContainer}>
            <Text category="h6" style={styles.title}>
              Recently Listed Events
            </Text>
            <ScrollView>
              <EventCard />
              <EventCard />
            </ScrollView>
          </Layout>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#301A4B",
    height: 215,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    position: "relative",
  },
  appTitle: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  appSubtitle: {
    fontWeight: "500",
    color: "white",
  },
  labelsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginTop: 15,
    marginBottom: 15,
  },
  purpleLabel: {
    backgroundColor: "#301A4B",
    borderColor: "#ADA2BA",
    borderWidth: 2,
    color: "#ADA2BA",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 25,
    fontSize: 11,
    marginLeft: 5,
    marginRight: 5,
    textAlignVertical: "center",
    textAlign: "center",
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
  contentContainer: {
    // padding: 15,
    marginTop: -25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
  },
  title: {
    fontWeight: "700",
    marginTop: 15,
  },
});
