import {
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Icon,
  Input,
  Layout,
  Text,
  Button,
  Divider,
  CheckBox,
} from "@ui-kitten/components";
import { GoogleIcon } from "../../assets/icons";
import SignupScreen from "./SignupScreen";
import React, { Component, useState } from "react";

const email = null;
const password = null;
const checked = false;

// export default class LoginScreen extends Component {
//   render() {
//     return (
//       <Layout style={styles.container}>
//         <Text>LoginScreen Component!</Text>
//         {!signUpClicked ? (
//           <Layout>
//             <Input
//               style={styles.input}
//               value={email}
//               label="E-mail"
//               placeholder="Enter your email addess"
//             />
//             <Input
//               style={styles.input}
//               value={password}
//               label="Password"
//               placeholder="Enter your password"
//             />

//             <CheckBox
//               style={styles.checkBox}
//               checked={checked}
//               onChange={(nextChecked) => setChecked(nextChecked)}
//             >
//               Terms of Conditions and Privacy Policy
//             </CheckBox>

//             <Button style={styles.button} size="small">
//               Sign In
//             </Button>

//             <Divider style={styles.divider} />
//             <Text style={styles.noaccount}>
//               Don't have an either?
//               <Text style={styles.signUp} onPress={onClickSignup}>
//                 {" "}
//                 Sign up here
//               </Text>
//             </Text>
//           </Layout>
//         ) : (
//           <SignupScreen />
//         )}
//       </Layout>
//     );
//   }
// }

export const LoginScreen = () => {
  // Temporarily toggle to switch between the Login view and the Google/Signup view
  const [signup, setSignup] = useState(false);

  const onToggleSignup = () => {
    setSignup(!signup);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Layout style={styles.container}>
          {!signup ? (
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
              >
                Forgot Password?
              </Text>

              <Button style={styles.button} size="medium">
                Let's Go!
              </Button>
              <Button
                size="medium"
                appearance="outline"
                style={styles.buttonAlt}
              >
                <Text style={{ fontWeight: "700", color: "#454545" }}>
                  Log in with Google
                </Text>
              </Button>

              <Text style={styles.noaccount}>
                Don't have an account
                <Text style={styles.signUp} onPress={onToggleSignup}>
                  {" "}
                  Sign Up
                </Text>
              </Text>
            </Layout>
          ) : (
            <SignupScreen />
          )}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "flex-start",
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
  },
  signUp: {
    fontWeight: "bold",
    color: "#0B2F8D",
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
