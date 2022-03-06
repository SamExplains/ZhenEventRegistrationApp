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
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { ArrowBackIcon } from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const email = null;
export const PasswordResetScreen = ({ navigation }) => {
  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );
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
            {/* Image and button */}
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
              <Text>1/3</Text>
              <Text>Finish implementing the other 3 sceens if possible.</Text>
            </Layout>
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

export default PasswordResetScreen;
