import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useNavigation } from '@react-navigation/native'

import AppButton from "../components/AppButton";
import AppSpaceDetail from "../components/AppSpaceDetail";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

/**
 * This component specifies appearance of the screen that shows attributes
 * about a prayer space. For each attribute, it uses an AppSpaceDetail component
 * to render that attribute on its own line.
 * @param {*} param0
 */

// export default class SpaceDetailScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { props: props };
//   }

  // handleOnPress = () => {
  //   this.state.props.navigation.navigate("ViewSpaces");
  //   // if (this.state.props.route.params.source == "add") {
  //   //   this.state.props.navigation.popToTop();
  //   // } else {
  //   //   this.state.props.navigation.pop();
  //   // }
  // };
  function SpaceDetailScreen({route}) {
    // console.log("SpaceDetailProps:\n", props);
    console.log("CHECK SPACE OBJECT: \n", route.params.space);
    console.log("CHECK VIEWUNAPPROVED: \n", route.params.viewUnapproved);

    const navigation = useNavigation();
    console.log("SetNavigation OK");

    return (
      <Screen style={{ flex: 1, padding: 20 }}>
         <View style={styles.container}>
            <AppText>Hi</AppText> 
         </View>
{/*
    //     <View>
    //       <AppSpaceDetail
    //         space={space}
    //         detailTitle="Building"
    //         detailKey="bldgName"
    //       />
    //       <AppSpaceDetail
    //         space={space}
    //         detailTitle="Address"
    //         detailKey="bldgAddress"
    //       />
    //       <AppSpaceDetail
    //         space={space}
    //         detailTitle="Instructions"
    //         detailKey="instructions"
    //       />
    //       <AppSpaceDetail
    //         space={space}
    //         detailTitle="Capacity"
    //         detailKey="capacity"
    //       />
    //       <AppSpaceDetail
    //         space={space}
    //         detailTitle="Daily Hours"
    //         detailKey="dailyHours"
    //       /> 
    //     </View>
    //     <View style={styles.container}>
    //       <AppButton
    //         title="Go Back"
    //         onPress={() => navigation.navigate("ViewSpaces")}
    //         // if (props.route.params.source == "add") props.navigation.popToTop() else props.navigation.pop())
    //         //   console.log(
    //         //     props.navigation.goBack.equals(
    //         //       props.navigation.navigate("MapView")as
    //         //     )
    //         //   )
    //         // }
    //         // onPress={() => props.navigation.popToTop()}
    //         customStyle={styles.editBtn}
    //       ></AppButton>
    //      {route.params.viewUnapproved ? <AppText>HELLO</AppText> : <AppText> BYE </AppText>} */} 

         {/* </View> */}
      </Screen>
    );
  }

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  editBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SpaceDetailScreen;
