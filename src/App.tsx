import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StoreProvider } from "./stores";
import Navigation from "./navigation";

export default function App(): React.ReactElement {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <Navigation />
      </StoreProvider>
    </SafeAreaProvider>
  );
}
