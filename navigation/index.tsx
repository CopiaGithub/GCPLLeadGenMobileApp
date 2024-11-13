import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ColorSchemeName, StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import LinkingConfiguration from "./LinkingConfiguration";
import { RootStackParamList } from "../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../features/splashScreen/SplashScreen";
import { APP_THEME_COLOR, STATUS_BAR_COLOR } from "../constants/Colors";
import LoginScreen from "../features/login/LoginScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <RootSiblingParent>
      <NavigationContainer linking={LinkingConfiguration}>
        <RootNavigator />
        <StatusBar
          backgroundColor={STATUS_BAR_COLOR}
          barStyle={"light-content"}
        />
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitleStyle: { color: "black" },
          headerTitle: "Login",
          headerTintColor: "white",
          headerBackVisible: false,
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
    </Stack.Navigator>
  );
}
