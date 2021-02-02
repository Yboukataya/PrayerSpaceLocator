import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { MaterialIcons, Ionicons , AntDesign} from "@expo/vector-icons";

/**
 * This component specifies appearance of the screen that shows both list of
 * nearby spaces as well as the map.
 * @param {*} param0
 */

// let [spots, setSpots] = useState("");



function SentToApprovalScreen(props) {
  
  
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.headingContainer}>
        <AppText customStyle={styles.title}>Your space has been sent for approval!</AppText>
      </View>

      <View style={styles.container}>
        {/* Render map or list of spaces, based on mapVisible */}
        <AntDesign name="checkcircleo" size={300} color="green" />
      </View>
      <AppButton
        title="Back to Home"
        onPress={() => props.navigation.navigate("Welcome")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  spaceListContainer: {
    flex: 1,
    width: "90%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SentToApprovalScreen;
