import { useIsFocused } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { RootStackParamList } from '../navigation';
import { useStoreContext, IImage, randomId } from '../services';

type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Camera'
>;

export function CameraScreen({ navigation }: { navigation: CameraScreenNavigationProp }) {
  const store = useStoreContext();
  const isFocused = useIsFocused();
  const cameraRef = useRef<Camera>(null);
  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync();
      const id = randomId();
      store.addImage(id, { uri: picture.uri, createdAt: new Date(), });
      navigation.navigate("Image", { id });
    }
  }, [cameraRef.current, store.addImage]);

  return (
    <View style={styles.cameraContainer}>
      { // We need to unmount the camera if focus is lost, otherwise it will use unnecessary resources
        // and cause bugs when returning from image preview
        isFocused &&
        <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={cameraRef} onMountError={(e) => console.log(e)}>
          <Button title={"Take pic"} onPress={takePicture}/>
        </Camera>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  camera: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-end",
  },
});