// Import modules
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import stringHash from "string-hash";

// Import globals
import config from "../services/config";
import { auth, db } from "../services/firebase";

export default function ShareDetails({ navigation, route }) {
  // Constants for constructing chat object
  const share = route.params;
  const expiryTime = new Date(share.expiryTime.seconds * 1000);
  // State hooks
  const [chatExists, setChatExists] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkCreatedChats();
    }
  }, [isFocused]);

  // Get current user
  async function checkCreatedChats() {
    const chatRef = collection(db, "chats");
    let chatsFetched = [];

    // Query chats for duplicates
    const chatQuery = query(
      chatRef,
      where("getter.uid", "==", auth.currentUser.uid),
      where("share.shareId", "==", share.shareId)
    );
    const chatSnapshot = await getDocs(chatQuery);
    chatSnapshot.forEach((doc) => {
      chatsFetched.push(doc.data());
    });

    userOwned = share.sharer.uid === auth.currentUser.uid;
    // Update existence of chat
    if (userOwned || chatsFetched.length !== 0) {
      setChatExists(true);
    } else {
      setChatExists(false);
    }
  }

  // Create chat, only done by non-owners of the share
  async function createChat() {
    try {
      const chatId = stringHash(
        share.shareId + auth.currentUser.uid
      ).toString();
      let currentUser = null;

      // Get current user's data
      const userRef = collection(db, "users");
      // Query users
      const userQuery = query(
        userRef,
        where("uid", "==", auth.currentUser.uid)
      );
      const userSnapshot = await getDocs(userQuery);
      // Only 1 document should be returned
      userSnapshot.forEach((doc) => {
        currentUser = doc.data();
      });

      // Add chat data to db
      chatData = {
        chatId,
        share,
        getter: currentUser,
        active: true,
      };
      await addDoc(collection(db, "chats"), chatData);
      navigation.navigate("Chat Room", chatData);
    } catch (error) {
      console.log(error);
    }
  }

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
            {share.sharer.username}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textHighlight}>Diet(s) Followed: </Text>
            {share.sharer.diet.toString().replace(",", ", ")}
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
      {chatExists ? (
        ""
      ) : (
        <Pressable
          style={styles.button}
          onPress={() => {
            createChat();
          }}
          android_ripple={{ color: config.accentColor }}
        >
          <Text style={styles.buttonText}>
            Chat with {share.sharer.username}
          </Text>
        </Pressable>
      )}
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
