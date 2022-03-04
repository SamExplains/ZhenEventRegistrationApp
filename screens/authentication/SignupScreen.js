import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Icon,
  Input,
  Text,
  Button,
  Layout,
  CheckBox,
  StyleService,
} from "@ui-kitten/components";
import React, { Component, useState } from "react";

const email = null;
const checked = false;

export const SignupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Layout>
          <Layout style={styles.hero}>
            <Text
              category="c2"
              style={{ paddingLeft: 15, marginTop: 50, color: "white" }}
            >
              WELCOME TO
            </Text>
            <Text
              category="h6"
              style={{
                fontWeight: "bold",
                paddingLeft: 15,
                color: "white",
              }}
            >
              Event Registration
            </Text>
          </Layout>
          <Layout style={styles.container}>
            <Text
              category="h6"
              style={{
                fontWeight: "bold",
                paddingLeft: 15,
                marginTop: 25,
                marginBottom: 25,
                color: "#301A4B",
              }}
            >
              Sign Up
            </Text>
            <Input
              style={styles.input}
              value={email}
              label="E-mail"
              placeholder="Enter your email addess"
            />
            <Input
              style={styles.input}
              value={email}
              label="Zip Code"
              placeholder="00000"
            />
            <Input
              style={styles.input}
              value={email}
              label="Name"
              placeholder="John Appleseed"
            />
            <Input
              style={styles.input}
              value={email}
              label="Password (at least 8 characters)"
              placeholder=""
            />
            <Input
              style={styles.input}
              value={email}
              label="Confirm Password"
              placeholder=""
            />
            <Input
              style={styles.input}
              value={email}
              label="Phone Number (Optional)"
              placeholder="000-0000"
            />

            <CheckBox
              style={styles.checkBox}
              checked={checked}
              onChange={(nextChecked) => setChecked(nextChecked)}
            >
              I agree to the{" "}
              <Text style={styles.text_blue}>Terms of Conditions</Text> and{" "}
              <Text style={styles.text_blue}>Privacy Policy</Text>
            </CheckBox>

            <Button style={styles.button} size="medium">
              Let's Go!
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -25,
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  hero: {
    backgroundColor: "#301A4B",
    height: 175,
  },
  input: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 20,
  },

  button: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
  checkBox: {
    marginLeft: 15,
    marginBottom: 20,
  },
  text_blue: {
    color: "#0B2F8D",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default SignupScreen;
