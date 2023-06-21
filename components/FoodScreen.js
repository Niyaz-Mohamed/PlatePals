// Import modules
import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Pressable } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, getDocs, query, where } from "firebase/firestore";

// Import globals
import config from "../services/config";
import { auth, db } from "../services/firebase";

export default function FoodScreen() {
  const [location, setLocation] = useState(null);
  const [shares, setShares] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getLocation();
      getCurrentShares();
    }
  }, [isFocused]);

  // Get current location of the user
  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      navigation.navigate("Share");
    }
    let locationFetched = await Location.getCurrentPositionAsync({});
    setLocation(locationFetched.coords);
  }

  // Get all shares in the vicinity
  async function getCurrentShares() {
    const sharesRef = collection(db, "shares");
    let sharesFetched = [];

    // Query active non-owned shares
    const sharesQuery = query(
      sharesRef,
      where("creator.uid", "!=", auth.currentUser.uid),
      where("active", "==", true)
    );
    const sharesSnapshot = await getDocs(sharesQuery);
    sharesSnapshot.forEach((doc) => {
      sharesFetched.push(doc.data());
    });
    setShares(sharesFetched);
  }

  return (
    <View style={styles.container}>
      {location && shares ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor={config.mainColor}
            onPress={(e) => {
              coord = e.nativeEvent.coordinate;
              console.log(coord);
            }}
          />
          {shares.map((share) => {
            return (
              <Marker
                coordinate={{
                  latitude: share.location.latitude,
                  longitude: share.location.longitude,
                }}
                pinColor="blue"
                onPress={(e) => {
                  coord = e.nativeEvent.coordinate;
                  console.log(coord);
                }}
              />
            );
          })}
        </MapView>
      ) : (
        <View style={styles.container}>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
