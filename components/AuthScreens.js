// Import modules
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Import firebase and globals
import globalSettings from "../global";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

// Login with email and password
export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  async function loginUser() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error) {
      error = JSON.parse(JSON.stringify(error))["code"].split("/")[1];
      console.log(error);
      setErrorText(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
        android_ripple={{ color: globalSettings.accentColor }}
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

  async function createUser() {
    try {
      //TODO: Store email, passoword, username, diet in firestore
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
      <Pressable
        style={styles.button}
        onPress={createUser}
        android_ripple={{ color: globalSettings.accentColor }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    paddingTop: 140,
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
    backgroundColor: globalSettings.mainColor,
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
