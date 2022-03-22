import baseUrl from "../../settings.json";
import { StyleSheet, View, Image, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import {
  Icon,
  Input,
  Text,
  Button,
  Layout,
  CheckBox,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { ArrowBackIcon } from "../../assets/icons";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";

export const SignupScreen = ({ navigation }) => {
  // State Inputs
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState(false);

  const [name, setName] = useState(null);
  const [nameError, setNameError] = useState(false);

  const [password, setPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [phone, setPhone] = useState(null);
  const [phoneError, setPhoneError] = useState(true);

  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState(false);

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );

  // Validations
  const onEmailBlur = () => {
    email.length ? setEmailError(true) : null;
  };

  const onZipBlur = () => {
    zip.length ? setZipError(true) : null;
  };

  const onNameBlur = () => {
    name.length ? setNameError(true) : null;
  };

  const onPasswodBlur = () => {
    password.length ? setPasswordError(true) : null;
  };

  const onConfirmPasswodBlur = () => {
    if (confirmPassword.length) {
      password === confirmPassword ? setConfirmPasswordError(true) : null;
    }
  };

  const onPhoneBlur = () => {
    phone !== null ? setPhoneError(true) : null;
  };

  // Submit
  const onSignup = async () => {
    if (emailError && zipError && nameError && confirmPasswordError) {
      const response = await axios
        .post(`${baseUrl.api}/signup`, {
          email: email,
          zip: zip,
          name: name,
          password: password,
          phone: phone,
        })
        .catch((e) => {
          console.log(`Error ${e}`);
        });
      //TODO Pass on to STATE REDUX.
      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Registered",
          text2: "Your account has been registered.",
        });
        // Dimiss keyboard if still showing.
        Keyboard.dismiss();
        // Send user back to Log In already signed in due to step above.
        navigateBack();
      } else {
        Toast.show({
          type: "error",
          text1: "Invalid",
          text2: "That email address is already taken.",
        });
      }
    } else {
      // Alert Error for unfinished form data...
      Toast.show({
        type: "error",
        text1: "Please fill all required fields!",
      });
    }
  };

  // Watcher
  // Use this to validate email or whatever with regular expressiosn
  // useEffect(() => {
  //   // Side-effect uses `prop` and `state`
  //   if (email) {
  //     console.log("Greetings!");
  //   }
  // }, [email]);

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
              placeholder="Enter your email address"
              textContentType={"emailAddress"}
              clearButtonMode="always"
              returnKeyType="next"
              keyboardType={"email-address"}
              onChangeText={(newEmail) => setEmail(newEmail)}
              onBlur={onEmailBlur}
              status={emailError ? "success" : "danger"}
            />
            <Input
              style={styles.input}
              value={zip}
              label="Zip Code"
              placeholder="00000"
              maxLength={5}
              clearButtonMode="always"
              returnKeyType="next"
              keyboardType={"number-pad"}
              onChangeText={(newZip) => setZip(newZip)}
              onBlur={onZipBlur}
              status={zipError ? "success" : "danger"}
            />
            <Input
              style={styles.input}
              value={name}
              label="Name"
              placeholder="John Appleseed"
              clearButtonMode="always"
              returnKeyType="next"
              keyboardType={"default"}
              onChangeText={(newName) => setName(newName)}
              onBlur={onNameBlur}
              status={nameError ? "success" : "danger"}
            />
            <Input
              style={styles.input}
              value={password}
              label="Password (at least 8 characters)"
              placeholder=""
              secureTextEntry={true}
              returnKeyType="next"
              onChangeText={(newPassword) => setPassword(newPassword)}
              onBlur={onPasswodBlur}
              status={passwordError ? "success" : "danger"}
            />

            {!confirmPasswordError && (
              <Text style={styles.errorInput}>Passwords don't match!</Text>
            )}

            <Input
              style={styles.input}
              value={confirmPassword}
              label="Confirm Password"
              placeholder=""
              secureTextEntry={true}
              returnKeyType="next"
              onChangeText={(newConfirmPassword) =>
                setConfirmPassword(newConfirmPassword)
              }
              onBlur={onConfirmPasswodBlur}
              status={confirmPasswordError ? "success" : "danger"}
            />
            <Input
              style={styles.input}
              value={phone}
              label="Phone Number (Optional)"
              placeholder="..."
              maxLength={10}
              clearButtonMode="always"
              returnKeyType="next"
              keyboardType={"phone-pad"}
              onChangeText={(newPhone) => setPhone(newPhone)}
              onBlur={onPhoneBlur}
              status={phoneError ? "success" : "danger"}
            />

            <CheckBox
              style={styles.checkBox}
              checked={checked}
              onChange={(nextChecked) => {
                setChecked(nextChecked);
                setCheckedError(!checkedError);
              }}
              status={checkedError ? "success" : "danger"}
            >
              I agree to the{" "}
              <Text style={styles.text_blue}>Terms of Conditions</Text> and{" "}
              <Text style={styles.text_blue}>Privacy Policy</Text>
            </CheckBox>

            <Button style={styles.button} size="medium" onPress={onSignup}>
              Let's Go!
            </Button>
          </Layout>
        </Layout>
      </ScrollView>
      <Toast />
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
  errorInput: {
    padding: 15,
    backgroundColor: "#FD422B",
    marginLeft: 15,
    marginRight: 15,
    color: "white",
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
