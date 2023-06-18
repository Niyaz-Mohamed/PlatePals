import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import globalSettings from "../global";

export const LoginScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function registerUser() {
    console.log(username, password);
  }

  return (
    <SafeAreaView style={styles.container}>
      <MaterialIcons name="food-bank" size={100} color="black" />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
        onPress={registerUser}
        android_ripple={{ color: globalSettings.accentColor }}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function createUser() {
    console.log(username, password);
  }

  return (
    <SafeAreaView style={styles.container}>
      <MaterialIcons name="food-bank" size={100} color="black" />
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
});
