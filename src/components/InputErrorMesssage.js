import React from "react";
import { StyleSheet, Text } from "react-native";

export default function InputErrorMessage({ error, visible }) {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    marginTop: 10,
    color: "black",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "600",
  },
});
