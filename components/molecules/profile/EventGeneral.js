import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { Button, Layout } from "@ui-kitten/components";

export default class EventGeneral extends Component {
  render() {
    return (
      <View>
        <Layout style={styles.container}>
          <Layout>
            <Text>EventGeneral</Text>
          </Layout>
          <Layout>
            <Text style={{ marginLeft: 15 }}>Eiusmod incididunt sunt elit</Text>
          </Layout>
          <Layout>
            <Button style={{ marginLeft: 15 }} size="tiny">
              Button 1
            </Button>
          </Layout>
        </Layout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
