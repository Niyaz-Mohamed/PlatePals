// Import modules
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

// Import globals
import config from "../services/config";

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const user = route.params.getter;

  function onSend(messages) {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }

  return (
    <GiftedChat
      style={styles.giftedChat}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.uid,
      }}
    />
  );
}

// TODO: Manage and remove unneeded styles
const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: config.accentColor,
    borderBottomColor: config.mainColor,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: config.mainColor,
  },
  subtitle: {
    fontSize: 14,
    color: "grey",
  },
  giftedChat: {
    width: "100%",
    height: "100%",
    maxHeight: 300,
    backgroundColor: "red",
  },
});
