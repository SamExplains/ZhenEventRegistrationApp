import { View, StyleSheet } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import baseUrl from "../../../settings.json";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchResults } from "../../../store/actions/event";

import { SearchOutline, Options2 } from "../../../assets/icons";

export const SearchAndFilter = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const onSearchQuery = async () => {
    await axios
      .get(`${baseUrl.api}/events/search/${value}`)
      .then(({ data }) => {
        console.log("Search softkey pressed!");
        // Dispatch
        dispatch(setSearchResults(data));
        // Move to Results screen
        navigation.navigate("SearchResults");
      })
      .catch((e) => {
        console.log("Error ", e);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        textStyle={{ paddingLeft: 5 }}
        style={styles.search}
        value={value}
        placeholder="Search by Event Name or Event Type"
        accessoryLeft={SearchOutline}
        onChangeText={(newValue) => setValue(newValue)}
        onSubmitEditing={onSearchQuery}
      />
      <Button style={styles.button} accessoryLeft={Options2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  search: {
    width: "87%",
    borderRadius: 25,
  },
  button: {
    backgroundColor: "#301A4B",
    borderRadius: 50,
    borderColor: "transparent",
    width: "12%",
  },
});
