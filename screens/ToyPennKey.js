import React, { useState } from "react";
import { Alert, Linking, StyleSheet, View, Text } from "react-native";

import * as Google from "expo-google-app-auth";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

async function signInWithGoogleAsync() {
  // setUserName, setUserEmail, setAccessToken
  try {
    const result = await Google.logInAsync({
      androidClientId: "toBeImplemented",
      iosClientId: "checkNabeelEmailForClientId",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      console.log("accessToken: " + result.accessToken);
      console.log("name: " + result.user.name);
      console.log("fName: " + result.user.givenName);
      console.log("email: " + result.user.email + "\n");

      // call the state hooks passed in the argument
      let _ = setAccessToken(result.accessToken);
      let _2 = setUserName(result.user.name);
      let _3 = setUserEmail(result.user.email);

      // make sure that the state hook
      console.log("OK");
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

async function signOutWithGoogleAsync() {
  await Google.logOutAsync();
}

function ToyPennKey(props) {
  // TODO: do we really need useState here? or can we just use a plain string?
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");

  return (
    <View style={styles.container}>
      <AppText>Here's what you can do:</AppText>
      <AppButton
        title="login with Penn email"
        onPress={signInWithGoogleAsync(
          setUserName,
          setUserEmail,
          setAccessToken
        )}
      ></AppButton>
      <AppButton title="log out" onPress={signOutWithGoogleAsync}></AppButton>
      <AppText>Email: {userEmail}</AppText>
      <AppText>Name: {userName}</AppText>
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
