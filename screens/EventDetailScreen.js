import React from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AppButton from '../components/AppButton';
import AppSpaceDetail from '../components/AppSpaceDetail';
import AppTitle from '../components/AppTitle.js';
import AppText from '../components/AppText';
import Screen from '../components/Screen';

export default function EventDetailScreen({ route }) {
  console.log('CHECK EVENT OBJECT: \n', route.params.event);

  const navigation = useNavigation();

  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.container}>
        <AppTitle>{route.params.event.eventName}</AppTitle>
      </View>

      <View style={styles.spaceDetails}>
        <AppSpaceDetail
          space={route.params.event}
          detailTitle='Building'
          detailKey='selectedBuilding'
        />
        <AppSpaceDetail space={route.params.event} detailTitle='Space' detailKey='selectedSpace' />
        {/* TODO: combine date/time into one entry below */}
        <AppSpaceDetail space={route.params.event} detailTitle='Date' detailKey='date' />
        <AppSpaceDetail space={route.params.event} detailTitle='Time' detailKey='time' />
      </View>
      <View style={styles.btnContainer}></View>
      {/* <AppButton title="Update"  onPress={() => navigation.navigate("AddSpace", {existingSpace: route.params.space})}/> */}
      <AppButton title='Back To Events' onPress={() => navigation.navigate('ViewEvents')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    width: '50%',
    paddingRight: 10,
    paddingLeft: 10,
  },
  btnStyle: {
    marginRight: 5,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  editBtn: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceDetails: {
    flex: 1,
  },
});

// export default EventDetailScreen;
