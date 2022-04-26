import { FlatList, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Layout,
  Input,
  Text,
  TopNavigation,
  TopNavigationAction,
  Spinner,
  IndexPath,
  Menu,
  MenuItem,
  Button,
} from "@ui-kitten/components";
import { MenuIcon, SearchOutline, Options2 } from "../../assets/icons";
import EventCard from "../../components/molecules/events/EventCard";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchEvents, setSearchResults } from "../../store/actions/event";
import baseUrl from "../../settings.json";

export const EventsScreen = () => {
  // State
  const dispatch = useDispatch();
  const [shouldFetch, setShouldFetch] = useState(true);
  // next page API url
  const [page, setPage] = useState(null);
  // final page API endpoint which is recieved from 1st API call
  const [finalPage, setFinalPage] = useState(null);
  const [finalPageReached, setFinalPageReached] = useState(false);
  const [events, setEvents] = useState([]);
  // Search and filter State
  const [value, setValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const navigation = useNavigation();

  const onSearchQuery = async () => {
    await axios
      .get(`${baseUrl.api}/events/search/${value}`)
      .then(({ data }) => {
        console.log("Search softkey pressed!");
        // Dispatch
        dispatch(setSearchResults(data));
        // Move to Results screen
        navigation.navigate("SearchResults", { fromComponent: "search" });
      })
      .catch((e) => {
        console.log("Error ", e);
      });
  };

  const onShowFilterMenu = () => {
    setShowFilter(!showFilter);
  };

  const onSetSelectNewIndex = (index) => {
    switch (index.row) {
      case 0:
        console.log("Set to new");
        // Fetch results
        fetch("new");
        break;
      case 1:
        console.log("Set to old");
        // Fetch results
        fetch("old");
        break;
      case 2:
        console.log("Set to zip");
        // Fetch results
        fetch("zip");
        break;
    }
    setSelectedIndex(index);
  };

  const filterMenu = () => {
    return showFilter ? (
      <Layout style={styles.filterContainer}>
        <Menu
          selectedIndex={selectedIndex}
          onSelect={(index) => onSetSelectNewIndex(index)}
          style={{ padding: 15, marginBottom: 15 }}
        >
          <MenuItem title="New" />
          <MenuItem title="Old" />
          <MenuItem title="Location" />
        </Menu>
      </Layout>
    ) : null;
  };

  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );

  const fetch = async (filter) => {
    // Get first batch of events from API
    console.log("Now fetching with filter of ", filter);

    await axios
      .get(`${baseUrl.api}/events/${filter}`)
      .then(({ data }) => {
        /**
         * FINAL PAGE : last_page_url
         * NEXT PAGE: next_page_url
         * PAYLOAD: data
         */
        console.log("Fetch complete");
        // set the should fetch call to false to prevent fetching
        // Reset these due to a new filter being selected
        setShouldFetch(false);
        setFinalPageReached(false);
        // set next page
        // on page number update
        setPage(data.next_page_url);
        // set final page
        data.current_page === 1
          ? setFinalPage(data.last_page_url)
          : setFinalPage(null);
        // Update Store with items
        dispatch(fetchEvents(data.data));
        setEvents(data.data);
      })
      .catch((e) => console.log(e));
  };

  const fetchMore = async () => {
    // console.log("End of list recieved. Will fetch more with ", page);
    // Get next batch of events from API
    // Check if last page url has been met and set flags
    if (!finalPageReached) {
      await axios
        .get(page)
        .then(({ data }) => {
          /**
           * FINAL PAGE : last_page_url
           * NEXT PAGE: next_page_url
           * PAYLOAD: data
           */
          // set next page
          // on next page api url update
          if (data.next_page_url === finalPage) {
            console.log("Final page Reached");
            console.log(data.next_page_url);
            console.log(finalPage);
            setFinalPageReached(true);
          } else {
            // console.log("Previous page ", page);
            setPage(data.next_page_url);
            // Update Store with items
            dispatch(fetchEvents(data.data));
            setEvents(events.concat(data.data));
          }
        })
        .catch((e) => console.log(e));
      // console.log("Stored events of ", storedEvents.length);
    } else {
      console.log("No more results available. Final page reached!");
    }
  };

  useEffect(() => {
    // prevent fetching for other state changes
    if (!shouldFetch) {
      console.log("No more fetching, Initial fetch successfull.");
      return;
    }

    fetch("new");
  }, [page, shouldFetch]);

  const renderHeader = () => {
    return (
      <Layout>
        <Layout style={{ position: "relative" }}>
          <Layout style={styles.header}>
            <Text category="h5" style={styles.appTitle}>
              Party Be Mine
            </Text>
            <Text style={styles.appSubtitle} category="c2">
              Create Your Favorite Events
            </Text>
            {/* Four Labels */}
            <Layout style={styles.labelsContainer}>
              <Text style={styles.purpleLabel}>Birthday</Text>
              <Text style={styles.purpleLabel}>Potluck</Text>
              <Text style={styles.purpleLabel}>Party</Text>
              <Text style={styles.purpleLabel}>Online</Text>
            </Layout>
            <Text style={{ fontWeight: "500", color: "white" }} category="c2">
              Assign Party Supplies or Check In Your Guest
            </Text>
          </Layout>
          {/* Vector 1 */}
          <Image
            style={styles.vector1}
            source={require("../../assets/Vector(3).png")}
          />
          {/* Vector2 */}
          <Image
            style={styles.vector2}
            source={require("../../assets/Vector(1).png")}
          />
          {/* Vector3 */}
          <Image
            style={styles.vector3}
            source={require("../../assets/Vector(2).png")}
          />
        </Layout>

        <Layout>
          <Layout style={styles.searchContainer}>
            <Input
              textStyle={{ paddingLeft: 5 }}
              style={styles.search}
              value={value}
              placeholder="Search by Event Name or Event Type"
              textContentType={"none"}
              clearButtonMode="always"
              returnKeyType="next"
              keyboardType="default"
              accessoryLeft={SearchOutline}
              onChangeText={(newValue) => setValue(newValue)}
              onSubmitEditing={onSearchQuery}
            />
            <Button
              style={styles.button}
              accessoryLeft={Options2}
              onPress={onShowFilterMenu}
            />
          </Layout>
          {filterMenu()}
        </Layout>

        <Layout style={styles.contentContainer}>
          <Text category="h6" style={styles.title}>
            Recently Listed Events
          </Text>
        </Layout>
      </Layout>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Party Be Mine"
        alignment="center"
        accessoryLeft={renderDrawerAction}
      />
      {!shouldFetch ? (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EventCard details={item} fromComponent="event" />
          )}
          // Threshhold, the higher 0.9 the shorter the window becomes for the next list update
          onEndReachedThreshold={0.5}
          onEndReached={fetchMore}
        />
      ) : (
        <Layout style={styles.spinnerContainer}>
          <Spinner style={styles.spinner} />
        </Layout>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#301A4B",
    height: 215,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    position: "relative",
  },
  appTitle: {
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  appSubtitle: {
    fontWeight: "500",
    color: "white",
  },
  labelsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginTop: 15,
    marginBottom: 15,
  },
  purpleLabel: {
    backgroundColor: "#301A4B",
    borderColor: "#ADA2BA",
    borderWidth: 2,
    color: "#ADA2BA",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 25,
    fontSize: 11,
    marginLeft: 5,
    marginRight: 5,
    textAlignVertical: "center",
    textAlign: "center",
  },
  vector1: {
    position: "absolute",
    top: 80,
  },
  vector2: {
    position: "absolute",
    bottom: -20,
    right: 50,
  },
  vector3: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  contentContainer: {
    marginTop: -10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
  },
  title: {
    fontWeight: "700",
    marginTop: 15,
  },
  spinnerContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    marginTop: 15,
    // marginBottom: 30,
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
  filterContainer: {
    marginTop: 15,
  },
});

export default EventsScreen;
