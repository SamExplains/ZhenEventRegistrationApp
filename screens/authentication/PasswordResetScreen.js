import { View, Image } from "react-native";
import {
  Layout,
  Icon,
  Text,
  Input,
  Button,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React, { Component, useState } from "react";
import { StyleSheet } from "react-native";
import { ArrowBackIcon } from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import VerifyScreen from "./VerifyScreen";
import NewPasswordScreen from "./NewPasswordScreen";
import PasswordResetSuccessScreen from "./PasswordResetSuccessScreen";

const email = null;
export const PasswordResetScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );

  const show = () => {
    if (step === 1) {
      return (
        <Layout>
          <Layout style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={styles.image}
              source={require("../../assets/Group.png")}
            />
          </Layout>
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
            <Text category="c1" style={{ marginLeft: 15 }}>
              Enim eiusmod nulla nostrud eiusmod magna fugiat sint magna
              incididunt aliquip sint qui dolor excepteur.
            </Text>
            <Input
              style={styles.input}
              value={email}
              label="E-mail"
              placeholder="Enter your email addess"
            />
          </Layout>
        </Layout>
      );
    } else if (step === 2) {
      return <VerifyScreen />;
    } else if (step === 3) {
      return <NewPasswordScreen />;
    } else {
      return <PasswordResetSuccessScreen />;
    }
  };
  const showStep = () => {
    if (step === 1 || step === 2 || step === 3) {
      return <Text style={styles.step}>{step}/3 </Text>;
    }
  };
  const showButton = () => {
    switch (step) {
      case 1:
      case 2:
        return (
          <Button style={styles.button} size="medium" onPress={nextStep}>
            Next
          </Button>
        );
        break;
      case 3:
        return (
          <Button style={styles.button} size="medium" onPress={nextStep}>
            Finish
          </Button>
        );
        break;
      case 4:
        return (
          <Button style={styles.button} size="medium" onPress={navigateBack}>
            Continue to App
          </Button>
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Password Reset"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <ScrollView>
        <View style={{ flex: 1 }}>
          {/* Main */}
          <Layout style={styles.container}>
            {show()}
            {showButton()}
            {/* Step */}
            {showStep()}
          </Layout>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    // marginTop: 14,
  },
  image: {
    height: 250,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 25,
  },
  input: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 40,
    backgroundColor: "white",
    borderColor: "#969595",
  },
  button: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
  step: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});

export default PasswordResetScreen;
