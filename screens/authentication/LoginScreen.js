import { TouchableWithoutFeedback, StyleSheet, View } from "react-native";
import {
  Icon,
  Input,
  Layout,
  Text,
  Button,
  Divider,
  CheckBox,
} from "@ui-kitten/components";
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
  const [signup, setSignup] = useState(true);

  const onToggleSignup = () => {
    setSignup(!signup);
  };
  return (
    <Layout style={styles.container}>
      {!signup ? (
        <Layout>
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

          <CheckBox
            style={styles.checkBox}
            checked={checked}
            onChange={(nextChecked) => setChecked(nextChecked)}
          >
            Terms of Conditions and Privacy Policy
          </CheckBox>

          <Button style={styles.button} size="small">
            Sign In
          </Button>

          <Divider style={styles.divider} />
          <Text style={styles.noaccount}>
            Don't have an either?
            <Text style={styles.signUp} onPress={onToggleSignup}>
              {" "}
              Sign up here
            </Text>
          </Text>
        </Layout>
      ) : (
        <SignupScreen />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "flex-start",
  },

  input: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  checkBox: {
    marginLeft: 10,
    marginBottom: 20,
  },

  button: {
    marginBottom: 10,
    marginLeft: 10,
    width: 150,
  },
  divider: {
    margin: 10,
  },
  noaccount: {
    textAlign: "center",
  },
  signUp: {
    fontWeight: "bold",
  },
});

export default LoginScreen;
