import React, { useEffect, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import AppText from './AppText';
import { baseUrl } from '../config/backend-config';
/**
 * This component defines how each prayer space in the list on the View Spaces
 * screen is rendered.
 * @param {*} param0
 */

function AppBuildingListing({ building, events, myEventsState }) {
  // console.log("APPSPACELISTINGPROPS\n", papaProps);
  const navigation = useNavigation();
  let [numEvents, setNumEvents] = useState(0);
  let [zaEvents, setZaEvents] = useState([]);

  useEffect(() => {
    // let isMounted = true;
    // get count of events in each building
    let today = new Date().toISOString().substr(0, 10);
    async function getBldgEvents() {
      await fetch(baseUrl + 'eventsByBuilding?Buildingid=' + building.Buildingid + '&Date=' + today)
        .then((response) => response.json())
        .then((json) => {
          // let x =
          setNumEvents(json.data.length);
          setZaEvents(json.data);
        });
    }
    getBldgEvents();
    console.log('BLDG: ', building);
    // return () => {
    //   isMounted = false;
    // };
  }, []);

  return (
    <View style={styles.listingContainer}>
      {/* for the text information */}
      <View>
        <AppText customStyle={{ flex: 1, width: '100%', borderColor: 'blue' }}>
          {building.name}
        </AppText>
        <AppText customStyle={styles.capacityStyle}>{numEvents} events today</AppText>
      </View>

      {/* for the icon */}
      <View>
        {/* TODO Fix icon to go to a page with all events in that building */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Events', {
              screen: 'ViewEventsByBuilding',
              params: {
                building: building.name,
                address: building.address,
                events: zaEvents,
                myEventsState: myEventsState,
              },
            })
          }
        >
          <AntDesign name='rightcircle' size={40} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //   alternateRow: {},
  capacityStyle: {
    color: 'goldenrod',
  },
  distStyle: {
    color: 'green',
  },
  listingContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AppBuildingListing;
