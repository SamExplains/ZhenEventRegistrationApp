import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

import {
  Icon,
  Input,
  Text,
  Button,
  Layout,
  CheckBox,
  StyleService,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { ArrowBackIcon } from "../../assets/icons";
import React, { Component, useState } from "react";

const email = null;
const checked = false;

export const SignupScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Signup"
        alignment="center"
        accessoryLeft={BackAction}
      />
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
    position: "relative",
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

// export default SignupScreen;
