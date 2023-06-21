// Import modules
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";

// Import components/globals
import StartScreen from "./components/StartScreen";
import { LoginScreen, SignupScreen } from "./components/AuthScreens";
import FoodScreen from "./components/FoodScreen";
import ShareScreen from "./components/ShareScreen";
import ShareForm from "./components/ShareForm";
import ChatScreen from "./components/ChatScreen";
import SingleChat from "./components/SingleChat";
import { auth } from "./services/firebase";
import config from "./services/config";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          //Set the icon based on which route it is (name of the tab)
          if (route.name === "Food") {
            iconName = "cutlery";
          } else if (route.name === "Share") {
            iconName = "share";
          } else if (route.name === "Chat") {
            iconName = "comment";
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: config.mainColor,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 60, paddingBottom: 5 },
      })}
    >
      <Tab.Screen
        name="Food"
        component={FoodScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Share"
        component={ShareScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Authentication */}
        <Stack.Group>
          <Stack.Screen
            name="Start"
            options={{ headerShown: false }}
            component={StartScreen}
          />
          <Stack.Screen
            name="Sign Up"
            options={{ headerShown: false }}
            component={SignupScreen}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
        </Stack.Group>
        {/* Mains */}
        <Stack.Screen
          name="Main Tabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        {/* Modals */}
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="Share Form"
            options={{ headerShown: false }}
            component={ShareForm}
          ></Stack.Screen>
          <Stack.Screen name="Chat Room" component={SingleChat} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
