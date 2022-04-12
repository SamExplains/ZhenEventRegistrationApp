import {
  Avatar,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { HomeIcon, InfoIcon, LoginIcon } from "../assets/icons";

import { BottomTabsNavigator } from "./BottomTabsNavigator";
import { LoginScreen } from "../screens/authentication/LoginScreen";
import React from "react";
import { RegisterScreen } from "../screens/RegisterScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
  const authenticated = useSelector(
    (state) => state.eventsAndUsers.authenticated
  );
  const currentUser = useSelector((state) => state.eventsAndUsers.currentUser);

  const styles = useStyleSheet(themedStyles);

  const Header = () => (
    <Layout style={styles.header}>
      <View style={styles.profileContainer}>
        <Avatar
          size="giant"
          source={
            authenticated
              ? { uri: currentUser.profile_image_src }
              : require("../assets/MomsInLA-condensed.png")
          }
        />
        <Text style={styles.profileName} category="h6">
          {authenticated ? currentUser.name : ""}
        </Text>
      </View>
    </Layout>
  );

  return (
    <SafeAreaView>
      <Drawer
        header={Header}
        selectedIndex={new IndexPath(state.index)}
        onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      >
        <DrawerItem title="Home" accessoryLeft={HomeIcon} />
        {/* <DrawerItem title="Profile" accessoryLeft={InfoIcon} /> */}
        <DrawerItem title="Settings" accessoryLeft={InfoIcon} />
        {/* <DrawerItem title="Login" accessoryLeft={LoginIcon} /> */}
      </Drawer>
    </SafeAreaView>
  );
};

export const HomeDrawerNavigator = () => (
  <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Screen name="Home" component={BottomTabsNavigator} />
    {/* <Screen name="Profile" component={ProfileScreen} /> */}
    <Screen name="Settings" component={SettingsScreen} />
    {/* <Screen name="Login" component={LoginScreen} /> */}

    {/* <Screen name="Register" component={RegisterScreen} /> */}
  </Navigator>
);

const themedStyles = StyleService.create({
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginHorizontal: 16,
  },

  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
});
