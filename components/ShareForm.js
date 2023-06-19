import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function ChatScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Form</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
});
