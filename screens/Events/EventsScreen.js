import { FlatList, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Spinner,
} from "@ui-kitten/components";
import { MenuIcon } from "../../assets/icons";
import EventCard from "../../components/molecules/events/EventCard";
import { SearchAndFilter } from "../../components/molecules/events/SearchAndFilter";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../store/actions/event";
import baseUrl from "../../settings.json";

export const EventsScreen = () => {
  // State
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // true as in fetching data
  const [events, setEvents] = useState(
    useSelector((state) => state.eventsAndUsers.allEvents)
  );
  const navigation = useNavigation();

  const navigateDetails = () => {
    navigation.navigate("Reset");
  };

  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );

  const componentDidMount = async () => {
    console.log("componentDidMount");

    // Get first batch of events from API
    if (loading) {
      await axios
        .get(`${baseUrl.api}/events`)
        .then(({ data }) => {
          // dispatch(fetchEvents(data));
          // setEvents(useSelector((state) => state.eventsAndUsers.allEvents));
          setEvents(data.data);
          // console.log("We got data! ", data);
        })
        .catch((e) => console.log(e));
    } else {
      console.log("Got initial data! ", events);
    }
  };

  useEffect(() => {
    componentDidMount(setLoading(false));
  }, [events]);

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
            <Text style={styles.appSubtsitle} category="c2">
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
        <Layout style={styles.contentContainer}>
          <SearchAndFilter />

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
      {!loading ? (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={events}
          renderItem={({ item }) => <EventCard details={item} />}
          keyExtractor={(item) => item.id.toString()}
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
    top: -30,
  },
  contentContainer: {
    // padding: 15,
    marginTop: -25,
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
  spinner: {},
});

export default EventsScreen;
