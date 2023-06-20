import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import config from "../services/config";
import { auth, db } from "../services/firebase";
import { FontAwesome } from "@expo/vector-icons";
import { Background } from "@react-navigation/elements";

export default function ChatScreen({ navigation }) {
  const [chats, setChats] = useState([
    { name: "Dick", id: 0 },
    { name: "Tom", id: 1 },
    { name: "Harry", id: 2 },
  ]);
  // TODO: Fetch list of chats from db

  function renderChat({ item }) {
    let { name } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat Room", { ...item });
        }}
        android_ripple={{ color: config.accentColor }}
        style={{
          margin: 2,
          padding: 10,
          flex: 1,
          borderColor: "black",
          borderWidth: 3,
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../assets/profile.jpg")}
          style={{ width: 80, height: 80, borderRadius: 100 }}
        />
        <Text
          style={{ fontSize: 30, textAlignVertical: "center", padding: 10 }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Inbox </Text>
          <Text style={styles.subtitle}> 3 unread chats </Text>
        </View>
        <FontAwesome
          name="search"
          size={24}
          color="black"
          style={{ flex: 1, textAlign: "right", margin: 10 }}
        />
      </View>
      <FlatList style={styles.list} data={chats} renderItem={renderChat} />
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
