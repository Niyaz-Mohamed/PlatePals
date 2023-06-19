import {
  ImageBackground,
  Pressable,
  Text,
  StyleSheet,
  View,
} from "react-native";
import config from "../services/config";

export default function StartScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/bento.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <Text style={styles.title}>PlatePals!</Text>
      <View style={styles.footer}>
        <Pressable
          style={[styles.button, styles.buttonFill]}
          android_ripple={{ color: config.accentColor }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={[styles.buttonText, styles.buttonTextFill]}>Login</Text>
        </Pressable>
        <Pressable
          style={[styles.button]}
          android_ripple={{ color: config.accentColor }}
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        >
          <Text style={[styles.buttonText]}>Sign Up</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: { width: "100%", flex: 1, alignItems: "center" },
  title: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    fontSize: 60,
    padding: 30,
    paddingTop: 200,
  },
  footer: {
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  button: {
    width: "100%",
    height: 65,
    margin: 12,
    padding: 10,
    justifyContent: "center",
    borderRadius: 8,
    borderColor: config.accentColor,
    borderWidth: 5,
    justifyContent: "center",
  },
  buttonFill: {
    backgroundColor: config.mainColor,
    borderColor: config.mainColor,
  },
  buttonText: {
    color: config.accentColor,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  buttonTextFill: {
    color: "white",
  },
});
