import React, { useEffect, useState } from "react";

import "react-native-gesture-handler";

import {
  StyleSheet,
  Image,
  Platform,
  Linking,
  ActivityIndicator,
} from "react-native";
import { EventArg } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../dashboard/DashboardScreen";
import CustomDrawer from "./CustomDrawer";
import { APP_THEME_COLOR } from "../../constants/Colors";
import LeadScreen from "../leads/LeadScreen";
import CampaignScreen from "../campaigns/CampaignScreen";
import UserScreen from "../user/UserScreen";
import ApprovalScreen from "../approvals/ApprovalScreen";
import ReportScreen from "../reports/ReportScreen";
import GiftScreen from "../gifts/GiftsScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

const CdsDrawer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUserId] = useState("");
  const [roleID, setRoleID] = useState("");
  const [isattendance, setattendance] = useState("");
  const [employeeTypeName, setEmployeeTypeName] = useState("");

  const [employeeCode, setEmployeeCode] = useState("");
  const [accessModule, setAcceessModule] = useState<Array<String>>(
    new Array<String>()
  );

  const [isLoading, setIsLoading] = useState(false);

  function renderDrawerScreen() {
    return (
      <>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
        >
          <Drawer.Screen
            name="Dashboard"
            component={DashboardScreen as any}
            options={{
              drawerLabel: "Dashboard",
              drawerLabelStyle: styles.dLabels,
              headerTintColor: "black",
              headerTitle: "Dashboard",
              headerTitleStyle: { color: "black" },
              drawerActiveTintColor: "black",
              headerStyle: {
                backgroundColor: `${APP_THEME_COLOR}`,
              },

              drawerIcon: () => (
                <Image
                  source={require("../../assets/dashboard.png")}
                  style={styles.imageStyle}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Leads"
            component={LeadScreen as any}
            options={{
              drawerLabel: "Leads",
              drawerLabelStyle: styles.dLabels,
              headerTintColor: "black",
              headerTitle: "Leads",
              headerTitleStyle: { color: "black" },
              headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },
              drawerActiveTintColor: "black",
              drawerIcon: () => (
                <Image
                  source={require("../../assets/leads.png")}
                  style={styles.imageStyle}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Campaigns"
            component={CampaignScreen as any}
            options={{
              drawerLabel: "Campaigns",
              drawerLabelStyle: styles.dLabels,
              headerTintColor: "black",
              headerTitle: "Campaigns",
              headerTitleStyle: { color: "black" },
              drawerActiveTintColor: "black",
              headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },

              drawerIcon: () => (
                <Image
                  source={require("../../assets/campaign.png")}
                  style={styles.imageStyle}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Users"
            component={UserScreen as any}
            options={{
              drawerLabel: "Users",
              drawerLabelStyle: styles.dLabels,
              headerTintColor: "black",
              headerTitle: "Users",
              headerTitleStyle: { color: "black" },
              drawerActiveTintColor: "black",
              headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },

              drawerIcon: () => (
                <Image
                  source={require("../../assets/users.png")}
                  style={styles.imageStyle}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Approvals"
            component={ApprovalScreen as any}
            options={{
              drawerLabel: "Approvals",
              drawerLabelStyle: styles.dLabels,
              headerTintColor: "black",
              headerTitle: "Approvals",
              headerTitleStyle: { color: "black" },
              drawerActiveTintColor: "black",
              headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },

              drawerIcon: () => (
                <Image
                  source={require("../../assets/approve.png")}
                  style={styles.imageStyle}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Gifts"
            component={GiftScreen as any}
            options={{
              drawerLabel: "Gifts",
              drawerLabelStyle: styles.dLabels,
              headerTintColor: "black",
              headerTitle: "Gifts",
              headerTitleStyle: { color: "black" },
              drawerActiveTintColor: "black",
              headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },

              drawerIcon: () => (
                <Image
                  source={require("../../assets/gift.png")}
                  style={styles.imageStyle}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Reports"
            component={ReportScreen as any}
            options={{
              drawerLabel: "Reports",
              drawerLabelStyle: styles.dLabels,
              headerTintColor: "black",
              headerTitle: "Reports",
              headerTitleStyle: { color: "black" },
              drawerActiveTintColor: "black",
              headerStyle: { backgroundColor: `${APP_THEME_COLOR}` },

              drawerIcon: () => (
                <Image
                  source={require("../../assets/report.png")}
                  style={styles.imageStyle}
                />
              ),
            }}
          />
        </Drawer.Navigator>
      </>
    );
  }

  //return isLoading ? renderDrawerScreen() : <ActivityIndicator />;
  return renderDrawerScreen();
};

export default CdsDrawer;
const styles = StyleSheet.create({
  imageStyle: {
    width: 30,
    height: 30,
  },
  dLabels: {
    fontSize: 14,
  },
  gainwellSym: {
    marginTop: 30,
    height: 30,
    width: 100,
    fontSize: 100,
  },
});
