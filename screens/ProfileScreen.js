import { ArrowIosBackIcon, MenuIcon } from '../assets/icons';
import { Divider, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from "@react-navigation/native";

export const ProfileScreen = () => {
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
          title="Settings"
          alignment="center"
          accessoryLeft={renderDrawerAction}
        />
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Profile Screen</Text>
      </Layout>
    </SafeAreaView>
  );
};
