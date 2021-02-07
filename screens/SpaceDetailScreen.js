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
    console.log("CHECK SPACE OBJECT: \n", route.params.space);
    console.log("CHECK VIEWUNAPPROVED: \n", route.params.viewUnapproved);
    const navigation = useNavigation();

    return (
      <Screen style={{ flex: 1, padding: 20 }}>
         <View style={styles.container}>
            <AppTitle>{route.params.space.spaceName}</AppTitle> 
         </View>
 
        <View style={styles.spaceDetails}>
          <AppSpaceDetail
            space={route.params.space}
            detailTitle="Building"
            detailKey="bldgName"
          />
          <AppSpaceDetail
            space={route.params.space}
            detailTitle="Address"
            detailKey="bldgAddress"
          />
          <AppSpaceDetail 
            space={route.params.space}
            detailTitle="Instructions"
            detailKey="instructions"
          />
          <AppSpaceDetail
            space={route.params.space}
            detailTitle="Capacity"
            detailKey="capacity"
          />
          <AppSpaceDetail
            space={route.params.space}
            detailTitle="Daily Hours"
            detailKey="daily_hours"
          /> 
        </View>
         <View style={styles.btnContainer}>
         
          {route.params.viewUnapproved ? (<AppButton title="Approve" customStyle={styles.btnStyle}/>) : (null)}
          {route.params.viewUnapproved ? (<AppButton title="Reject"  customStyle={styles.btnStyle}/>) : (null)}
          {/* {route.params.viewUnapproved ? (<AppButton title="Update"/>) : (<AppButton title="Bye"/>)}
          {route.params.viewUnapproved ? (<AppButton title="Go Back"/>) : (<AppButton title="Bye"/>)} */}
         </View>
         <AppButton title="Update"/>
         <AppButton title="Go Back"/>
      </Screen>
    );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    width: "50%",
    paddingRight: 10,
    paddingLeft: 10,
  },
  btnStyle: {
    marginRight: 5,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  editBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  spaceDetails: {
    flex: 1,
  }
});

export default SpaceDetailScreen;
