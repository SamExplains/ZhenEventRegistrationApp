import { ActivityIcon, VideoIcon, ProfileIcon } from '../assets/icons';
import { BottomNavigation, BottomNavigationTab, Divider } from '@ui-kitten/components';

import { HomeScreen } from '../screens/HomeScreen';
import React from 'react';
import { StoryDetailsScreen } from '../screens/StoryDetailsScreen';
import { VideosScreen } from '../screens/VideosScreen';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from '../screens/ProfileScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <View>
        <Divider/>
        <BottomNavigation
            appearance='noIndicator'
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab title='Stories' icon={ActivityIcon}/>
            <BottomNavigationTab title='Videos' icon={VideoIcon} />
            <BottomNavigationTab title='Profile' icon={ProfileIcon}/>
        </BottomNavigation>
    </View>
  
);

export const BottomTabsNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={HomeScreen}/>
    <Screen name='Videos' component={VideosScreen} />
    <Screen name='Profile' component={ProfileScreen}/>
    <Screen name='Details' component={StoryDetailsScreen}/>
  </Navigator>
);
