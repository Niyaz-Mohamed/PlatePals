// Import modules
import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";

// Import globals
import config from "../services/config";
import { Pressable } from "react-native";

export default function ShareDetails({ navigation, route }) {
  const share = route.params;
  const expiryTime = new Date(share.expiryTime.seconds * 1000);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.titleImg}
        source={{ uri: share.image }}
        imageStyle={{ borderRadius: 25 }}
        resizeMode="cover"
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{share.foods}</Text>
          {/* Sharer details */}
          <Text style={styles.subtitle}>Sharer Details</Text>
          <Text style={styles.text}>
            <Text style={styles.textHighlight}>Username: </Text>
            {share.creator.username}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textHighlight}>Diet(s) Followed: </Text>
            {share.creator.diet.toString().replace(",", ", ")}
          </Text>
          {/* Food details */}
          <Text style={styles.subtitle}>Offer Details</Text>
          <Text style={styles.text}>
            <Text style={styles.textHighlight}>Food Suitable for: </Text>
            {share.diet.toString().replace(",", ", ")}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textHighlight}>Expiry Time: </Text>
            {expiryTime.toUTCString().slice(0, -4)}
          </Text>
        </View>
      </ImageBackground>
      {/* Button to begin chat */}
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("Chat", { openChat: true });
        }}
        android_ripple={{ color: config.accentColor }}
      >
        <Text style={styles.buttonText}>Chat with the Sharer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  titleImg: {
    height: "100%",
    maxHeight: 450,
    border: "black",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: "rgba(0,0,0, 0.70)",
    borderRadius: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 34,
    color: config.mainColor,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginVertical: 10,
  },
  textHighlight: {
    color: config.mainColor,
    fontWeight: "bold",
    marginBottom: 3,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 60,
    marginVertical: 20,
    padding: 10,
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: config.mainColor,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
