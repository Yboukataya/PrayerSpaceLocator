import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

// import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../config/backend-config.js';

import AppEventListing from './AppEventListing';
import ListItemSeparator from './ListItemSeparator';

function AppEventList({ allEventsState, events, myEventsState }) {
  const [refreshing, setRefreshing] = useState(false);
  // let [eventListEvents, setEventListEvents] = useState(events);

  async function refreshEvents() {
    // Load events from the database
    let today = new Date().toISOString().substr(0, 10);
    await fetch(baseUrl + `events-today?Date=${today}`)
      .then((response) => response.json())
      .then((json) => {
        // setEventListEvents(json.data);
        allEventsState[1](json.data);
      });
    // console.log('okie');
  }

  return (
    <View style={styles.container}>
      <FlatList
        // data={eventListEvents}
        data={allEventsState[0]}
        keyExtractor={(listing) => listing.Name}
        renderItem={({ item }) => <AppEventListing event={item} myEventsState={myEventsState} />}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          refreshEvents();
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    width: '100%',
  },
});
export default AppEventList;
