import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { collection, getDocs, query } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import config from "../services/config";

export default function ChatScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getChats();
  }, [isFocused]);

  async function getChats() {
    const sharesRef = collection(db, "chats");
    // TODO: Refactor to match Share Screen
    let chats = [];

    // Query active
    // TODO: Filter only chats belonging to a user
    const chatQuery = query(sharesRef);
    const chatSnapshot = await getDocs(chatQuery);
    chatSnapshot.forEach((doc) => {
      chats.push(doc.data());
    });

    setChats(chats);
  }

  function renderChatroom({ item }) {
    // TODO: Update description of each chat
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Chat Room", item);
        }}
        android_ripple={{ color: config.accentColor }}
        style={styles.chatChip}
      >
        <Image
          source={require("../assets/profile.jpg")}
          style={styles.profileImg}
        />
        <View style={styles.chatDetails}>
          <Text style={styles.chatTitle}>{item.name}</Text>
          <Text style={styles.subtitle}>This person is a recepient</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}> Inbox </Text>
        <Text style={styles.subtitle}> {chats.length} active chats </Text>
      </View>
      <FlatList
        style={styles.chatList}
        data={chats}
        renderItem={renderChatroom}
        keyExtractor={(item) => item.chatID}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 20,
    marginTop: 45,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    color: config.mainColor,
  },
  subtitle: {
    fontSize: 18,
    color: "grey",
  },
  chatChip: {
    flex: 1,
    borderColor: config.mainColor,
    backgroundColor: config.accentColor,
    borderWidth: 1,
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    margin: 0,
  },
  profileImg: {
    height: "75%",
    width: undefined,
    aspectRatio: 1 / 1,
    borderRadius: 45,
  },
  chatDetails: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
    height: "100%",
  },
  chatTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: config.mainColor,
  },
});
