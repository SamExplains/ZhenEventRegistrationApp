import React, { useState } from "react";
import { ArrowIosBackIcon, MenuIcon } from "../../assets/icons";
import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Button,
} from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import LoginScreen from "../authentication/LoginScreen";
import ProfileUserDetails from "../../components/molecules/profile/ProfileUserDetails";

export const ProfileScreen = () => {
  // State temporarily
  // TRUE means we have been Authenticated
  const [logged, setLogged] = useState(false);

  const navigation = useNavigation();

  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={logged ? "Profile" : "Login / Signup"}
        alignment="center"
        accessoryLeft={renderDrawerAction}
      />
      <Divider />

      {logged ? (
        <Layout style={{ flex: 1, textAlign: "left" }}>
          <ProfileUserDetails />
        </Layout>
      ) : (
        // Show Login Screen which also inclused Signup
        <LoginScreen />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
