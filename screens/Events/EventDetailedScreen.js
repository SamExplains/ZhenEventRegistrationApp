import { Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
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
  Radio,
  RadioGroup,
} from "@ui-kitten/components";
import {
  ArrowBackIcon,
  CalendarOutline,
  NavigationOutline2,
  MapOutline,
  GlobeOutline,
  ShareLink,
  Twitter,
  Facebook,
} from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import Toast from "react-native-toast-message";
import axios from "axios";
import {
  updateEventChecklist,
  updateEventSearchChecklist,
} from "../../store/actions/event";
import ROOT_URL from "../../settings.json";

export const EventDetailedScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const eventDetails = useSelector((state) =>
    route.params.fromComponent === "event"
      ? state.eventsAndUsers.activeEvent
      : route.params.fromComponent === "search"
      ? state.eventsAndUsers.searchResultDetails
      : state.eventsAndUsers.tabEventDetails
  );
  const user = useSelector((state) => state.eventsAndUsers.currentUser);
  const authenticated = useSelector(
    (state) => state.eventsAndUsers.authenticated
  );
  const [source, setSource] = useState(eventDetails.first_image);
  const [visible, setVisible] = useState(false);
  const [registered, setRegistered] = useState(false);
  // Additional items
  const [additionalItems, setAdditionalItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  useEffect(() => {
    // Check if registered
    checkIfRegistered();
    // Update image source
    setSource(
      eventDetails.first_image.length
        ? eventDetails.first_image
        : eventDetails.second_image
    );
    setAdditionalItems(parseAdditionalItems());
  }, [eventDetails]);

  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const checkIfRegistered = async () => {
    if (authenticated) {
      // Make request to get value
      await axios
        .get(`${ROOT_URL.api}/registration/user/${user.id}/${eventDetails.id}`)
        .then(({ data }) => {
          // IF there is data update the flag
          // console.log(...data);
          if (data.length) {
            // Set the record to UPDATE record
            setRegistered(...data);
          } else {
            // Push an empty object to CREATE a record
            console.log("Registered NULL...set clean object!");
            setRegistered({
              id: null,
              registered: 0,
              creator_id: user.id,
              event_id: eventDetails.id,
            });
          }
        })
        .catch((e) => {
          console.log("Error fetching ", e);
        });
    } else {
      console.log("No registered found since not authenticated!");
    }
  };

  const onUnsubscribe = async () => {
    await axios
      .patch(`${ROOT_URL.api}/registration/${registered.id}`, {
        registered: 0,
      })
      .then(({ data }) => {
        setRegistered(data);
      });
    Toast.show({
      type: "info",
      text1: "Unsubscribed",
      text2: "You are not longer registered for this event!",
    });
  };

  const onSubscribe = async () => {
    console.log("onSubscribe");
    // Insert event into Registered
    // Check if registered object has an id
    if (registered.id !== null) {
      console.log("We have a ID");
      await axios
        .patch(`${ROOT_URL.api}/registration/${registered.id}`, {
          registered: 1,
        })
        .then(({ data }) => {
          setRegistered(data);
        });
    } else {
      console.log("NO ID...creating");
      await axios
        .post(`${ROOT_URL.api}/registration`, {
          creator_id: user.id,
          event_id: eventDetails.id,
          registered: 1,
        })
        .then(({ data }) => setRegistered(data));
    }
    Toast.show({
      type: "success",
      text1: "Subscribed",
      text2: "You are registered for this event!",
    });
  };

  const showRegisterButton = () => {
    if (authenticated) {
      return registered.registered === 1 ? (
        <Button style={styles.button} size="medium" onPress={onUnsubscribe}>
          Unsubscribe
        </Button>
      ) : (
        <Button style={styles.button} size="medium" onPress={onSubscribe}>
          Subscribe
        </Button>
      );
    }
    return (
      <Text
        style={{
          padding: 15,
          marginTop: 15,
          textAlign: "center",
          borderWidth: 1,
          borderColor: "#E6E5E5",
        }}
      >
        Login to subscribe or use checklist.
      </Text>
    );
  };

  // Check images to only return an array of actual image links
  const checkImages = () => {
    if (eventDetails.first_image && eventDetails.second_image) {
      // setImages([eventDetails.first_image, eventDetails.second_image]);
      return [eventDetails.first_image, eventDetails.second_image];
    } else if (eventDetails.first_image) {
      // setImages([eventDetails.first_image]);
      return [eventDetails.first_image];
    } else {
      // setImages([eventDetails.second_image]);
      return [eventDetails.second_image];
    }
  };

  const parseAdditionalItems = () => {
    // Parse for state
    const parsed = JSON.parse(eventDetails.additional_items);
    // Set the selected index
    if (parsed.length) {
      // Check for the item if there is one taken
      const foundIndex = parsed.findIndex((item) => item.taken === user.name);
      // Set the index
      foundIndex ? setSelectedIndex(foundIndex) : null;
    }
    return parsed.length ? [...parsed] : [];
  };

  const toggleImage = (index) => {
    console.log("Toggled");
    index === 0
      ? setSource(eventDetails.first_image)
      : setSource(eventDetails.second_image);
  };

  const renderImageToggle = () => {
    return checkImages().map((img, index) => {
      return (
        <TouchableOpacity onPress={() => toggleImage(index)} key={index}>
          <Image
            source={{ uri: img }}
            style={styles.imageContainerImageThumbnail}
          />
        </TouchableOpacity>
      );
    });
  };

  const renderChecklist = () => {
    console.log("render checklist");
    if (additionalItems.length && authenticated) {
      const _c = [...additionalItems];
      return _c.map((item) => {
        return !item.taken ? (
          <Radio key={item.id}>{item.name}</Radio>
        ) : (
          <Radio key={item.id} disabled={true}>
            {item.name}{" "}
            {item.taken ? " will be brought by " + item.taken : null}
          </Radio>
        );
      });
    } else if (!additionalItems.length && authenticated) {
      return <Text>Checklist is empty.</Text>;
    } else {
      if (additionalItems.length) {
        const _c = [...additionalItems];
        return _c.map((item) => {
          return <Text key={item.id}>{item.name}</Text>;
        });
      } else return <Text>No checklist available</Text>;
    }
  };

  const setSelectedIndexAndUpdateChecklist = (index) => {
    // console.log("setSelectedIndexAndUpdateChecklist ", index);
    // Check for the item if there is one taken
    const foundIndex = additionalItems.findIndex(
      (item) => item.taken === user.name
    );
    // Remove properties from old one only if a match was found
    if (foundIndex >= 0) {
      additionalItems[foundIndex].taken = "";
      additionalItems[foundIndex].checked = false;
    }
    // Update with new data
    additionalItems[index].taken = user.name;
    additionalItems[index].checked = user.true;
    // Set state
    setAdditionalItems([...additionalItems]);
    // Update state
    setSelectedIndex(index);
  };

  const onSaveChecklist = async () => {
    // Save through request
    await axios
      .patch(`${ROOT_URL.api}/checklist`, {
        id: eventDetails.id,
        additional_items: JSON.stringify(additionalItems),
      })
      .then(({ data }) => {
        // console.log(additionalItems);
        // Update event state if it is Search of Event screen
        if (route.params.fromComponent === "event") {
          dispatch(updateEventChecklist(data));
        } else if (route.params.fromComponent === "search") {
          dispatch(updateEventSearchChecklist(data));
        }
        // console.log("Data ", data);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => <Text>{eventDetails.title}</Text>}
        alignment="center"
        accessoryLeft={BackAction}
        style={styles.topnav}
        // backgroundColor="transparent"
      />
      <ScrollView>
        {/* Image Containe "TOP" */}
        <Layout style={styles.imageContainer}>
          <Image
            style={{ height: 300, width: "100%" }}
            source={{ uri: source }}
          />
          {/* Image number container */}
          <Layout
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              position: "absolute",
              bottom: 0,
              backgroundColor: "transparent",
            }}
          >
            {renderImageToggle()}
          </Layout>
          {/* Modal */}
          <Button
            size="tiny"
            appearance="ghost"
            style={styles.imageContainerShareButton}
            onPress={() => setVisible(true)}
          >
            <ShareLink fill="black" style={styles.icon} />
          </Button>
          {/* Share modal links */}
          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
          >
            <Card disabled={true}>
              <Text category="h6" style={{ fontWeight: "bold" }}>
                Share
              </Text>
              <Layout style={styles.socialsContainer}>
                <Twitter style={styles.social}>1</Twitter>
                <Facebook style={styles.social}>2</Facebook>
                <Twitter style={styles.social}>3</Twitter>
                <Facebook style={styles.social}>4</Facebook>
              </Layout>
              <Text category="p2" style={{ fontWeight: "bold" }}>
                Page Link
              </Text>
              <Layout style={styles.pagelinkContainer}>
                <Text
                  style={{ fontWeight: "bold", marginBottom: 15 }}
                  style={styles.pagelinkText}
                >
                  {eventDetails.url}/{eventDetails.event_key}
                </Text>
              </Layout>
              <Layout
                style={{
                  display: "flex",
                  marginTop: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: 75, width: 75 }}
                  source={{ uri: eventDetails.qrcode }}
                />
                <Text
                  style={{
                    fontWeight: "bold",
                    padding: 10,
                    textAlign: "center",
                  }}
                >
                  www.domain.com/api/events/ID
                </Text>
              </Layout>
              {/* QR code link */}
            </Card>
          </Modal>
        </Layout>
        {/* Content Container */}
        <Layout style={styles.contentContainer}>
          <Text category="h6" style={styles.title}>
            {eventDetails.title}
          </Text>
          <Text style={styles.spotsLeft}>
            Spots Left:
            <Text> 0/{eventDetails.capacity} Full</Text>
          </Text>
          {/* Four Purple Labels */}
          <Layout style={styles.fourLabelsContainer}>
            <Text style={styles.purpleLabel}>ID: {eventDetails.event_key}</Text>
            <Text style={styles.purpleLabel}>
              {eventDetails.public_private === 0 ? "Public" : "Private"}
            </Text>
            <Text style={styles.purpleLabel}>
              {eventDetails.on_off_line ? "Online" : "Offline"}
            </Text>
            <Text style={styles.purpleLabel}>0/{eventDetails.capacity}</Text>
          </Layout>
          <Text category="p1" style={styles.description}>
            {eventDetails.description}
          </Text>

          {/* Date */}
          <Layout style={styles.DMLContainer}>
            <Layout style={styles.DMLItemLeft}>
              <CalendarOutline style={styles.icon} />
            </Layout>
            <Text style={styles.DMLItemMiddle}>
              {eventDetails.start_time} - {eventDetails.end_time}
            </Text>
            <Text style={styles.DMLItemRight}></Text>
          </Layout>
          {/* Location */}
          <Layout style={styles.DMLContainer}>
            <Layout style={styles.DMLItemLeft}>
              <MapOutline style={styles.icon} />
            </Layout>
            <Text style={styles.DMLItemMiddle}>
              {eventDetails.address}, {eventDetails.city}, {eventDetails.zip}
            </Text>
            <Layout style={styles.DMLItemRight}>
              <NavigationOutline2 style={styles.icon} />
            </Layout>
          </Layout>
          {/* Website */}
          {/* Location */}
          <Layout style={styles.DMLContainer}>
            <Layout style={styles.DMLItemLeft}>
              <GlobeOutline style={styles.icon} />
            </Layout>
            <Text style={styles.DMLItemMiddle}>{eventDetails.url}</Text>
            <Layout style={styles.DMLItemRight}></Layout>
          </Layout>

          <Divider style={{ marginTop: 25, marginBottom: 25 }} />
          <Text category="p2" style={{ color: "#454545", marginBottom: 10 }}>
            Items needed for the Party
          </Text>

          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndexAndUpdateChecklist(index)}
          >
            {renderChecklist()}
          </RadioGroup>
          {/* Save selection button */}
          {authenticated ? (
            <Button
              style={styles.buttonSaveSelection}
              size="tiny"
              onPress={onSaveChecklist}
            >
              Save selection
            </Button>
          ) : null}
          <Divider style={{ marginTop: 25, marginBottom: 25 }} />
          {/* Register/Not register button */}
          {showRegisterButton()}
        </Layout>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topnav: {
    backgroundColor: "white",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  imageContainerShareButton: {
    // width: 32,
    // height: 32,
    tintColor: "white",
    position: "absolute",
    color: "white",
    top: 10,
    right: 10,
  },
  imageContainerImageThumbnail: {
    bottom: 0,
    marginBottom: 35,
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: 5,
    marginRight: 5,
    height: 25,
    width: 25,
    borderWidth: 2.5,
    borderColor: "white",
  },
  title: {
    fontWeight: "700",
    marginTop: 15,
  },
  contentContainer: {
    position: "relative",
    padding: 15,
    marginTop: -25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  spotsLeft: {
    color: "#301A4B",
    fontWeight: "600",
    marginTop: 15,
  },
  fourLabelsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  purpleLabel: {
    backgroundColor: "#301A4B",
    color: "white",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 25,
    fontSize: 12,
  },
  description: { lineHeight: 30 },
  DMLContainer: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 15,
    // padding: 15,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: "#454545",
  },
  DMLItemLeft: {
    width: "10%",
    textAlignVertical: "center",
    alignItems: "center",
  },
  DMLItemMiddle: {
    width: "70%",
    textAlignVertical: "center",
    paddingLeft: 20,
  },
  DMLItemRight: {
    width: "20%",
    textAlign: "right",
    color: "#301A4B",
    textAlignVertical: "center",
    alignItems: "flex-end",
  },
  checkbox: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  socialsContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
  },
  social: {
    // backgroundColor: "orange",
    // padding: 25,
    width: 25,
    height: 25,
    tintColor: "#301A4B",
  },
  pagelinkContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pagelinkText: {
    width: "90%",
  },
  pagelinkBtn: {
    width: "15%",
  },
  copy: {
    width: 25,
    height: 25,
    tintColor: "#301A4B",
  },
  buttonSaveSelection: {
    marginBottom: 5,
    marginTop: 10,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
    width: "50%",
  },
  button: {
    marginBottom: 15,
    // marginLeft: 15,
    // marginRight: 15,
    marginTop: 5,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
});

export default EventDetailedScreen;
