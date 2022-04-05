import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Divider,
  CheckBox,
  Card,
  Button,
  Modal,
} from "@ui-kitten/components";
import { ArrowBackIcon } from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export const SearchResults = ({ navigation }) => {
  const searchResults = useSelector(
    (state) => state.eventsAndUsers.searchResults
  );

  useEffect(() => {
    console.log("Search results with ", searchResults.length);
  }, [searchResults]);

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );

  const renderResults = () => {
    if (searchResults.length) {
      return searchResults.map((el) => {
        return <Text key={el.id}>Result</Text>;
      });
    } else {
      return <Text>No items found.</Text>;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Search Results"
        alignment="center"
        accessoryLeft={BackAction}
        style={styles.topnav}
        // backgroundColor="transparent"
      />
      <Layout style={styles.container}>{renderResults()}</Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topnav: {
    backgroundColor: "white",
  },
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "lightgreen",
    padding: 15,
  },
});

export default SearchResults;
