import React from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

import { useNavigation } from '@react-navigation/native'

import AppButton from "../components/AppButton";
import AppSpaceDetail from "../components/AppSpaceDetail";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

export default function EventDetailScreen({route}) {
    console.log("CHECK EVENT OBJECT: \n", route.params.event);
    
    const navigation = useNavigation();

    return (
      <Screen style={{ flex: 1, padding: 20 }}>
         <View style={styles.container}>
            <AppTitle>{route.params.eventName}</AppTitle> 
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
         
          {route.params.viewUnapproved ? (<AppButton title="Approve" customStyle={styles.btnStyle} onPress={acceptOnPress}/>) : (null)}
          {route.params.viewUnapproved ? (<AppButton title="Reject"  customStyle={styles.btnStyle} onPress={rejectOnPress}/>) : (null)}
          {/* {route.params.viewUnapproved ? (<AppButton title="Update"/>) : (<AppButton title="Bye"/>)}
          {route.params.viewUnapproved ? (<AppButton title="Go Back"/>) : (<AppButton title="Bye"/>)} */}
         </View>
         <AppButton title="Update"  onPress={() => navigation.navigate("AddSpace", {existingSpace: route.params.space})}/>
         <AppButton title="Go Back" onPress={() => navigation.navigate("ViewSpaces")}/>
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

// export default EventDetailScreen;
