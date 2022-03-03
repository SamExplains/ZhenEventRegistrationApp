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
} from "@ui-kitten/components";
import React, { Component, useState } from "react";

const email = null;
const checked = false;

export const SignupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Layout style={styles.container}>
          <Input
            style={styles.input}
            value={email}
            label="E-mail"
            placeholder="Enter your email addess"
          />
          <Input
            style={styles.input}
            value={email}
            label="ZIP"
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
            label="Password"
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
            label="Phone"
            placeholder="000-0000"
          />

          <CheckBox
            style={styles.checkBox}
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
          >
            Terms of Conditions and Privacy Policy
          </CheckBox>

          <Button style={styles.button} size="small">
            Signup
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 20,
  },

  button: {
    marginBottom: 10,
    marginLeft: 10,
    width: 150,
  },
  checkBox: {
    marginLeft: 10,
    marginBottom: 20,
  },
});

export default SignupScreen;
