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
import RegisterScreen from "../features/register/RegisterScreen";
import DashboardScreen from "../features/dashboard/DashboardScreen";
import DashboardDrawer from "../features/drawer/DashboardDrawer";
import ForgotPasswordScreen from "../features/forgotPassword/ForgotPasswordScreen";
import LeadScreen from "../features/leads/LeadScreen";
import UserScreen from "../features/user/UserScreen";
import ApprovalScreen from "../features/approvals/ApprovalScreen";
import CampaignScreen from "../features/campaigns/CampaignScreen";
import GiftScreen from "../features/gifts/GiftsScreen";
import ReportScreen from "../features/reports/ReportScreen";
import CreateUserScreen from "../features/user/CreateUserScreen";
import CreateCampaignScreen from "../features/campaigns/CreateCamaign";
import CustomerCreateOptionsScreen from "../features/leads/customerCreateOptions/CustomerCreateOption";
import AddMachineDetailsScreen from "../features/leads/machineDetails/AddMachineDetails";

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
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
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
          headerTitle: "Login",
          headerTintColor: "white",
          headerBackVisible: false,
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "Register",
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitleStyle: { color: "white" },
          headerBackVisible: false,
          // gestureDirection: "vertical",
        }}
      />
      <Stack.Screen
        name="DashboardDrawer"
        component={DashboardDrawer}
        options={{
          headerShown: false,
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "Forgot Password",
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Leads"
        component={LeadScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "Leads",

          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="CustomerCreateOption"
        component={CustomerCreateOptionsScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "Add Customer",
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="AddMachineDetails"
        component={AddMachineDetailsScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "Add Machine Details",
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Users"
        component={UserScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "User",
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUserScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "Create New User",
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Approvals"
        component={ApprovalScreen}
        options={{
          title: "Registration Approval",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Campaigns"
        component={CampaignScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "Campaigns",
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="CreateCampaign"
        component={CreateCampaignScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "Create New Campaign",
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Gifts"
        component={GiftScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "Gifts",
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Reports"
        component={ReportScreen}
        options={{
          title: "",
          headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
          headerTitle: "Reports",
          headerTintColor: "black",
          gestureEnabled: false,
          gestureDirection: "horizontal",
        }}
      />
    </Stack.Navigator>
  );
}
