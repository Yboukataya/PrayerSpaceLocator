import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../config/backend-config';

import AppText from './AppText';

/**
 * This component defines how each prayer space in the list on the View Spaces
 * screen is rendered.
 * @param {*} param0
 */

function AppSpaceListing({ space, viewUnapproved }) {
  const navigation = useNavigation();
  return (
    <View style={styles.listingContainer}>
      {/* for the text information */}
      <View>
        <AppText customStyle={{ flex: 1, width: '100%', borderColor: 'blue' }}>
          {space.Name} {/* <AppText customStyle={styles.distStyle}> {distance}</AppText> */}
        </AppText>
        <AppText customStyle={styles.capacityStyle}>Capacity: {space.Capacity}</AppText>
      </View>

      {/* for the icon */}
      <View>
        <TouchableOpacity
          onPress={() => {
            fetch(baseUrl + `incrementSpaceViews?Spaceid=${space.Spaceid}`, {
              method: 'PUT',
            });
            navigation.navigate('SpaceDetail', {
              space: space,
              viewUnapproved: viewUnapproved,
            });
          }}
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

export default AppSpaceListing;
