import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Camera } from "expo-camera";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StoreProvider } from "./stores";
import Navigation from "./navigation";

export default function App(): React.ReactElement {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <Navigation />
      </StoreProvider>
    </SafeAreaProvider>
  );
}
