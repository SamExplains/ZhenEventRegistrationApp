import { View, StyleSheet } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import React, { Component } from "react";
import { SearchOutline, Options2 } from "../../../assets/icons";

export const SearchAndFilter = () => {
  const [value, setValue] = React.useState("");
  return (
    <View style={styles.container}>
      <Input
        textStyle={{ paddingLeft: 5 }}
        style={styles.search}
        value={value}
        placeholder="Search by Event Name or Event Type"
        accessoryLeft={SearchOutline}
        onChangeText={setValue}
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
