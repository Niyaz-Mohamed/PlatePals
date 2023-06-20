import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import config from "../services/config";
import { auth, db } from "../services/firebase";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function ChatScreen({ navigation, route }) {
  const { name } = route.params;
  const [messageText, setMessageText] = useState("");

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

  async function handleSendMessage() {
    try {
      if (messageText.trim() === "") {
        return;
      }

      // await db.collection("messages").add({
      //   text: messageText,
      //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // });

      setMessageText("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome.Button
          name="arrow-left"
          size={20}
          color="black"
          backgroundColor="transparent"
          onPress={() => navigation.goBack()}
          underlayColor="transparent"
        />
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
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
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
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
    textAlignVertical: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
