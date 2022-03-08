import { ActivityIcon, VideoIcon, ProfileIcon } from "../assets/icons";
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
} from "@ui-kitten/components";

import { HomeScreen } from "../screens/HomeScreen";
import React from "react";
import { StoryDetailsScreen } from "../screens/StoryDetailsScreen";
import { VideosScreen } from "../screens/VideosScreen";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";
import { SignupScreen } from "../screens/authentication/SignupScreen";
import PasswordResetScreen from "../screens/authentication/PasswordResetScreen";
import EventDetailedScreen from "../screens/Events/EventDetailedScreen";
import EventsScreen from "../screens/Events/EventsScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <View>
    <Divider />
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab title="Stories" icon={ActivityIcon} />
      <BottomNavigationTab title="Videos" icon={VideoIcon} />
      <BottomNavigationTab title="Profile" icon={ProfileIcon} />
    </BottomNavigation>
  </View>
);

export const BottomTabsNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={EventsScreen} />
    <Screen name="Videos" component={VideosScreen} />
    <Screen name="Profile" component={ProfileScreen} />
    <Screen name="Details" component={StoryDetailsScreen} />
    <Screen name="Signup" component={SignupScreen} />
    <Screen name="Reset" component={PasswordResetScreen} />
    <Screen name="EventDetails" component={EventDetailedScreen} />
  </Navigator>
);
