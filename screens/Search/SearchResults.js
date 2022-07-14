import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import {
  Text,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { ArrowBackIcon } from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native-gesture-handler";
import SearchCard from "../../components/molecules/search/SearchCard";
import { setSearchResultEventDetails } from "../../store/actions/event";

export const SearchResults = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const searchResults = useSelector(
    (state) => state.eventsAndUsers.searchResults
  );

  useEffect(() => {}, [searchResults]);

  const navigateBack = () => {
    navigation.goBack();
  };
  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );

  const setSearchEventDetails = async (item) => {
    consollog("setSearchEventDetails");
    await Promise.all([dispatch(setSearchResultEventDetails(item))]);
    // Navigate to card
    navigation.navigate("EventDetails", {
      fromComponent: "search",
    });
  };

  const renderResults = () => {
    if (searchResults.length) {
      return (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.event_key.toString()}
          renderItem={({ item }) => (
            <SearchCard details={item} fromComponent="search" />
          )}
          onEndReachedThreshold={0.9}
        />
      );
    } else {
      return <Text style={{ padding: 15 }}>No reults found.</Text>;
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
      {renderResults()}
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
  },
});

export default SearchResults;
