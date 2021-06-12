import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { StyleProp, View, ViewStyle, StyleSheet } from "react-native";

import { ListScreen } from "../screens/ListScreen";
import { ImageScreen } from "../screens/ImageScreen";
import { CameraScreen } from "../screens/CameraScreen";
import { RootStackParamList } from "./types";

const RootStack = createStackNavigator<RootStackParamList>();

const transparentHeaderOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerBackground: ({ style }: { style: StyleProp<ViewStyle> }) => (
    <View style={[style, styles.transparentHeaderBackground]} />
  ),
  headerTintColor: "#fff",
};

function RootNavigator(): React.ReactElement {
  return (
    <RootStack.Navigator initialRouteName="List">
      <RootStack.Screen name="List" component={ListScreen} />
      <RootStack.Screen name="Image" component={ImageScreen} options={transparentHeaderOptions} />
      <RootStack.Screen name="Camera" component={CameraScreen} options={transparentHeaderOptions} />
    </RootStack.Navigator>
  );
}

export default function Navigation(): React.ReactElement {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  transparentHeaderBackground: {
    backgroundColor: "#0009",
    width: "100%",
    height: "100%",
  },
});

