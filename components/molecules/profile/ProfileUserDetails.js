import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import React, { Component } from "react";
import { Layout, Tab, TabView } from "@ui-kitten/components";
import EventGeneral from "./EventGeneral";

export default class ProfileUserDetails extends Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Text style={styles.about}>Firstname Lastname</Text>
        <Text style={styles.about}>ZIP</Text>
        <Text style={styles.about}>Phone</Text>
        <Layout style={styles.tabbar}>
          <TabView selectedIndex={0} onSelect={0}>
            <Tab title="USERS">
              <EventGeneral />
            </Tab>
            <Tab title="ORDERS">
              <Layout>
                <Text category="h5">ORDERS</Text>
              </Layout>
            </Tab>
            <Tab title="TRANSACTIONS">
              <Layout>
                <Text category="h5">TRANSACTIONS</Text>
              </Layout>
            </Tab>
          </TabView>
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "row",
  },
  about: {
    paddingLeft: 10,
    marginTop: 10,
  },
  tabbar: {
    padding: 20,
  },
  tab: { marginBottom: 50 },
});
