import React, { ReactNode } from "react";
import { StyleSheet, View, Text, TextProps } from "react-native";

export function ImageOverlayText({ style, ...props }: React.PropsWithChildren<TextProps>): React.ReactElement {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Text {...props} style={[style, overlayStyles.overlayText]} />;
}

export function ImageOverlay({ children }: { children: ReactNode }): React.ReactElement {
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
