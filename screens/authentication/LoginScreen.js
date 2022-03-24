import {
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import {
  Input,
  Layout,
  Text,
  Button,
  ListItem,
  Avatar,
} from "@ui-kitten/components";
import SignupScreen from "./SignupScreen";
import PasswordResetScreen from "./PasswordResetScreen";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

const email = null;
const password = null;

export const LoginScreen = () => {
  const currentUser = useSelector((state) => state.eventsAndUsers.currentUser);
  // Temporarily toggle to switch between the Login view and the Google/Signup view
  const [signup, setSignup] = useState(1);
  const [forgotPassword] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const navigation = useNavigation();

  const navigateForgotPassword = () => {
    navigation.navigate("Reset");
  };

  const navigateSignup = () => {
    navigation.navigate("Signup");
  };

  const onToggleSignup = () => {
    // Toggle based on what screen to show
    setSignup(3);
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("account");
      if (value !== null) {
        // Our data is fetched successfully
        const accounts = JSON.parse(value);
        // Set loaded to true to show the List
        setLoaded(true);
        // Update accounts state with accounts
        setAccounts(accounts);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const InstallButton = (props) => <Button size="tiny">select</Button>;

  const renderItem = (info) => (
    <ListItem
      title={"UI Kitten"}
      description="A set of React Native components"
      accessoryLeft={ItemImage}
      accessoryRight={InstallButton}
    />
  );

  const renderAccountsList = () => {
    if (accounts.length) {
      // accounts.push({ name: "Peanut", id: 111 });
      // accounts.push({ name: "Peanut", id: 112 });
      // accounts.push({ name: "Peanut", id: 113 });
      // accounts.push({ name: "Peanut", id: 114 });
      // accounts.push({ name: "Peanut", id: 115 });
      // accounts.push({ name: "Peanut", id: 116 });
      // accounts.push({ name: "Peanut", id: 117 });
      return accounts.map((account) => {
        return (
          <TouchableOpacity style={styles.accountItem}>
            <Avatar
              source={{
                uri: "https://cdn.pixabay.com/photo/2016/07/31/13/43/dog-1558962_960_720.jpg",
              }}
              shape="square"
            />
            <Text style={styles.accountName}>{account.name}</Text>
          </TouchableOpacity>
        );
      });
    }
  };

  useEffect(() => {
    // Wait for AsyncStorage to finish before rendering the lists account
    _retrieveData();
  }, [loaded]);

  const show = () => {
    if (signup === 1) {
      return (
        <Layout>
          <Layout style={styles.backgroundImageContainer}>
            <Image
              style={styles.backgroundImage}
              source={require("../../assets/Group1.png")}
            />
          </Layout>

          <Text
            category="c2"
            style={{ paddingLeft: 10, marginTop: 20, color: "#301A4B" }}
          >
            WELCOME TO
          </Text>
          <Text
            category="h6"
            style={{
              fontWeight: "bold",
              paddingLeft: 10,
              color: "#301A4B",
              marginBottom: 20,
            }}
          >
            Event Registration
          </Text>
          {loaded ? (
            <ScrollView style={styles.accountsContainer} horizontal={true}>
              {renderAccountsList()}
            </ScrollView>
          ) : (
            <Text>Waiting</Text>
          )}
          <Input
            style={styles.input}
            value={email}
            label="E-mail"
            placeholder="Enter your email addess"
          />
          <Input
            style={styles.input}
            value={password}
            label="Password"
            placeholder="Enter your password"
          />
          <Text
            style={{
              textAlign: "right",
              marginRight: 15,
              marginTop: 10,
              marginBottom: 40,
              color: "#0B2F8D",
              fontWeight: "bold",
            }}
            onPress={navigateForgotPassword}
          >
            Forgot Password?
          </Text>

          <Button style={styles.button} size="medium">
            Let's Go!
          </Button>
          <Button size="medium" appearance="outline" style={styles.buttonAlt}>
            <Text style={{ fontWeight: "700", color: "#454545" }}>
              Log in with Google
            </Text>
          </Button>

          <Text style={styles.noaccount}>
            Don't have an account?
            <Text style={styles.signUp} onPress={navigateSignup}>
              {" "}
              Sign Up
            </Text>
          </Text>
        </Layout>
      );
    } else if (signup === 2) {
      return <SignupScreen />;
    } else {
      return <PasswordResetScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Layout style={styles.container}>{show()}</Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountsContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F7F0FF",
  },
  accountItem: {
    backgroundColor: "white",
    padding: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6E5E5",
  },
  accountName: {
    marginLeft: 10,
    fontWeight: "600",
  },
  input: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "white",
    borderColor: "#969595",
  },
  checkBox: {
    marginLeft: 15,
    marginBottom: 20,
  },

  button: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "#3F295A",
    borderColor: "transparent",
  },
  buttonAlt: {
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
    borderColor: "#E4E4E4",
  },
  noaccount: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  signUp: {
    fontWeight: "bold",
    color: "#0B2F8D",
    marginTop: 10,
  },
  backgroundImageContainer: {
    backgroundColor: "#F7F0FF",
    height: 250,
    margin: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: 220,
    height: 220,
    marginBottom: -30,
  },
});

export default LoginScreen;
