import { Image, StyleSheet } from "react-native";
import { Layout, Button, Input, Text } from "@ui-kitten/components";
import React, { Component } from "react";

export default class VerifyScreen extends Component {
  render() {
    return (
      <Layout style={styles.container}>
        <Image
          style={styles.icon}
          source={require("../../assets/Vector(26).png")}
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
          Verify It's You
        </Text>
        <Text category="c1" style={{ marginLeft: 15 }}>
          Enter the code sent to your email
        </Text>
        {/* Code Input */}
        <Layout style={styles.inputContainer}>
          <Input
            style={styles.input}
            textAlign={"center"}
            maxLength={1}
            height={40}
            width={15}
            keyboardType="numeric"
          />
          <Input
            textAlign={"center"}
            style={styles.input}
            maxLength={1}
            height={40}
            width={15}
            keyboardType="numeric"
          />
          <Input
            textAlign={"center"}
            style={styles.input}
            maxLength={1}
            height={40}
            width={15}
            keyboardType="numeric"
          />
          <Input
            textAlign={"center"}
            style={styles.input}
            maxLength={1}
            height={40}
            width={15}
            keyboardType="numeric"
          />
          <Input
            textAlign={"center"}
            style={styles.input}
            maxLength={1}
            height={40}
            width={15}
            keyboardType="numeric"
          />
          <Input
            textAlign={"center"}
            style={styles.input}
            maxLength={1}
            height={40}
            width={15}
            keyboardType="numeric"
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
    backgroundColor: "#D8E0E1",
  },
  inputContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
});
