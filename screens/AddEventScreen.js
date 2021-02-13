import React, {useState} from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Formik, Field, Form } from "formik";

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AppFormEntry from "../components/forms/AppFormEntry";
import { PennBuildings } from "../constants/Buildings.js";


export default function AddEventScreen({navigation, route}) {
  
  let buildings = []
  let [selectedBuilding, setBuilding] = useState("");
  const [eventDate, setEventDate] = useState(Date.now());
  const [eventTime, setEventTime] = useState("");

  for (const [name] of Object.entries(PennBuildings)) {
    let bldgName = name;
    let bldgDropdown = {
      label: bldgName,
      value: bldgName,
    }
    buildings.push(bldgDropdown);
  }
  buildings.sort((a, b) => (a.label > b.label) ? 1 : -1);

  // console.log("RouteParams: ", route.params);
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppText customStyle={styles.title}>Add New Event</AppText>
      </View>

      <AppForm
        initialValues={{
          spaceName: "",
          bldgName: "",
          bldgAddress: "",
          instructions: "",
          capacity: "",
          dailyHours: "",
          selectedBuilding: ""
        }}
        
        onSubmit={(values) => {
          console.log("spaceData: " + values.spaceName)
          console.log("spaceBldg: " + selectedBuilding)
          props.navigation.navigate("SentToApproval");
        }}
        >
          {/* EVENT NAME */}
          <AppFormEntry
            label="Event Name"
            name="eventName"
            placeholder="Event Name"
          />

          {/* BUILDING DROPDOWN */}
          <View style={styles.bldgDropdownStyle}>
            <View style={{flex: 3,}}>
              <AppText>Building</AppText>
            </View>

            <View style={{flex: 7}}>
              {/* TODO: Fix this dropdown once the database is addressed */}
              <DropDownPicker
                items={buildings}
                placeholder="Select a building"
                // defaultValue={route.params.existingSpace ? route.params.existingSpace.bldgName : ""}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#fafafa'}}
                itemStyle={{justifyContent: 'flex-start'}}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => {setBuilding(item.label); console.log(selectedBuilding)}}
              />
            </View>
          </View>

          {/* SPACE DROPDOWN */}
          <View style={styles.bldgDropdownStyle}>
          
          <View style={{flex: 3}}>
            <AppText>Space Name</AppText>
          </View>

          <View style={{flex: 7}}>
          {/* TODO: Disable this dropdown until building is selected */}
          <DropDownPicker
            items={buildings}
            placeholder="Select a Space"
            // defaultValue={route.params.existingSpace ? route.params.existingSpace.bldgName : ""}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{justifyContent: 'flex-start'}}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => {setBuilding(item.label); console.log(selectedBuilding)}}
        />
          </View>
        </View>
        

        {/* DATE DROPDOWN */}
        <View style={styles.dateTimePickerStyle}>
          
          <View style={{flex: 3,}}>
            <AppText>Date</AppText>
          </View>
          <View style={{flex: 7, height: "50",}}>
            <DateTimePicker value={Date.now()} mode="date" display="compact" style={{height: 100,}} />
          </View>
        </View>

        {/* TIME DROPDOWN */}
        <View style={styles.dateTimePickerStyle}>
          
          <View style={{flex: 3,}}>
            <AppText>Time</AppText>
          </View>

          <View style={{flex: 7, height: "50px",}}>
          <DateTimePicker value={Date.now()} 
                          mode="time"
                          display="compact"
                          minuteInterval={5}
                          style={{height: 100,}}/>
          </View>
         
        </View>

          {/* TODO: make this one bigger */}
        <SubmitButton title="Submit!" selectedBuilding={selectedBuilding}/>
      </AppForm>
    </Screen>);
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: "600",
  },
  dateTimePickerStyle: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  bldgDropdownStyle: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    width: "100%",
    zIndex: 50,
  }
});
