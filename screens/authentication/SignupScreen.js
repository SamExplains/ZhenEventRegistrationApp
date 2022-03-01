import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Icon, Input, Text, Button, Layout } from "@ui-kitten/components";
import React, { Component, useState } from "react";

const email = null;

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
          <Button style={styles.button}>Signup</Button>
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
});

export default SignupScreen;
