import React, { useEffect, useState } from "react";

import { NavigationContainer, PrivateValueStore } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import WelcomeScreen from "./screens/Welcome";
import AddSpaceScreen from "./screens/AddSpaceScreen";
import SpaceDetailScreen from "./screens/SpaceDetailScreen";
import LandingScreen from "./screens/LandingPage";
import Settings from "./screens/Settings";
import ViewSpacesScreen from "./screens/ViewSpacesScreen";
import SentToApprovalScreen from "./screens/SentToApproval";

import AddEventScreen from "./screens/AddEventScreen.js";
import EventDetailScreen from "./screens/EventDetailScreen.js";
import ViewEventsByBuildingScreen from "./screens/ViewEventsByBuildingScreen";
import ViewEventsScreen from "./screens/ViewEventsScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};

const getData = async (key) => {
  try {
    return await AsyncStorage.getItem(String(key));
  } catch (e) {
    // error reading value
  }
};

export default function App() {
  // let [isSignedIn, setSignedIn] = useState(false);

  // useEffect(() => {
  //   // clearAll();
  //   getData("isSignedIn").then(function (value) {
  //     setSignedIn(value == "true");
  //   });
  // }, []);

  // just for testing
  // setSignedIn(false);
  const isSignedIn = false;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isSignedIn ? "Welcome" : "Landing"}
        screenOptions={{ headerShown: false }}
      >
        {/* {isSignedIn ? (
        <> */}
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="AddEvent" component={AddEventScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ViewSpaces" component={ViewSpacesScreen} />
        <Stack.Screen name="ViewEvents" component={ViewEventsScreen} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AddSpace" component={AddSpaceScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="SentToApproval" component={SentToApprovalScreen} />
        <Stack.Screen name="SpaceDetail" component={SpaceDetailScreen} />
        <Stack.Screen name="ViewEventsByBuilding" component={ViewEventsByBuildingScreen} />
        {/* </> */}
        {/* ) : ( */}
        {/* <> */}
        {/* For not signed-in users
            <Stack.Screen name="AddEvent" component={AddEventScreen} />

            
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="ViewSpaces" component={ViewSpacesScreen} />
            <Stack.Screen name="SpaceDetail" component={SpaceDetailScreen} />
          </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
