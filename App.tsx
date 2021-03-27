import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import AddEventScreen from "./screens/AddEventScreen.js";
import AddSpaceScreen from "./screens/AddSpaceScreen";
import EventDetailScreen from "./screens/EventDetailScreen.js";
import LandingScreen from "./screens/LandingPage";
import SentToApprovalScreen from "./screens/SentToApproval";
import Settings from "./screens/Settings";
import SpaceDetailScreen from "./screens/SpaceDetailScreen";
import ViewEventsByBuildingScreen from "./screens/ViewEventsByBuildingScreen";
import ViewEventsScreen from "./screens/ViewEventsScreen";
import ViewSpacesScreen from "./screens/ViewSpacesScreen";
import WelcomeScreen from "./screens/Welcome";
import WalkthroughScreen from "./screens/WalkthroughScreen";

// import Screen from "./components/Screen.js"

import Ionicons from "react-native-vector-icons/Ionicons";
import { getMyObject, clearAll } from "./config/async-utils";





const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function signedInStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AddEvent" component={AddEventScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ViewSpaces" component={ViewSpacesScreen} />
      <Stack.Screen name="ViewEvents" component={ViewEventsScreen} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AddSpace" component={AddSpaceScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="SentToApproval" component={SentToApprovalScreen} />
      <Stack.Screen name="SpaceDetail" component={SpaceDetailScreen} />
      <Stack.Screen
        name="ViewEventsByBuilding"
        component={ViewEventsByBuildingScreen}
      />
      <Stack.Screen name="Landing" component={LandingScreen} />
    </Stack.Navigator>
  );
}

function eventStack() {
  return (
    <Stack.Navigator
      initialRouteName="ViewEvents"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ViewEvents" component={ViewEventsScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen
        name="ViewEventsByBuilding"
        component={ViewEventsByBuildingScreen}
      />
      <Stack.Screen name="AddEvent" component={AddEventScreen} />
    </Stack.Navigator>
  );
}

function spaceStack() {
  return (
    <Stack.Navigator
      initialRouteName="ViewSpaces"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="ViewSpaces"
        component={ViewSpacesScreen}
        initialParams={{ viewUnapproved: false }}
      />
      <Stack.Screen name="AddSpace" component={AddSpaceScreen} />
      <Stack.Screen name="SentToApproval" component={SentToApprovalScreen} />
      <Stack.Screen name="SpaceDetail" component={SpaceDetailScreen} />
    </Stack.Navigator>
  );
}

doneWithSlides = () => {
  this.setState({ show_Main_App: true });
};
on_Skip_slides = () => {
  this.setState({ show_Main_App: true });
};

// function _renderItem = ({ item }) => {
//   return (
//     <View style={styles.slide}>
//       <Text style={styles.title}>{item.title}</Text>
//       <Image source={item.image} />
//       <Text style={styles.text}>{item.text}</Text>
//     </View>
//   );
// }

export default function App() {
  let [isSignedIn, setSignedIn] = useState(false);
  let [isFirstTime, setFirstTime] = useState(true);
  let [doneWithIntro, setDoneWithIntro] = useState(true);

  let doneWithSlides = () => {
    setDoneWithIntro(true);
  };
  let skipSlides = () => {
    setDoneWithIntro(true);
  };

  useEffect(() => {
    clearAll();
    async function checkSignin() {
      await getMyObject("user").then(function (value) {
        setSignedIn(value !== null);
      });
    }
    async function checkFirstTime() {}
    checkSignin();
  }, []);

  function signedOutStack() {
    return (
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Landing"
          children={() => <LandingScreen setSignedIn={setSignedIn} />}
        />
        <Stack.Screen name="ViewSpaces" component={ViewSpacesScreen} />
        <Stack.Screen name="SpaceDetail" component={SpaceDetailScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {/* {isSignedIn ? ( */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Events") {
              iconName = "calendar";
            } else if (route.name === "Spaces") {
              iconName = "compass";
            } else if (route.name === "Settings") {
              iconName = "cog-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "#aba6a4",
        }}
      >
        {isSignedIn ? (
          <>
            <Tab.Screen name="Spaces" component={spaceStack} />
            <Tab.Screen name="Home" component={WelcomeScreen} />
            <Tab.Screen name="Events" component={eventStack} />
            <Tab.Screen name="Settings" component={Settings} />
          </>
        ) : (
          // <Tab.Screen name="Home" component={signedOutStack} />
          <Tab.Screen name='hi' component={WalkthroughScreen}/>
        )}
      </Tab.Navigator>
    </NavigationContainer>
    // ) : (
    //   <AppIntroSlider
    //     slides={slides}
    //     onDone={doneWithIntro}
    //     showSkipButton={true}
    //     onSkip={skipSlides}
    //   />
    // )}
  );
}
