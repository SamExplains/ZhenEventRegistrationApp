import { View, Image } from "react-native";
import { Layout, Icon, Text, Input, Button } from "@ui-kitten/components";
import React, { Component } from "react";
import { StyleSheet } from "react-native";

const email = null;
export default class PasswordResetScreen extends Component {
  render() {
    return (
      <View>
        {/* Main */}
        <Layout style={styles.container}>
          {/* Image and button */}
          <Icon style={styles.icon} name="arrow-back-outline" />
          <Layout style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={styles.image}
              source={require("../../assets/Group.png")}
            />
          </Layout>
          {/* Form */}
          <Layout>
            <Text
              category="h6"
              style={{
                fontWeight: "bold",
                paddingLeft: 15,
                color: "#301A4B",
                marginBottom: 20,
              }}
            >
              Forgot Password?
            </Text>
            <Text style={{ marginLeft: 15 }}>
              Enim eiusmod nulla nostrud eiusmod magna fugiat sint magna
              incididunt aliquip sint qui dolor excepteur.
            </Text>
            <Input
              style={styles.input}
              value={email}
              label="E-mail"
              placeholder="Enter your email addess"
            />
            <Button style={styles.button} size="medium">
              Next
            </Button>
          </Layout>
        </Layout>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
    tintColor: "black",
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    height: 250,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  input: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 40,
    marginBottom: 25,
    backgroundColor: "white",
    borderColor: "#969595",
  },
  button: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
});
