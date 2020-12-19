import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as firebase from "firebase";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import ScreenNavigator from "./navigation/ScreenNavigator";
// import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer /*, useNavigation */,
} from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import AddSpaceScreen from "./screens/AddSpaceScreen.js";
// import AppSpaceList from "./components/AppSpaceList.js";
// import SpaceDetailScreen from "./screens/SpaceDetailScreen.js";
import Screen from "./components/Screen.js";

// import ListItemSeparator from "./components/ListItemSeparator.js";

// const Tweets = ({ navigation }) => (
//   <Screen>
//     <Text>Tweets</Text>
//     <Button
//       title="View Tweet"
//       onPress={() => navigation.navigate("TweetDetails")}
//     />
//   </Screen>
// );

// const Stack = createStackNavigator();
// const StackNavigator = () => {
//   <Stack.Navigator initialRouteName="Tweets">
//     <Stack.Screen name="Tweets" component={Tweets} />
//   </Stack.Navigator>;
// };

// var firebaseConfig = {
//   apiKey: "AIzaSyCZTypZ6uAHMw3ow13WpD4MhK4wD8Fa_Hs",
//   authDomain: "blog-app-7e2a8.firebaseapp.com",
//   databaseURL: "https://blog-app-7e2a8.firebaseio.com",
//   projectId: "blog-app-7e2a8",
//   storageBucket: "blog-app-7e2a8.appspot.com",
//   messagingSenderId: "996802332043",
//   appId: "1:996802332043:web:1713c7aec7d3ec23071b8e",
// };

// var firebaseConfig = {
//   apiKey: "AIzaSyAz7kUCB102_eT2R0F7diW47wczPlqCtck",
//   authDomain: "musalla-ea1ab.firebaseapp.com",
//   databaseURL: "https://musalla-ea1ab.firebaseio.com",
//   projectId: "musalla-ea1ab",
//   storageBucket: "musalla-ea1ab.appspot.com",
//   messagingSenderId: "239388429818",
//   appId: "1:239388429818:web:584e11323fa99fbf7b6843",
//   measurementId: "G-NP7RNBY59B",
// };
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

import MapViewScreen from "./screens/MapViewScreen";
import ViewSpacesScreen from "./screens/ViewSpacesScreen";
import ListViewScreen from "./screens/ListViewScreen";

export default function App() {
  const sampleSpace = {
    spaceName: "SPARC",
    bldgName: "Houston Hall",
    bldgAddress: "123 Main St",
    instructions: "Go west, young man!",
    capacity: 8,
    dailyHours: "M-F 9-5",
  };
  return (
    // <AddSpaceScreen />
    // <ListItemSeparator />
    // <Screen style={{ flex: 1, padding: 20 }}>
    //   <AppSpaceList />
    // </Screen>
    // <NavigationContainer>
    //   <ScreenNavigator />
    // </NavigationContainer>
    <ViewSpacesScreen />
    // <MapViewScreen />
    // <ListViewScreen />
  );
  // return <SpaceDetailScreen space={sampleSpace} />;
}
