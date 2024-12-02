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
import { GetLeadDataRequest } from "../../services/leadsServices/GetLeadDataRequest";
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

import { checkInternetConnection } from "../../utility/NetInfo";
import CDSImageBG from "../../component/CDSImageBG";

type DashboardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Dashboard"
>;

const DashboardScreen: React.FC<DashboardScreenProps> = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const [visitorCount, setVisitorCoint] = useState(0);
  useEffect(() => {
    if (isFocused) {
      dispatch(GetLeadDataRequest(""));
      dispatch(SBUMasterRequest(null));
      dispatch(ProductTotalRequest(""));
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      GetVisitorMasterCount();
    }
  }, [isFocused, visitorCount]);

  const GetVisitorMasterCount = async () => {
    const count = await VisitorMasterCountRequest(1);
    setVisitorCoint(count ? count.totalVisitorDetails : 0);
  };

  const { leadDetails } = useSelector((state: RootState) => state.leadData);
  const { sbuMaster } = useSelector((state: RootState) => state.sbuMaster);
  const { productTotals } = useSelector(
    (state: RootState) => state.productTotal
  );

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
            <Text style={style.countTxt}>{visitorCount}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderModelDetails = () => {
    return (
      <View style={style.tableView}>
        <View style={style.tbHeaderView}>
          <Text style={style.tbHeaderLeftText}>Model</Text>
          <Text style={style.tbHeaderRightText}>No of Machines</Text>
        </View>
        <>
          {productTotals &&
          productTotals.statusCode == 200 &&
          productTotals.message.length ? (
            <>
              {productTotals.message.map((item, i) => (
                <View style={style.tbHeaderView}>
                  <Text style={style.tbLeftText}>{item.productName}</Text>
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
                  fontSize: 24,
                  textAlign: "center",
                  textAlignVertical: "center",
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
    <CDSImageBG
      renderJXX={() => (
        <>
          {renderHorizontalMenus()}
          {renderCampaignName()}
          <View
            style={{
              marginTop: "4%",
              marginHorizontal: "2%",
            }}
          >
            <CDSDropDown
              data={GetSBUMaster(sbuMaster)}
              onSelect={() => {}}
              placeholder="Select SBU"
            />
          </View>
          {renderCountBox()}
          {renderModelDetails()}
        </>
      )}
    ></CDSImageBG>
  );
};
export default DashboardScreen;
