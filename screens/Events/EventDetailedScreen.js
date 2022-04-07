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
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import ROOT_URL from "../../settings.json";
import axios from "axios";

export const EventDetailedScreen = ({ navigation, route }) => {
  const eventDetails = useSelector((state) =>
    route.params.fromComponent === "event"
      ? state.eventsAndUsers.activeEvent
      : state.eventsAndUsers.searchResultDetails
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

  useEffect(() => {
    // Update image source
    setSource(
      eventDetails.first_image.length
        ? eventDetails.first_image
        : eventDetails.second_image
    );
    // console.log("Registered is ", checkIfRegistered());
    setAdditionalItems(parseAdditionalItems());
    setRegistered(checkIfRegistered());
  }, [eventDetails]);

  const checkIfRegistered = () => {
    if (authenticated && eventDetails.registered !== null) {
      // Parse and check registered to see if already done
      const registeredParsed = JSON.parse(eventDetails.registered);
      // Find matching record
      const match = registeredParsed.length
        ? registeredParsed.filter((el) => el.user_id === user.id)
        : null;
      // Check if true and update
      if (match !== null && match.length) {
        // match[0].registered === true ? setRegistered(true) : null;
        // console.log("Search record! ", registered, "   ", match[0].registered);
        return match[0].registered ? true : false;
      }
      return false;
    } else {
      console.log("No registered found! ", eventDetails.registered);
      return false;
    }
  };

  const registeredRequestData = async (flag) => {
    // Update events array the registered field
    const registeredParsed = JSON.parse(eventDetails.registered);
    const regigsteredIndex = registeredParsed.findIndex(
      (el) => el.user_id === user.id
    );
    // Update array with the value
    registeredParsed[regigsteredIndex].registered = flag;
    // Update the database
    const registeredStringified = registeredParsed;
    // Update Event Registered
    await axios.patch(`${ROOT_URL.api}/events/${eventDetails.id}`, {
      registered: registeredStringified,
    });
  };

  const onUnsubscribe = async () => {
    await registeredRequestData(false);
    // Delete from Registrations
    await axios
      .delete(`${ROOT_URL.api}/registration`, {
        data: {
          event_id: eventDetails.id,
          creator_id: user.id,
        },
      })
      .catch((e) => {
        console.log("Error ", e);
      });
    Toast.show({
      type: "info",
      text1: "Registered",
      text2: "You are not longer registered for this event!",
    });
    // Update state
    setRegistered(false);
  };

  const onSubscribe = async () => {
    console.log("onSubscribe");
    // Update events array the registered field
    await registeredRequestData(true);
    // Insert event into Registered
    await axios.post(`${ROOT_URL.api}/registration`, {
      creator_id: user.id,
      event_id: eventDetails.id,
    });
    setRegistered(true);
    Toast.show({
      type: "success",
      text1: "Registered",
      text2: "You are registered for this event!",
    });
  };

  const showRegisterButton = () => {
    if (authenticated) {
      return registered ? (
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
    return parsed.length ? [...parsed] : [];
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );

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

  const updateChecklistItem = (item) => {
    // Updated based on item
    // Dispach to state
    const itemIndex = additionalItems.findIndex((x) => x.id === item.id);
    // Set checked value
    additionalItems[itemIndex].checked = !item.checked;
    // Set taken name
    additionalItems[itemIndex].checked
      ? (additionalItems[itemIndex].taken = "Peanut")
      : (additionalItems[itemIndex].taken = null);
    // Make Request and Update checked items state
    setAdditionalItems([...additionalItems]);
  };

  const renderChecklist = () => {
    if (additionalItems.length && authenticated) {
      const _c = [...additionalItems];
      return _c.map((item) => {
        return (
          <CheckBox
            key={item.id}
            checked={item.checked}
            onChange={() => updateChecklistItem(item)}
            style={{ marginTop: 10 }}
          >
            {item.name}{" "}
            {item.taken ? " will be brought by " + item.taken : null}
          </CheckBox>
        );
      });
    } else if (!additionalItems.length && authenticated) {
      return <Text>Checklist is empty.</Text>;
    } else {
      console.log(additionalItems);
      if (additionalItems.length) {
        const _c = [...additionalItems];
        return _c.map((item) => {
          return <Text key={item.id}>{item.name}</Text>;
        });
      } else return <Text>No checklist available</Text>;
    }
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
          {renderChecklist()}
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
  button: {
    marginBottom: 15,
    // marginLeft: 15,
    // marginRight: 15,
    marginTop: 35,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
});

export default EventDetailedScreen;
