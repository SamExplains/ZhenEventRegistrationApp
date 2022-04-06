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

export const EventDetailedScreen = ({ navigation, route }) => {
  const eventDetails = useSelector((state) =>
    route.params.fromComponent === "event"
      ? state.eventsAndUsers.activeEvent
      : state.eventsAndUsers.searchResultDetails
  );
  const [source, setSource] = useState(eventDetails.first_image);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Update image source
    setSource(
      eventDetails.first_image.length
        ? eventDetails.first_image
        : eventDetails.second_image
    );
  }, [eventDetails]);

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

  // Additional items
  const [additionalItems, setAdditionalItems] = useState(
    parseAdditionalItems()
  );

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
    if (additionalItems.length) {
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
    } else {
      return <Text>No items available</Text>;
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
          <Text category="p2" style={{ color: "#454545" }}>
            Items needed for the Party
          </Text>
          {renderChecklist()}
          <Button style={styles.button} size="medium">
            Register
          </Button>
        </Layout>
      </ScrollView>
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
