import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  let [isSignedIn, setSignedIn] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <>
            <Stack.Screen name="ViewSpaces" component={ViewSpacesScreen} />
            <Stack.Screen name="AddEvent" component={AddEventScreen} />
            <Stack.Screen name="ViewEvents" component={ViewEventsScreen} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="AddSpace" component={AddSpaceScreen} />
            <Stack.Screen name="EventDetail" component={EventDetailScreen} />
            <Stack.Screen name="SentToApproval" component={SentToApprovalScreen} />
            <Stack.Screen name="SpaceDetail" component={SpaceDetailScreen} />
            <Stack.Screen name="ViewEventsByBuilding" component={ViewEventsByBuildingScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
