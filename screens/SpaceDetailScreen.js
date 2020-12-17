import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppSpaceDetail from "../components/AppSpaceDetail";
import AppTitle from "../components/AppTitle.js";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

/**
 * This component specifies appearance of the screen that shows attributes
 * about a prayer space. For each attribute, it uses an AppSpaceDetail component
 * to render that attribute on its own line.
 * @param {*} param0
 */

export default class SpaceDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { props: props };
  }

  handleOnPress = () => {
    if (this.state.props.route.params.source == "add") {
      this.state.props.navigation.popToTop();
    } else {
      this.state.props.navigation.pop();
    }
  };

  render() {
    return (
      <Screen style={{ flex: 1, padding: 20 }}>
        <View style={styles.container}>
          <AppTitle>{this.state.props.route.params.values.spaceName}</AppTitle>
        </View>

        <View>
          <AppSpaceDetail
            space={this.state.props.route.params.values}
            detailTitle="Building"
            detailKey="bldgName"
          />
          <AppSpaceDetail
            space={this.state.props.route.params.values}
            detailTitle="Address"
            detailKey="bldgAddress"
          />
          <AppSpaceDetail
            space={this.state.props.route.params.values}
            detailTitle="Instructions"
            detailKey="instructions"
          />
          <AppSpaceDetail
            space={this.state.props.route.params.values}
            detailTitle="Capacity"
            detailKey="capacity"
          />
          <AppSpaceDetail
            space={this.state.props.route.params.values}
            detailTitle="Daily Hours"
            detailKey="dailyHours"
          />
        </View>
        <View style={styles.container}>
          <AppButton
            title="Go Back"
            onPress={this.handleOnPress}
            // if (props.route.params.source == "add") props.navigation.popToTop() else props.navigation.pop())
            //   console.log(
            //     props.navigation.goBack.equals(
            //       props.navigation.navigate("MapView")
            //     )
            //   )
            // }
            // onPress={() => props.navigation.popToTop()}
            customStyle={styles.editBtn}
          ></AppButton>
        </View>
      </Screen>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  editBtn: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
// export default SpaceDetailScreen;
