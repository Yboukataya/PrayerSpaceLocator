import * as React from "react";
import { View, ViewStyle, TextStyle, ScrollViewProps } from "react-native";
import styled from "styled-components/native";

import { Section, SectionData } from "./Section";

export type SettingsData = SettingsDatum[];
export type SettingsDatum = CustomViewData | SectionData;

export interface CustomViewData {
  type: "CUSTOM_VIEW";
  key?: string;
  render: () => React.ReactElement<any>;
}

export interface Props {
  style?: ViewStyle;
  data: SettingsData;
  globalTextStyle?: TextStyle;
  scrollViewProps?: Partial<ScrollViewProps>;
}

const IOS_AUTH_ID =
  "86332169337-nagmpq99r18ib493bnegn2roilg7kcqg.apps.googleusercontent.com";
const ANDROID_AUTH_ID =
  "86332169337-1vfr1qn2eqr4m0h0jh9a0pp1q5d97a7k.apps.googleusercontent.com";

export class SettingsScreen extends React.Component<Props> {
  state = { refreshing: false };

  render() {
    const elements = this.props.data.map((item, i) => {
      switch (item.type) {
        case "CUSTOM_VIEW":
          return <View key={item.key || i}>{item.render()}</View>;
        case "SECTION":
          return (
            <Section
              key={item.header || i}
              section={item}
              globalTextStyle={this.props.globalTextStyle}
            />
          );
      }
    });

    const scrollViewProps: ScrollViewProps = {
      ...(this.props.scrollViewProps || {}),
      style: this.props.style,
    };

    return (
      <SettingsScrollView {...scrollViewProps}>{elements}</SettingsScrollView>
    );
  }
}

const SettingsScrollView = styled.ScrollView`
  flex: 1;
  align-self: stretch;
  background-color: hsl(0, 0%, 97%);
`;
