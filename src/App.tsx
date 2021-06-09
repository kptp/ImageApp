import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import { StoreProvider, useStoreContext, IImage, randomId } from './services';
import { ListScreen } from './screens/ListScreen';
import Navigation from './navigation';

function ImageComponent({ id, img }: { id: string, img: IImage }) {
  const [text, setText] = useState<string>("");
  const store = useStoreContext();

  return (
    <View>
      <Image source={{ uri: img.uri }} style={{ width: 100, height: 100}} />
      <Text>{id}: {img.caption || ""}</Text>
      <TextInput
        onChangeText={setText}
        value={text}
      />
      <Button onPress={() => store.setCaption(id, text)} title={"Set caption"} />
    </View>
  )
}

function CameraView() {
  const store = useStoreContext();
  const cameraRef = useRef<Camera>(null);
  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      const picture = await cameraRef.current.takePictureAsync();
      store.addImage(randomId(), { uri: picture.uri, createdAt: new Date(), });
    }
  }, [cameraRef.current, store.addImage]);

  return (
    <View style={styles.cameraContainer}>
      <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={cameraRef} >
        <Button title={"Take pic"} onPress={takePicture}/>
      </Camera>
    </View>
  );
}

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <StoreProvider>
      <Navigation />
    </StoreProvider>
  );
}

/*
    <ServiceContext.Provider value={services}>
      <View style={styles.container}>
        { latestImage && (
          <Image source={{ uri: latestImage.uri }} style={styles.image} />
        )}
        <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={cameraRef} >
          <Button title={"take pic"} onPress={takePicture}/>
        </Camera>
        <StatusBar style="auto" />
      </View>
    </ServiceContext.Provider>

    */

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
