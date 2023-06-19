import React from "react";
import { Text, StyleSheet, Pressable, Card, View } from "react-native";
import config from "../services/config";

export default function ChatScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("Share Form");
        }}
        android_ripple={{ color: config.accentColor }}
      >
        <Text style={styles.buttonText}>Share some food!</Text>
      </Pressable>

      <View style={styles.listView}>
        <Text style={styles.title}> Active Orders</Text>
      </View>
      <View style={styles.listView}>
        <Text style={styles.title}> Completed Orders </Text>
      </View>
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
  button: {
    width: "90%",
    height: 60,
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: config.mainColor,
    elevation: 3,
    position: "absolute",
    top: 10,
  },
  listView: {
    width: "90%",
    marginTop: 30,
    position: "relative",
    top: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  title: {
    width: "100%",
    marginTop: 30,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "left",
    color: config.mainColor,
  },
});
