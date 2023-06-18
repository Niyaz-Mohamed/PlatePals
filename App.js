// Import modules
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Import components/globals
import { LoginScreen, SignupScreen } from "./components/AuthScreens";

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          {/* Add auth app screens here */}
          <RootStack.Screen
            name="Signup"
            options={{ headerShown: false }}
            component={SignupScreen}
          />
          <RootStack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={LoginScreen}
          />
        </RootStack.Group>
        <RootStack.Group>{/* Add main app screens here */}</RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          {/* Add modals here */}
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
