import { Fontisto } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface IconButtonProps {
  onPress: () => void;
  icon: ConstructorParameters<typeof Fontisto>[0]["name"];
}
export function IconButton({ onPress, icon }: IconButtonProps): React.ReactElement {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Fontisto name={icon} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0d0",
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 20,
    marginBottom: 20,
    height: 60,
    width: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  icon: {
    color: "#fff",
    fontSize: 20,
  },
});
