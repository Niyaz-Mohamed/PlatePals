import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import config from "../services/config";
import { auth, db } from "../services/firebase";
import { StyleSheet } from "react-native";

export default function ChatScreen({ route }) {
  const { name } = route.params;
  // const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   async function fetchMessages() {
  //     try {
  //       const snapshot = await db.collection("messages").get();
  //       const messageArray = snapshot.docs.map((doc) => doc.data());
  //       setMessages(messageArray);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchMessages();
  // }, []);

  // async function addMessage() {
  //   try {
  //     await db.collection("messages").add({ text });
  //     console.log("Message added successfully!");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    padding: 10,
    marginTop: 50,
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleContainer: {
    width: "100%",
    flex: 1,
  },
  subtitle: {
    width: "100%",
    fontSize: 20,
    textAlign: "left",
    color: "grey",
  },
  title: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "left",
    color: config.mainColor,
  },
  list: {
    flex: 1,
    width: "100%",
  },
});
