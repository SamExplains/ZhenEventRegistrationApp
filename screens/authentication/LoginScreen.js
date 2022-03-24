import {
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { Input, Layout, Text, Button, Avatar } from "@ui-kitten/components";
import SignupScreen from "./SignupScreen";
import PasswordResetScreen from "./PasswordResetScreen";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser, setAuthenticated } from "../../store/actions/user";
import baseUrl from "../../settings.json";

export const LoginScreen = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.eventsAndUsers.currentUser);
  const authenticated = useSelector(
    (state) => state.eventsAndUsers.authenticated
  );
  // Temporarily toggle to switch between the Login view and the Google/Signup view
  const [signup, setSignup] = useState(1);
  const [forgotPassword] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  const continueWithUser = async (user) => {
    await axios
      .post(`${baseUrl.api}/login`, {
        id: user.id,
        email: user.email,
        token: user.token,
      })
      .then(({ data, status }) => {
        console.log("Response ", data, "   ", status);
        dispatch(setUser(data));
        dispatch(setAuthenticated(true));
        // Set logged in state and user to details
      })
      .catch((e) => {
        console.log("Error ", e);
      });
  };

  const renderAccountsList = () => {
    if (accounts.length) {
      return accounts.map((account) => {
        return (
          <TouchableOpacity
            style={styles.accountItem}
            onPress={() => continueWithUser(account)}
            key={account.id}
          >
            <Avatar
              source={{
                // uri: "https://cdn.pixabay.com/photo/2016/07/31/13/43/dog-1558962_960_720.jpg",\
                // uri: account.profile_image_src,
                uri: "http:10.0.2.2:8000/img/tc_logo.png",
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
        <Text>{currentUser.name}</Text>
        <Text>Authenticated: {authenticated ? "true" : "false"}</Text>
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
