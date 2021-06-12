import { useIsFocused } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Camera } from "expo-camera";
import React, { useCallback, useRef } from "react";
import { StyleSheet, View, Button, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import { useStoreContext, randomId } from "../services";

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, "Camera">;

export function CameraScreen({ navigation }: { navigation: CameraScreenNavigationProp }): React.ReactElement {
  const store = useStoreContext();
  const isFocused = useIsFocused();
  const cameraRef = useRef<Camera>(null);

  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync();
      const id = randomId();
      store.addImage(id, {
        uri: picture.uri,
        createdAt: new Date(),
        width: picture.width,
        height: picture.height,
        ratio: picture.width / picture.height,
      });
      navigation.navigate("Image", { id });
    }
  }, [cameraRef.current, store.addImage]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        {
          // We need to unmount the camera if focus is lost, otherwise it will use unnecessary resources
          // and cause bugs when returning from image preview
          isFocused && <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} ratio="16:9" />
        }
        <Button title="Take pic" onPress={takePicture} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
  },
  camera: {
    flex: 1,
    flexBasis: (Dimensions.get("window").width / 9) * 16,
    width: Dimensions.get("window").width,
    flexGrow: 0,
  },
});
