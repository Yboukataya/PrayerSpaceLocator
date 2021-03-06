import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AppBuildingListing from './AppBuildingListing';
import ListItemSeparator from './ListItemSeparator';
import Screen from './Screen';

function AppBuildingList({ buildings, events, myEventsState }) {
  // console.log("hi");
  // console.log(buildings);
  const [refreshing, setRefreshing] = useState(false);
  let [eventListEvents, setEventListEvents] = useState(events);

  return (
    <View style={styles.container}>
      <FlatList
        data={buildings}
        keyExtractor={(listing) => listing.name}
        renderItem={({ item }) => (
          <AppBuildingListing
            building={item}
            events={events.filter((event) => event.building === item.name)}
            myEventsState={myEventsState}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => {
          // refreshEvents();
          console.log('ayy');
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    width: '100%',
  },
});

export default AppBuildingList;
