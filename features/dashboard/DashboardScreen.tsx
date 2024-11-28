import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import { RootStackParamList } from "../../types";
import { style } from "./DashboardScreenStyle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetLeadDataRequest } from "../../services/leadsServices/GetLeadDataRequest";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import React from "react";
import CDSDatePicker from "../../component/CDSDatePicker";
import CDSDropDown from "../login/CDSDropDown";

type DashboardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Dashboard"
>;

const DashboardScreen: React.FC<DashboardScreenProps> = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isFocused) {
      dispatch(GetLeadDataRequest(""));
    }
  }, [isFocused]);
  const { leadDetails } = useSelector((state: RootState) => state.leadData);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "Are you sure you want to logout?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              AsyncStorage.removeItem("@userData").then(() => {});
              props.navigation.navigate("Login");
            },
          },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        console.warn(res);
      }
    });
  }, [isFocused]);
  const renderCampaignName = () => {
    return (
      <View style={style.headerNameView}>
        <Text style={style.headerTxtValue}>Campaign Name:</Text>
        <Text style={style.headerTxtKey}>Campaign ABCD</Text>
      </View>
    );
  };
  const renderHorizontalMenus = () => {
    return (
      <View style={style.hmView}>
        <ScrollView horizontal contentContainerStyle={{ paddingRight: "50%" }}>
          {/* Leads */}
          <TouchableOpacity
            style={style.menuItemView}
            onPress={() => {
              props.navigation.navigate("Leads");
            }}
          >
            <Image
              source={require("../../assets/leads.png")}
              style={{ width: 40, height: 40, alignSelf: "center" }}
            />
            <Text style={style.menuTxt}>Leads</Text>
          </TouchableOpacity>
          {/* Campaign */}
          <TouchableOpacity
            style={style.menuItemView}
            onPress={() => {
              props.navigation.navigate("Campaigns");
            }}
          >
            <Image
              source={require("../../assets/campaign.png")}
              style={{ width: 40, height: 40, alignSelf: "center" }}
            />
            <Text style={style.menuTxt}>Campaign</Text>
          </TouchableOpacity>
          {/* Users */}
          <TouchableOpacity
            style={style.menuItemView}
            onPress={() => {
              props.navigation.navigate("Users");
            }}
          >
            <Image
              source={require("../../assets/users.png")}
              style={{ width: 40, height: 40, alignSelf: "center" }}
            />
            <Text style={style.menuTxt}>Users</Text>
          </TouchableOpacity>
          {/* Approvals */}
          <TouchableOpacity
            style={style.menuItemView}
            onPress={() => {
              props.navigation.navigate("Approvals");
            }}
          >
            <Image
              source={require("../../assets/approve.png")}
              style={{ width: 40, height: 40, alignSelf: "center" }}
            />
            <Text style={style.menuTxt}>Approvals</Text>
          </TouchableOpacity>
          {/* Gifts */}
          <TouchableOpacity
            style={style.menuItemView}
            onPress={() => {
              props.navigation.navigate("Gifts");
            }}
          >
            <Image
              source={require("../../assets/gift.png")}
              style={{ width: 40, height: 40, alignSelf: "center" }}
            />
            <Text style={style.menuTxt}>Gifts</Text>
          </TouchableOpacity>
          {/* Reports */}
          <TouchableOpacity
            style={style.menuItemView}
            onPress={() => {
              props.navigation.navigate("Reports");
            }}
          >
            <Image
              source={require("../../assets/report.png")}
              style={{ width: 40, height: 40, alignSelf: "center" }}
            />
            <Text style={style.menuTxt}>Reports</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  const renderCountBox = () => {
    return (
      <View style={style.countBox}>
        <Text style={style.cbText}>Details</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={style.subCBBox}>
            <Text style={style.countLabel}>No. of Leads</Text>
            <Text style={style.countTxt}>
              {leadDetails &&
              leadDetails.statusCode == 200 &&
              leadDetails.message.length
                ? leadDetails.message.length
                : 0}
            </Text>
          </View>
          <View style={style.subCBBox}>
            <Text style={style.countLabel}>Footfall</Text>
            <Text style={style.countTxt}>100</Text>
          </View>
        </View>
      </View>
    );
  };
  const data = [
    {
      id: "1",
      name: "424",
      no: "2",
    },
    {
      id: "2",
      name: "2021",
      no: "4",
    },
    {
      id: "3",
      name: "D5",
      no: "8",
    },
    {
      id: "4",
      name: "320D SERIES 2",
      no: "10",
    },
    {
      id: "5",
      name: "329D",
      no: "12",
    },
    {
      id: "6",
      name: "336D",
      no: "14",
    },
  ];
  const renderModelDetails = () => {
    return (
      <View style={style.tableView}>
        <View style={style.tbHeaderView}>
          <Text style={style.tbHeaderLeftText}>Model</Text>
          <Text style={style.tbHeaderRightText}>No of Machines</Text>
        </View>
        {data.map((item, i) => (
          <View style={style.tbHeaderView}>
            <Text style={style.tbLeftText}>{item.name}</Text>
            <Text style={style.tbRightText}>{item.no}</Text>
          </View>
        ))}
      </View>
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      {renderHorizontalMenus()}
      {renderCampaignName()}
      <View
        style={{
          marginTop: "4%",
          marginHorizontal: "2%",
        }}
      >
        <CDSDropDown
          data={[{ label: "", value: "" }]}
          onSelect={() => {}}
          placeholder="Select SBU"
        />
      </View>
      {renderCountBox()}
      {renderModelDetails()}
    </ImageBackground>
  );
};
export default DashboardScreen;
