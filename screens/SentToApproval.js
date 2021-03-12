import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

/**
 * This component specifies appearance of the screen that shows both list of
 * nearby spaces as well as the map.
 * @param {*} param0
 */

// let [spots, setSpots] = useState("");

function SentToApprovalScreen(props) {
  return (
    <Screen style={{ flex: 1, padding: 20 }}>
      <View style={styles.headingContainer}>
        <AppText customStyle={styles.title}>Your space has been sent for approval!</AppText>
      </View>

      <View style={styles.container}>
        {/* Render map or list of spaces, based on mapVisible */}
        <AntDesign name='checkcircleo' size={250} color='green' style={{ marginBottom: 20 }} />
        <AppText customStyle={{ textAlign: 'justify' }}>
          Thanks for taking the time to suggest a new prayer space! Once an admin from your campus
          double checks the details, it will be visible for everyone in the list of prayer spaces!
        </AppText>
      </View>
      <AppButton
        title='Back to Home'
        // TODO: patch up this navigation to the welcome screen
        onPress={() => props.navigation.navigate('Home')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    textAlign: 'justify',
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceListContainer: {
    flex: 1,
    width: '90%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default SentToApprovalScreen;
