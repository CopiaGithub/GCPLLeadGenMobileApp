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
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import React from "react";
import CDSDatePicker from "../../component/CDSDatePicker";
import CDSDropDown from "../login/CDSDropDown";
import { SBUMasterRequest } from "../../services/sbuMasterRequest.tsx/SBUMasterRequest";
import { GetSBUMaster } from "./DashboardUtility";
import { ProductTotalRequest } from "../../services/dashboardRequest/ProductTotalRequest";
import CDSLoader from "../../component/CDSLoader";
import { VisitorMasterCountRequest } from "../../services/visitorMasterCountRequest/VisitorMasterCountRequest";
import { DisplayToast } from "../../utility/ToastMessage";
import { FootfallCountRequest } from "../../services/visitorCountRequest/VisitorCountRequest";
import LeadScreen from "../leads/LeadScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type DashboardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Dashboard"
>;

const DashboardScreen: React.FC<DashboardScreenProps> = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const [visitorCount, setVisitorCoint] = useState(0);
  const [footfallCount, setFootfallCount] = useState(0);
  const [userSbuId, setUserSbuId] = useState(0);
  const [campaignName, setCampaignName] = useState("");

  const { leadDetails } = useSelector((state: RootState) => state.leadData);
  const { sbuMaster } = useSelector((state: RootState) => state.sbuMaster);
  const { productTotals } = useSelector(
    (state: RootState) => state.productTotal
  );
  const [menus, setMenus] = useState<Array<string>>(new Array<string>());
  const [roleID, setRoleID] = useState(0);
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: "12%" }}>
          <FontAwesome
            name="user-circle"
            size={28}
            color="white"
            onPress={() => {
              props.navigation.navigate("MyAccount");
            }}
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        setUserSbuId(user.message.user.sbuId);
        setCampaignName(user.message.user.campaignName);
        setMenus(user.message.menus);
        setRoleID(user.message.user.roleId);
        setUserId(user.message.user.id);
      }
    });
  }, [isFocused]);
  //Super Admin(1) 0 0
  //Business Admin(4) -Logged in SBU , 0
  //Business User(2) - Logged In Sbu Logged In userId

  useEffect(() => {
    if (isFocused && userSbuId && userId != 0 && roleID) {
      GetVisitorMasterCount(
        roleID && roleID == 1 ? 0 : userSbuId,
        (roleID && roleID == 1) || roleID == 4 ? 0 : userId
      );
      GetFootfallCount(
        roleID && roleID == 1 ? 0 : userSbuId,
        (roleID && roleID == 1) || roleID == 4 ? 0 : userId
      );
      dispatch(
        ProductTotalRequest({
          sbuID: roleID && roleID == 1 ? 0 : userSbuId,
          userId: (roleID && roleID == 1) || roleID == 4 ? 0 : userId,
        })
      );
    }
  }, [isFocused, userSbuId, roleID]);

  useEffect(() => {
    if (isFocused) {
      dispatch(SBUMasterRequest(null));
    }
  }, [isFocused]);

  const GetVisitorMasterCount = async (sbuID: number, Id: number) => {
    const count = await VisitorMasterCountRequest(sbuID, Id);
    setVisitorCoint(count ? count.totalVisitorDetails : 0);
  };
  const GetFootfallCount = async (sbuID: number, Id: number) => {
    const count = await FootfallCountRequest(sbuID, Id);
    setFootfallCount(count ? count.totalVisitorDetails : 0);
  };

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

  const renderCampaignName = () => {
    return (
      <View style={style.headerNameView}>
        <Text style={style.headerTxtValue}>Campaign Name:</Text>
        <Text style={style.headerTxtKey}>
          {campaignName ? campaignName : null}
        </Text>
      </View>
    );
  };
  const dashboardMenuArray = [
    {
      id: 1,
      label: "Leads",
      navigateTo: "Leads",
      image: require("../../assets/leads.png"),
    },
    {
      id: 2,
      label: "Campaign",
      navigateTo: "Campaigns",
      image: require("../../assets/campaign.png"),
    },
    {
      id: 3,
      label: "Users",
      navigateTo: "Users",
      image: require("../../assets/users.png"),
    },
    {
      id: 4,
      label: "Approvals",
      navigateTo: "Approvals",
      image: require("../../assets/approve.png"),
    },
    {
      id: 5,
      label: "Gifts",
      navigateTo: "Gifts",
      image: require("../../assets/gift.png"),
    },
    {
      id: 6,
      label: "Reports",
      navigateTo: "Reports",
      image: require("../../assets/report.png"),
    },
  ];
  const filterMenu = dashboardMenuArray.filter((item) =>
    menus.includes(item.label)
  );
  const renderHorizontalMenus = () => {
    return (
      <View style={style.hmView}>
        <ScrollView horizontal contentContainerStyle={{ paddingRight: "50%" }}>
          {/* Leads */}
          {filterMenu.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={style.menuItemView}
              onPress={() => {
                props.navigation.navigate(item.navigateTo as any);
              }}
            >
              <Image
                source={item.image}
                style={{ width: 40, height: 40, alignSelf: "center" }}
              />
              <Text style={style.menuTxt}>{item.label}</Text>
            </TouchableOpacity>
          ))}
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
            <Text style={style.countTxt}>{visitorCount}</Text>
          </View>
          <View style={style.subCBBox}>
            <Text style={style.countLabel}>Footfall</Text>
            <Text style={style.countTxt}>{footfallCount}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderModelDetails = () => {
    return (
      <View style={style.tableView}>
        <View style={style.tbHeaderView}>
          <Text style={style.tbHeaderLeftText}>SBU/Brand</Text>
          <Text style={style.tbHeaderCenterText}>Model</Text>
          <Text style={style.tbHeaderRightText}>No of Machines</Text>
        </View>
        <>
          {productTotals &&
          productTotals.statusCode == 200 &&
          productTotals.message.length ? (
            <>
              {productTotals.message.map((item, i) => (
                <View style={style.tbHeaderView}>
                  <Text style={style.tbLeftText}>{item.sbuName}</Text>
                  <Text style={style.tbCenterText}>{item.productName}</Text>
                  <Text style={style.tbRightText}>{item.totalQuantity}</Text>
                </View>
              ))}
            </>
          ) : productTotals &&
            productTotals.statusCode == 200 &&
            !productTotals.message.length ? (
            <View>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 22,
                  textAlign: "center",
                  textAlignVertical: "center",
                  margin: "4%",
                }}
              >
                No products found!
              </Text>
            </View>
          ) : productTotals && productTotals.statusCode != 200 ? (
            <View>
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 24,
                  textAlign: "center",
                  textAlignVertical: "center",
                }}
              >{`${productTotals.message}`}</Text>
            </View>
          ) : (
            <CDSLoader marginTop={"20%"} />
          )}
        </>
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
      <ScrollView>
        {roleID && roleID == 1 ? (
          <View
            style={{
              marginTop: "4%",
              marginHorizontal: "2%",
            }}
          >
            <CDSDropDown
              data={GetSBUMaster(sbuMaster, roleID)}
              onSelect={(val) => {
                if (val && val.value) {
                  GetVisitorMasterCount(
                    +val.value,
                    roleID && roleID == 1 ? 0 : userId
                  );
                  GetFootfallCount(
                    +val.value,
                    roleID && roleID == 1 ? 0 : userId
                  );
                  dispatch(
                    ProductTotalRequest({
                      sbuID: +val.value,
                      userId: roleID && roleID == 1 ? 0 : userId,
                    })
                  );
                }
              }}
              placeholder="Select Brand"
            />
          </View>
        ) : null}

        {renderCountBox()}
        {renderModelDetails()}
      </ScrollView>
    </ImageBackground>
  );
};
export default DashboardScreen;
