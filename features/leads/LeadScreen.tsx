import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../../types";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { style } from "./LeadScreenStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useIsFocused } from "@react-navigation/native";
import { GetLeadDataRequest } from "../../services/leadsServices/GetLeadDataRequest";
import moment from "moment";
import {
  GetProductsIntersted,
  GetVisitorDetails,
} from "../../types/leadTypes/GetLeadsTypes";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type LeadScreenProps = NativeStackScreenProps<RootStackParamList, "Leads">;

const LeadScreen: React.FC<LeadScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const { leadDetails } = useSelector((state: RootState) => state.leadData);

  const [showCustState, setShowCustState] = useState(false);
  const [showProdState, setShowProdState] = useState(false);
  useEffect(() => {
    if (isFocused) {
      dispatch(GetLeadDataRequest(""));
    }
  }, [isFocused]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Feather
            name="refresh-ccw"
            size={24}
            style={style.headerIcon}
            onPress={() => {
              dispatch(GetLeadDataRequest(""));
            }}
          />
          <Feather
            name="plus"
            size={24}
            style={style.headerIcon}
            onPress={() => {
              props.navigation.navigate("CreateLead");
            }}
          />
        </View>
      ),
    });
  }, []);
  const renderSearchBar = () => {
    return (
      <View style={style.searchView}>
        <Ionicons
          name="search-sharp"
          size={24}
          color="black"
          style={style.searchIcon}
        />
        <TextInput
          style={style.searchTxtInput}
          placeholder="Search Leads"
          placeholderTextColor={"grey"}
        />
      </View>
    );
  };
  const renderProducts = (productsInterested: GetProductsIntersted[]) => {
    return (
      <>
        {productsInterested.map((item, i) => (
          <View style={style.showMoreParentView} key={i}>
            <View style={style.showMoreView}>
              <Text style={style.showMoreLTxt}>Product Family:</Text>
              <Text style={style.showMoreRTxt}>{item.productFamilyId}</Text>
            </View>
            <View style={style.showMoreView}>
              <Text style={style.showMoreLTxt}>Model:</Text>
              <Text style={style.showMoreRTxt}>{item.modelId}</Text>
            </View>
            <View style={style.showMoreView}>
              <Text style={style.showMoreLTxt}>No of Machines:</Text>
              <Text style={style.showMoreRTxt}>{item.noOfMachines}</Text>
            </View>
          </View>
        ))}
      </>
    );
  };
  const renderCustomers = (visitorDetails: GetVisitorDetails[]) => {
    return (
      <>
        {visitorDetails.map((item, i) => (
          <View style={style.showMoreParentView} key={i}>
            <View style={style.showMoreView}>
              <Text style={style.showMoreLTxt}>Customer Name:</Text>
              <Text style={style.showMoreRTxt}>{item.visitorName}</Text>
            </View>
            <View style={style.showMoreView}>
              <Text style={style.showMoreLTxt}>Email ID:</Text>
              <Text style={style.showMoreRTxt}>{item.email}</Text>
            </View>
            <View style={style.showMoreView}>
              <Text style={style.showMoreLTxt}>Mobile No:</Text>
              <Text style={style.showMoreRTxt}>{item.mobileNo}</Text>
            </View>
          </View>
        ))}
      </>
    );
  };
  const renderItems = () => {
    return (
      <>
        {leadDetails &&
        leadDetails.statusCode == 200 &&
        leadDetails.message &&
        leadDetails.message.length ? (
          <>
            {leadDetails.message.map((item, i) => (
              <View style={style.itemView}>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Lead ID:</Text>
                  <Text style={style.valueText}>{item.id}</Text>
                  <View style={style.extra}></View>
                  {/* <FontAwesome5
                    name="gifts"
                    size={16}
                    color="black"
                    style={style.extra}
                    onPress={() => {
                      props.navigation.navigate("CreateUser", {
                        operation: "1",
                      });
                    }}
                  /> */}
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Company:</Text>
                  <Text style={style.valueText}>{item.companyName}</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Campaign:</Text>
                  <Text style={style.valueText}>{item.campaignId}</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Date:</Text>
                  <Text style={style.valueText}>
                    {moment(item.createdOn).format("DD MMM YYYY")}
                  </Text>
                  <View style={style.extra}></View>
                </View>
                <TouchableOpacity
                  style={style.showCustBtnView}
                  onPress={() => setShowCustState(!showCustState)}
                >
                  <Text style={style.showCustTxt}>Show Customers</Text>
                  <FontAwesome
                    name={!showCustState ? "angle-up" : "angle-down"}
                    size={24}
                    style={style.searchIcon}
                  />
                </TouchableOpacity>
                {showCustState ? renderCustomers(item.visitorDetails) : null}
                <TouchableOpacity
                  style={style.showCustBtnView}
                  onPress={() => setShowProdState(!showProdState)}
                >
                  <Text style={style.showCustTxt}>Show Products</Text>
                  <FontAwesome
                    name={!showProdState ? "angle-up" : "angle-down"}
                    size={24}
                    style={style.searchIcon}
                  />
                </TouchableOpacity>

                {showProdState ? renderProducts(item.productsInterested) : null}
              </View>
            ))}
          </>
        ) : null}
      </>
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      {renderSearchBar()}
      <ScrollView>{renderItems()}</ScrollView>
    </ImageBackground>
  );
};
export default LeadScreen;
