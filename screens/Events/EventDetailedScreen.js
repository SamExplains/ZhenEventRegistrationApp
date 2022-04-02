import { View, Image, StyleSheet, Clipboard } from "react-native";
import React, { Component, useState } from "react";
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
  CopyOutline,
} from "../../assets/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { SliderBox } from "react-native-image-slider-box";

export const EventDetailedScreen = ({ navigation, route }) => {
  // Check images to only return an array of actual image links
  const checkImages = () => {
    if (route.params.first_image && route.params.second_image) {
      return [route.params.first_image, route.params.second_image];
    } else if (route.params.first_image) {
      return [route.params.first_image];
    } else {
      return [route.params.second_image];
    }
  };

  const [images, setImages] = useState(checkImages);
  const [checked, setChecked] = React.useState(true);
  const [visible, setVisible] = React.useState(false);
  // Clipboard
  const [copiedText, setCopiedText] = useState("");

  // const copyToClipboard = () => {
  //   Clipboard.setString("hello world");
  // };
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    // fill="white"
    // <TopNavigationAction icon={ArrowBackIconWhite} onPress={navigateBack} />
    <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack} />
  );

  const renderChecklist = () => {
    return JSON.parse(route.params.additional_items).length ? (
      <Text>Checklist items go here...</Text>
    ) : (
      <Text>No items available</Text>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title={() => (
          // <Text style={{ color: "white" }}>Event Details Title</Text>
          <Text>{route.params.title}</Text>
        )}
        alignment="center"
        accessoryLeft={BackAction}
        style={styles.topnav}
        // backgroundColor="transparent"
      />
      <ScrollView>
        {/* Image Containe "TOP" */}
        <SliderBox
          sliderBoxHeight={300}
          resizeMode={"cover"}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          autoplay
          circleLoop
          images={images}
        />
        <Layout style={styles.imageContainer}>
          {/* <Image
            resizeMode="cover"
            style={{ width: "100%", height: 300 }}
            source={{
              uri: `http:10.0.2.2:8000/storage/${route.params.first_image}`,
            }}
          /> */}
        </Layout>
        {/* Content Container */}
        <Layout style={styles.contentContainer}>
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
                  {route.params.url}/{route.params.event_key}
                </Text>
                {/* <Button
                  style={styles.pagelinkBtn}
                  size="small"
                  appearance="ghost"
                  onPress={() => copyToClipboard()}
                >
                  <CopyOutline style={styles.copy} />
                </Button> */}
              </Layout>
              {/* <Button onPress={() => setVisible(false)}>DISMISS</Button> */}
            </Card>
          </Modal>

          <Text category="h6" style={styles.title}>
            {route.params.title}
          </Text>
          <Text style={styles.spotsLeft}>
            Spots Left:
            <Text> 0/{route.params.capacity} Full</Text>
          </Text>
          {/* Four Purple Labels */}
          <Layout style={styles.fourLabelsContainer}>
            <Text style={styles.purpleLabel}>ID: {route.params.event_key}</Text>
            <Text style={styles.purpleLabel}>
              {route.params.public_private ? "Public" : "Private"}
            </Text>
            <Text style={styles.purpleLabel}>
              {route.params.on_off_line ? "Online" : "Offline"}
            </Text>
            <Text style={styles.purpleLabel}>0/{route.params.capacity}</Text>
          </Layout>
          <Text category="p1" style={styles.description}>
            {route.params.description}
          </Text>

          {/* Date */}
          <Layout style={styles.DMLContainer}>
            <Layout style={styles.DMLItemLeft}>
              <CalendarOutline style={styles.icon} />
            </Layout>
            <Text style={styles.DMLItemMiddle}>
              {route.params.start_time} - {route.params.end_time}
            </Text>
            <Text style={styles.DMLItemRight}></Text>
          </Layout>
          {/* Location */}
          <Layout style={styles.DMLContainer}>
            <Layout style={styles.DMLItemLeft}>
              <MapOutline style={styles.icon} />
            </Layout>
            <Text style={styles.DMLItemMiddle}>
              {route.params.address}, {route.params.city}, {route.params.zip}
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
            <Text style={styles.DMLItemMiddle}>{route.params.url}</Text>
            <Layout style={styles.DMLItemRight}></Layout>
          </Layout>

          <Divider style={{ marginTop: 25, marginBottom: 25 }} />
          <Text category="p2" style={{ color: "#454545" }}>
            Items needed for the Party
          </Text>
          {renderChecklist()}
          {/* <CheckBox
            style={styles.checkbox}
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
          >
            {`Checked: ${checked}`}
          </CheckBox>
          <CheckBox
            style={styles.checkbox}
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
          >
            {`Checked: ${checked}`}
          </CheckBox> */}
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
  imageContainerImageNumber: {
    position: "absolute",
    color: "white",
    bottom: 0,
    marginBottom: 35,
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
});

export default EventDetailedScreen;
