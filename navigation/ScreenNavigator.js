import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/Welcome";
import AddSpaceScreen from "../screens/AddSpaceScreen";
import SpaceDetailScreen from "../screens/SpaceDetailScreen";
import ListViewScreen from "../screens/ListViewScreen";
import MapViewScreen from "../screens/MapViewScreen";

const Stack = createStackNavigator();

const ScreenNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="AddSpace" component={AddSpaceScreen} />
    <Stack.Screen name="SpaceDetail" component={SpaceDetailScreen} />
    <Stack.Screen name="ListView" component={ListViewScreen} />
    <Stack.Screen name="MapView" component={MapViewScreen} />
  </Stack.Navigator>
);

export default ScreenNavigator;