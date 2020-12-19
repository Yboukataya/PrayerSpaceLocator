import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import ListViewScreen from "../screens/ListViewScreen";
import WelcomeScreen from "../screens/Welcome";

/**
 *
 * This component sets up a persistent tab bar at the bottom of the screen.
 * Right now, it's only listing 3 entries: Home, Spaces (list of spaces),
 * and Settings (a screen yet to be implemented).
 */

function TabNavigator(props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

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
      <Tab.Screen name="Home" component={WelcomeScreen} />
      <Tab.Screen name="Spaces" component={ListViewScreen} />
      <Tab.Screen name="Settings" component={ListViewScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
