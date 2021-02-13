import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/Welcome";
import AddSpaceScreen from "../screens/AddSpaceScreen";
import SpaceDetailScreen from "../screens/SpaceDetailScreen";
import LandingScreen from "../screens/LandingPage";
import ToyPennKey from "../screens/ToyPennKey";
import ViewSpacesScreen from "../screens/ViewSpacesScreen";
import SentToApprovalScreen from "../screens/SentToApproval";

import EventDetailScreen from "../screens/EventDetailScreen.js";
import AddEventScreen from "../screens/AddEventScreen.js";

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AddEvent" component={AddEventScreen} />
    <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="AddSpace" component={AddSpaceScreen} />
    <Stack.Screen name="SpaceDetail" component={SpaceDetailScreen} />
    <Stack.Screen name="ViewSpaces" component={ViewSpacesScreen} />
    <Stack.Screen name="Login" component={ToyPennKey} />
    <Stack.Screen name="SentToApproval" component={SentToApprovalScreen} />
  </Stack.Navigator>
);

export default HomeNavigator;
