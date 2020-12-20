import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import * as firebase from "firebase";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import HomeNavigator from "./navigation/HomeNavigator.js";
import TabNavigator from "./navigation/TabNavigator.js";

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
    <NavigationContainer>
      {/* <ScreenNavigator /> */}
      <TabNavigator />
    </NavigationContainer>
  );
  // return <SpaceDetailScreen space={sampleSpace} />;
}
