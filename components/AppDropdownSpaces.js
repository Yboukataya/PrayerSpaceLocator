import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "../components/AppText";

function AppDropdownSpaces({buildings}) {
<View style={{  alignItems: "center",
                        flex: 1,
                        flexDirection: "row",
                        width: "100%",
                        zIndex: 200,}}>
          
          <View style={{flex: 3,}}>
            <AppText>Building</AppText>
          </View>

          <View style={{flex: 7}}>
          <DropDownPicker
            items={buildings.sort()}
            placeholder="Select a building"
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            // TODO: fix this to update some kind of form state
            onChangeItem={item => selectedBuilding = item}
        />
          </View>
        </View>
}
export default AppDropdownSpaces;