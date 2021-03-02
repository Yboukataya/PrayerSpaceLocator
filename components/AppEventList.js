import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AppEventListing from './AppEventListing';
import ListItemSeparator from './ListItemSeparator';
import Screen from './Screen';

function AppEventList({ events, myEventsState }) {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(listing) => listing.Name}
        renderItem={({ item }) => <AppEventListing event={item} myEventsState={myEventsState} />}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => console.log('ayy')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    width: '100%',
  },
});
export default AppEventList;
