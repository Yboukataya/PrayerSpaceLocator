import React from "react";
import {
  Alert,
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

// import { InAppBrowser } from "react-native-inappbrowser-reborn";
// import * as firebase from "firebase";
import * as WebBrowser from "expo-web-browser";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const loginUrl =
  "https://weblogin.pennkey.upenn.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s1";

// async function openLink() {
//   try {
//     const url = "https://www.google.com";
//     if (await InAppBrowser.isAvailable()) {
//       const result = await InAppBrowser.open(url, {
//         // iOS Properties
//         dismissButtonStyle: "cancel",
//         preferredBarTintColor: "#453AA4",
//         preferredControlTintColor: "white",
//         readerMode: false,
//         animated: true,
//         modalPresentationStyle: "fullScreen",
//         modalTransitionStyle: "coverVertical",
//         modalEnabled: true,
//         enableBarCollapsing: false,
//         // Android Properties
//         showTitle: true,
//         toolbarColor: "#6200EE",
//         secondaryToolbarColor: "black",
//         enableUrlBarHiding: true,
//         enableDefaultShare: true,
//         forceCloseOnRedirection: false,
//         // Specify full animation resource identifier(package:anim/name)
//         // or only resource name(in case of animation bundled with app).
//         animations: {
//           startEnter: "slide_in_right",
//           startExit: "slide_out_left",
//           endEnter: "slide_in_left",
//           endExit: "slide_out_right",
//         },
//         headers: {
//           "my-custom-header": "my custom header value",
//         },
//       });
//       Alert.alert(JSON.stringify(result));
//     } else Linking.openURL(url);
//   } catch (error) {
//     Alert.alert(error.message);
//   }
// }

async function handlePressButtonAsync() {
  let result = await WebBrowser.openAuthSessionAsync(loginUrl);
  return { result };
}

function startLogin() {
  console.log("hey");
}

function ToyPennKey(props) {
  return (
    <View style={styles.container}>
      <AppButton
        title="login with PennKey"
        // onPress={handlePressButtonAsync}
      ></AppButton>
      <AppText></AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ToyPennKey;
