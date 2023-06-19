import React, { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import config from "../services/config";

// TODO: Add location input
export default function ShareForm({ navigation }) {
  const [food, setFood] = useState("");
  const [diets, setDiets] = useState([]);
  const [hoursValid, setHoursValid] = useState("");
  const [image, setImage] = useState(null);

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  function createShare() {
    console.log(food, diets, hoursValid, image);
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
      <MultipleSelectList
        setSelected={(val) => setDiets(val)}
        placeholder="Dietary Tags"
        label="Dietary Tags"
        data={config.diets}
        save="value"
        badgeStyles={{ backgroundColor: config.mainColor }}
        boxStyles={{
          width: 350,
          borderWidth: 5,
          borderColor: "black",
          margin: 12,
          minHeight: 60,
          alignItems: "center",
        }}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={2}
        placeholder="Hours Valid"
        value={hoursValid}
        onChangeText={setHoursValid}
      ></TextInput>
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Image to display</Text>
      </Pressable>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 250, height: 250, borderRadius: 16 }}
        />
      )}
      <Pressable style={styles.button} onPress={createShare}>
        <Text style={styles.buttonText}>Share!</Text>
      </Pressable>
      <View style={{ width: "100%", height: 40 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "101%",
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
