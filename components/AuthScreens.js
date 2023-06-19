// Import modules
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { ScrollView } from "react-native";
// Import firebase and globals
import config from "../services/config";
import { auth } from "../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Login with email and password
export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  async function loginUser() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Main Tabs");
    } catch (error) {
      error = JSON.parse(JSON.stringify(error))["code"].split("/")[1];
      console.log(error);
      setErrorText(error);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { alignItems: "center" }]}>
      <MaterialIcons name="food-bank" size={100} color="black" />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      <Pressable
        style={styles.button}
        onPress={loginUser}
        android_ripple={{ color: config.accentColor }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      <Text style={styles.error}>
        {errorText === "" ? "" : errorText.toString()}
      </Text>
    </SafeAreaView>
  );
};

export const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState([]);
  const [errorText, setErrorText] = useState("");

  const diets = [
    { key: "1", value: "Vegetarian" },
    { key: "2", value: "Vegan" },
    { key: "3", value: "Halal" },
    { key: "5", value: "Gluten-Free" },
    { key: "6", value: "No Restrictions" },
  ];

  async function createUser() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        username: username,
      });
      navigation.navigate("Main Tabs");
    } catch (error) {
      error = JSON.parse(JSON.stringify(error))["code"].split("/")[1];
      console.log(error);
      setErrorText(error);
    }
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: 80 }]}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <MaterialIcons name="food-bank" size={100} color="black" />
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      {/* Diet Selection List */}
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        placeholder="Dietary Restrictions"
        label="Dietary Restrictions"
        data={diets}
        save="value"
        onSelect={() => console.log(selected)}
        badgeStyles={{ backgroundColor: config.mainColor }}
        boxStyles={{
          borderWidth: 5,
          borderColor: "black",
          margin: 12,
          minHeight: 60,
        }}
      />
      <Pressable
        style={styles.button}
        onPress={createUser}
        android_ripple={{ color: config.accentColor }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      <Text style={styles.error}>
        {errorText === "" ? "" : errorText.toString()}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 130,
  },
  title: {
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 60,
    margin: 12,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    borderWidth: 5,
    borderRadius: 8,
  },
  button: {
    width: "100%",
    height: 60,
    margin: 12,
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
  error: {
    margin: 12,
    color: "red",
  },
});
