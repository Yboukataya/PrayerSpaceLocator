import React, { useEffect, useState } from 'react';
import Screen from '../components/Screen';

import AppIntroSlider from "react-native-app-intro-slider";
import slides from "../constants/tutorial.js";

export default function WalkthroughScreen({ navigation, route }) {

    return (
        <Screen style={{ flex: 1, padding: 20 }}>
            <AppIntroSlider
        slides={slides}
        // onDone={doneWithIntro}
        showSkipButton={true}
        onSkip={skipSlides}
      />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 40,
    },
    title: {
      fontSize: 48,
      fontWeight: '600',
    },
    dateTimePickerComponentStyle: {
      height: 100,
    },
    dateTimePickerStyle: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      width: '100%',
    },
    dropdownStyle: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      zIndex: 50,
    },
    bldgDropdownStyle: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      width: '100%',
      zIndex: 100,
    },
  });