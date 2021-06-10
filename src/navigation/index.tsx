import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { ListScreen } from '../screens/ListScreen';
import { ImageScreen } from '../screens/ImageScreen';
import { CameraScreen } from '../screens/CameraScreen';

export type RootStackParamList = {
  List: undefined;
  Camera: undefined;
  Image: { id: string };
};

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator initialRouteName="List">
      <RootStack.Screen name="List" component={ListScreen} />
      <RootStack.Screen name="Image" component={ImageScreen} />
      <RootStack.Screen name="Camera" component={CameraScreen} />
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