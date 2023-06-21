// Import modules
import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import stringHash from "string-hash";
import * as Location from "expo-location";

// Import globals
import config from "../services/config";
import { auth, db } from "../services/firebase";

// TODO: Add location input
export default function ShareForm({ navigation }) {
  const [food, setFood] = useState("");
  const [diets, setDiets] = useState([]);
  const [hoursValid, setHoursValid] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCurrentUser();
      getLocation();
      console.log(location);
    }
  }, [isFocused]);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Error, permission not granted");
      navigation.navigate("Share");
    }

    let locationFetched = await Location.getCurrentPositionAsync({});
    setLocation(locationFetched.coords);
  }

  // Get current user
  async function getCurrentUser() {
    const userRef = collection(db, "users");
    let userFetched = null;

    // Query users
    const userQuery = query(userRef, where("uid", "==", auth.currentUser.uid));
    const userSnapshot = await getDocs(userQuery);
    // Only 1 document should be returned
    userSnapshot.forEach((doc) => {
      userFetched = doc.data();
      setCurrentUser(userFetched);
    });
  }

  // Launches image library
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  // Create a document in the 'shares' collection
  async function createShare() {
    try {
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + parseInt(hoursValid));
      const shareId = stringHash(Date() + auth.currentUser.uid).toString();
      // TODO: refactor
      await addDoc(collection(db, "shares"), {
        shareId,
        sharer: currentUser,
        location: location,
        foods: food,
        diet: diets,
        image,
        expiryTime,
        active: true,
      });
      navigation.navigate("Share");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Share Food</Text>
        <Text style={styles.desc}>
          Enter the details of the food you would like to share
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="What foods are you sharing?"
        value={food}
        onChangeText={setFood}
      ></TextInput>
      <View style={{ width: "100%", margin: 15, marginBottom: 5 }}>
        <MultipleSelectList
          setSelected={(val) => setDiets(val)}
          placeholder="Dietary Tags"
          label="Dietary Tags"
          data={config.diets}
          save="value"
          badgeStyles={{ backgroundColor: config.mainColor }}
          boxStyles={{
            width: 340,
            borderWidth: 5,
            borderColor: "black",
            minHeight: 60,
            alignItems: "center",
          }}
        />
      </View>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
        placeholder="Hours Valid"
        value={hoursValid}
        onChangeText={setHoursValid}
      ></TextInput>
      <Pressable
        style={styles.button}
        onPress={pickImage}
        android_ripple={{ color: config.accentColor }}
      >
        <Text style={styles.buttonText}>Select Image to display</Text>
      </Pressable>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 250, height: 250, borderRadius: 16 }}
        />
      )}
      <Pressable
        style={styles.button}
        onPress={createShare}
        android_ripple={{ color: config.accentColor }}
      >
        <Text style={styles.buttonText}>Share!</Text>
      </Pressable>
      <View style={{ width: "100%", height: 40 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
  },
  title: {
    marginTop: 60,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
    color: config.mainColor,
  },
  desc: {
    color: "grey",
    marginTop: 2,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 60,
    margin: 15,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    borderWidth: 5,
    borderRadius: 8,
    justifyContent: "center",
  },
  button: {
    width: "100%",
    height: 60,
    margin: 10,
    marginBottom: 15,
    padding: 10,
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: config.mainColor,
    elevation: 3,
    zIndex: 0.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
