import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/Welcome";
import AddSpaceScreen from "../screens/AddSpaceScreen";
import SpaceDetailScreen from "../screens/SpaceDetailScreen";
import LandingScreen from "../screens/LandingPage";
import ToyPennKey from "../screens/ToyPennKey";
import Settings from "../screens/Settings";
import ViewSpacesScreen from "../screens/ViewSpacesScreen";
import SentToApprovalScreen from "../screens/SentToApproval";

import AddEventScreen from "../screens/AddEventScreen.js";
import EventDetailScreen from "../screens/EventDetailScreen.js";
import ViewEventsByBuildingScreen from "../screens/ViewEventsByBuildingScreen";
import ViewEventsScreen from "../screens/ViewEventsScreen";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="AddEvent" component={AddEventScreen} />
    <Stack.Screen name="AddSpace" component={AddSpaceScreen} />
    <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="SentToApproval" component={SentToApprovalScreen} />
    <Stack.Screen name="SpaceDetail" component={SpaceDetailScreen} />
    <Stack.Screen name="ViewEvents" component={ViewEventsScreen} />
    <Stack.Screen name="ViewEventsByBuilding" component={ViewEventsByBuildingScreen} />
    <Stack.Screen name="ViewSpaces" component={ViewSpacesScreen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
