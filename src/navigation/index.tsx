import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import * as React from 'react';

import { ListScreen } from '../screens/ListScreen';
import { ImageScreen } from '../screens/ImageScreen';
import { CameraScreen } from '../screens/CameraScreen';
import { View } from 'react-native';

export type RootStackParamList = {
  List: undefined;
  Camera: undefined;
  Image: { id: string };
};

const RootStack = createStackNavigator<RootStackParamList>();

const transparentHeaderOptions: StackNavigationOptions = {
  headerTransparent: true,
  headerBackground: (p) => <View style={[p.style, { backgroundColor: "#0009", width: "100%", height: "100%" }]} />,
  headerTintColor: "#fff",
};

function RootNavigator() {
  return (
    <RootStack.Navigator initialRouteName="List">
      <RootStack.Screen name="List" component={ListScreen}/>
      <RootStack.Screen name="Image" component={ImageScreen} options={transparentHeaderOptions} />
      <RootStack.Screen name="Camera" component={CameraScreen} options={transparentHeaderOptions} />
    </RootStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}