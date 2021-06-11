import React from "react";
import { StyleSheet, View, Text, TextProps } from "react-native";

export function ImageOverlayText(props: React.PropsWithChildren<TextProps>) {
  return <Text {...props} style={[props.style, overlayStyles.overlayText]} />;
}

export function ImageOverlay({ children }: React.PropsWithChildren<{}>) {
  return <View style={overlayStyles.imageOverlay}>{children}</View>;
}

export const overlayStyles = StyleSheet.create({
  imageOverlay: {
    backgroundColor: "#1115",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  overlayText: {
    fontSize: 20,
    color: "#fff",
    margin: 5,
  },
});
