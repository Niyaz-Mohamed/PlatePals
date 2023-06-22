// Import modules
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Pressable, View, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

// Import globals
import config from "../services/config";
import { auth, db } from "../services/firebase";

export default function ShareScreen({ navigation }) {
  [activeShares, setActiveShares] = useState([]);
  [inactiveShares, setInactiveShares] = useState([]);
  const isFocused = useIsFocused();

  // Get shares on focus
  useEffect(() => {
    if (isFocused) getShares();
  }, [isFocused]);

  // Get all active/inactive shares from firestore
  async function getShares() {
    const sharesRef = collection(db, "shares");
    setActiveShares([]);
    setInactiveShares([]);

    // Query active
    const activeQuery = query(
      sharesRef,
      where("active", "==", true),
      where("sharer.uid", "==", auth.currentUser.uid)
    );
    const activeSnapshot = await getDocs(activeQuery);
    activeSnapshot.forEach((doc) => {
      setActiveShares([...activeShares, doc.data()]);
    });

    // Query inactive
    const inactiveQuery = query(
      sharesRef,
      where("active", "==", false),
      where("sharer.uid", "==", auth.currentUser.uid)
    );
    const inactiveSnapshot = await getDocs(inactiveQuery);
    inactiveSnapshot.forEach((doc) => {
      setInactiveShares([...inactiveShares, doc.data()]);
    });
  }

  // Render a card showing share details
  function renderShare({ item }) {
    const expiryDate = new Date(item.expiryTime.seconds * 1000);
    const expiryString = expiryDate.toUTCString().slice(0, -4);
    const diet = item.diet.toString().replaceAll(",", ", ");

    return (
      <Pressable
        style={styles.card}
        onPress={() => {
          navigation.navigate("Share Details", item);
        }}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.foods}</Text>
          <Text style={styles.cardItem}>
            <Text style={{ fontWeight: "bold" }}>Expiry Time: </Text>{" "}
            {expiryString}
          </Text>
          <Text style={styles.cardItem}>
            <Text style={{ fontWeight: "bold" }}>Diets Followed: </Text> {diet}
          </Text>
        </View>
        <View style={styles.arrowContainer}>
          <AntDesign
            name="caretright"
            size={24}
            color="black"
            style={{ color: "black" }}
          />
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.listView}>
        <Text style={styles.title}> Active Shares</Text>
        <FlatList
          data={activeShares}
          renderItem={renderShare}
          keyExtractor={(item) => item.shareId}
        />
      </View>
      <View style={[styles.listView, { marginTop: 0 }]}>
        <Text style={styles.title}> Completed Shares </Text>
        <FlatList
          data={inactiveShares}
          renderItem={renderShare}
          keyExtractor={(item) => item.shareId}
        />
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("Share Form");
        }}
        android_ripple={{ color: config.accentColor }}
      >
        <Text style={styles.buttonText}>Share some food!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  button: {
    width: "90%",
    height: 60,
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: config.mainColor,
    elevation: 3,
    position: "absolute",
    bottom: 20,
  },
  listView: {
    width: "90%",
    marginTop: 10,
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
    color: "black",
  },
  card: {
    width: "100%",
    backgroundColor: config.accentColor,
    elevation: 3,
    alignContent: "center",
    marginTop: 15,
    padding: 10,
    borderRadius: 14,
    borderColor: config.mainColor,
    borderWidth: 3,
    flexDirection: "row",
  },
  cardContent: {
    flex: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    color: "black",
    marginBottom: 5,
  },
  cardItem: {
    fontSize: 14,
    textAlign: "left",
    color: "black",
  },
  arrowContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
