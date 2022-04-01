import { Image, StyleSheet } from "react-native";
import { Layout, Button, Input, Text } from "@ui-kitten/components";
import React, { Component } from "react";

const password = null;

export default class NewPasswordScreen extends Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.icon}
          source={require("../../assets/Vector(27).png")}
        />
        <Text
          category="h6"
          style={{
            fontWeight: "bold",
            paddingLeft: 15,
            color: "#301A4B",
            marginBottom: 20,
          }}
        >
          Enter Your New Password
        </Text>
        <Text category="c1" style={{ marginLeft: 15 }}>
          Ipsum nulla dolor aliquip ad eiusmod cupidatat qui ut ea.
        </Text>
        {/* Code Input */}
        <Layout style={styles.inputContainer}>
          <Input
            style={styles.input}
            value={password}
            label="New Password"
            placeholder="Enter your password"
          />
          <Input
            style={styles.input}
            value={password}
            label="Confirm Password"
            placeholder="Enter your password"
          />
        </Layout>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 150,
    height: 175,
    marginTop: 50,
    marginBottom: 30,
  },
  input: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "white",
    borderColor: "#969595",
    width: "100%",
  },
  inputContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    // padding: 15,
  },
});
