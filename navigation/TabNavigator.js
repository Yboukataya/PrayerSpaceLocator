import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

// screen imports
import ListViewScreen from "../screens/ListViewScreen";
import MapViewScreen from "../screens/MapViewScreen";
import ViewSpacesScreen from "../screens/ViewSpacesScreen";
import WelcomeScreen from "../screens/Welcome";

// import ScreenNavigator, for nested navigation
import HomeNavigator from "./HomeNavigator";

/**
 *
 * This component sets up a persistent tab bar at the bottom of the screen.
 * Right now, it's only listing 2 entries: Home, Spaces (list of spaces),
 * and Settings (a screen yet to be implemented).
 */

const Tab = createBottomTabNavigator();

function TabNavigator(props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // define which icons to use for each tab
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Spaces") {
            iconName = "list-ul";
          } else if (route.name === "Settings") {
            iconName = "gear";
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      {/* TODO: should we keep this tab? Kind of complicates navigation */}
      {/* <Tab.Screen name="Spaces" component={ListViewScreen} /> */}
      <Tab.Screen name="Settings" component={ListViewScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
