// Import modules
import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

// Import globals
import config from "../services/config";

export default function FoodScreen() {
  const [location, setLocation] = useState(null);
  const isFocused = useIsFocused();

  // TODO: Query for shares not created by current user.

  useEffect(() => {
    if (isFocused) {
      getLocation();
    }
  }, [isFocused]);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      navigation.navigate("Share");
    }
    let locationFetched = await Location.getCurrentPositionAsync({});
    setLocation(locationFetched.coords);
  }

  return (
    <View style={styles.container}>
      {location ? (
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
          />
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
