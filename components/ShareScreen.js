// Import modules
import React from "react";
import { Text, StyleSheet, Pressable, View, FlatList } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
// Import objects
import config from "../services/config";
import { auth, db } from "../services/firebase";

export default function ShareScreen({ navigation, route }) {
  [activeShares, setActiveShares] = useState([]);
  [inactiveShares, setInactiveShares] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getShares();
  }, [isFocused]);

  async function getShares() {
    const sharesRef = collection(db, "shares");
    setActiveShares([]);
    setInactiveShares([]);

    // Query active
    const activeQuery = query(sharesRef, where("active", "==", true));
    const activeSnapshot = await getDocs(activeQuery);
    activeSnapshot.forEach((doc) => {
      setActiveShares([...activeShares, doc.data()]);
    });

    // Query inactive
    const inactiveQuery = query(
      sharesRef,
      where("active", "==", false),
      where("creatorID", "==", auth.currentUser.uid)
    );
    const inactiveSnapshot = await getDocs(inactiveQuery);
    inactiveSnapshot.forEach((doc) => {
      setInactiveShares([...inactiveShares, doc.data()]);
    });
  }

  function renderShare({ item }) {
    const e = new Date(item.expiryTime.seconds * 1000);
    const expiryString = e.toUTCString().slice(0, -4);
    const diet = item.diet.toString().replaceAll(",", ", ");

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.foods}</Text>
        <Text style={styles.cardItem}>
          <Text style={{ fontWeight: "bold" }}>Expiry Time: </Text>{" "}
          {expiryString}
        </Text>
        <Text style={styles.cardItem}>
          <Text style={{ fontWeight: "bold" }}>Diets Followed: </Text> {diet}
        </Text>
      </View>
    );
  }

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
  card: {
    width: "100%",
    backgroundColor: config.accentColor,
    elevation: 3,
    alignContent: "center",
    marginTop: 15,
    padding: 15,
    borderRadius: 14,
    borderColor: config.mainColor,
    borderWidth: 3,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "left",
    color: config.mainColor,
    marginBottom: 5,
  },
  cardItem: {
    fontSize: 14,
    textAlign: "left",
    color: "black",
  },
});
