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
  GetLeadRespMessage,
  GetProductsIntersted,
  GetVisitorDetails,
} from "../../types/leadTypes/GetLeadsTypes";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GetCampaignNameByID, HandleSearchList } from "./LeadScreenUtility";
import CDSLoader from "../../component/CDSLoader";
import {
  GetProductFamNameById,
  GetProductModelNameById,
} from "./stepperScreens/machineDetails/MachineDetailsUtility";
import { ProductFamilyRequest } from "../../services/productFamilyModelRequest/ProductFamilyRequest";
import { GetCampaignDataRequest } from "../../services/campaignRequest/GetCampaignDataRequest";
import { ProductModelRequest } from "../../services/productFamilyModelRequest/ProductModelRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LeadScreenProps = NativeStackScreenProps<RootStackParamList, "Leads">;

const LeadScreen: React.FC<LeadScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  const [searchTxt, setSearchTxt] = useState("");
  const [showCustState, setShowCustState] = useState(false);
  const [showProdState, setShowProdState] = useState(false);
  const [showCustIndex, setShowCustIndex] = useState(0);
  const [showProdIndex, setShowProdIndex] = useState(0);
  const [itemData, setItemData] = useState<Array<GetLeadRespMessage>>(
    new Array<GetLeadRespMessage>()
  );

  const { leadDetails } = useSelector((state: RootState) => state.leadData);
  const [sbuID, setSBUID] = useState(0);
  const [userId, setUserId] = useState(0);
  const [roleId, setRoleId] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        setSBUID(user.message.user.sbuId);
        setUserId(user.message.user.id);
        setRoleId(user.message.user.roleId);
      }
    });
  }, [isFocused, sbuID]);

  useEffect(() => {
    if (isFocused && sbuID && userId) {
      dispatch(
        GetLeadDataRequest({
          subId: roleId && roleId == 1 ? 0 : sbuID,
          userId: (roleId && roleId == 1) || roleId == 4 ? 0 : userId,
        })
      );
    }
  }, [isFocused, sbuID, userId]);

  useEffect(() => {
    if (isFocused && leadDetails?.statusCode == 200) {
      dispatch(
        ProductFamilyRequest(
          leadDetails &&
            leadDetails.statusCode == 200 &&
            leadDetails.message.length
            ? +leadDetails.message[0].sbuId
            : 0
        )
      );
      dispatch(
        ProductModelRequest(
          leadDetails &&
            leadDetails.statusCode == 200 &&
            leadDetails.message.length
            ? +leadDetails.message[0].sbuId
            : 0
        )
      );
      dispatch(GetCampaignDataRequest({}));
    }
  }, [isFocused, leadDetails?.message.length]);
  const { ProductFamily } = useSelector(
    (state: RootState) => state.productFamily
  );
  const { ProductModel } = useSelector(
    (state: RootState) => state.productModel
  );
  const { getCampaignData } = useSelector(
    (state: RootState) => state.getCampaignData
  );
  useEffect(() => {
    if (
      isFocused &&
      leadDetails &&
      leadDetails.statusCode == 200 &&
      leadDetails.message &&
      leadDetails.message.length
    ) {
      setItemData(leadDetails.message);
    } else {
      setItemData([]);
    }
  }, [leadDetails?.statusCode]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Feather
            name="refresh-ccw"
            size={24}
            style={style.headerIcon}
            onPress={() => {
              dispatch(
                GetLeadDataRequest({
                  subId: roleId && roleId == 1 ? 0 : sbuID,
                  userId: (roleId && roleId == 1) || roleId == 4 ? 0 : userId,
                })
              );
              setSearchTxt("");
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
          onChangeText={(val) =>
            HandleSearchList(
              val,
              leadDetails,
              setSearchTxt,
              itemData,
              setItemData
            )
          }
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
              <Text style={style.showMoreRTxt}>
                {GetProductFamNameById(ProductFamily, +item.productFamilyId)}
              </Text>
            </View>
            <View style={style.showMoreView}>
              <Text style={style.showMoreLTxt}>Model:</Text>
              <Text style={style.showMoreRTxt}>
                {GetProductModelNameById(ProductModel, +item.productId)}
              </Text>
            </View>
            <View style={style.showMoreView}>
              <Text style={style.showMoreLTxt}>No of Machines:</Text>
              <Text style={style.showMoreRTxt}>
                {item.noOfMachines ? item.noOfMachines : 0}
              </Text>
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
              <Text style={style.showMoreLTxt}>Contact Name:</Text>
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
        leadDetails.message.length ? (
          <>
            {itemData.map((item, i) => (
              <View style={style.itemView}>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Lead ID:</Text>
                  <Text style={style.valueText}>{item.id}</Text>
                  <View style={style.extra}>
                    <Feather
                      name="edit"
                      size={16}
                      color="black"
                      onPress={() =>
                        props.navigation.navigate("editLeadCustomer", item)
                      }
                    />
                  </View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Company:</Text>
                  <Text style={style.valueText}>{item.companyName}</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Campaign:</Text>
                  <Text style={style.valueText}>
                    {GetCampaignNameByID(getCampaignData, +item.campaignId)}
                  </Text>
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
                  onPress={() => {
                    setShowCustIndex(0);
                    setShowCustState(!showCustState);
                    setShowCustIndex(i);
                  }}
                >
                  <Text style={style.showCustTxt}>Show Contacts</Text>
                  <FontAwesome
                    name={
                      showCustState && showCustIndex == i
                        ? "angle-down"
                        : "angle-up"
                    }
                    size={24}
                    style={style.searchIcon}
                  />
                </TouchableOpacity>
                {showCustState && showProdIndex == i
                  ? renderCustomers(item.visitorDetails)
                  : null}
                <TouchableOpacity
                  style={style.showCustBtnView}
                  onPress={() => {
                    setShowProdIndex(0);
                    setShowProdState(!showProdState);
                    setShowProdIndex(i);
                  }}
                >
                  <Text style={style.showCustTxt}>Show Products</Text>
                  <FontAwesome
                    name={
                      showProdState && showProdIndex == i
                        ? "angle-down"
                        : "angle-up"
                    }
                    size={24}
                    style={style.searchIcon}
                  />
                </TouchableOpacity>

                {showProdState && showProdIndex == i
                  ? renderProducts(item.productsInterested)
                  : null}
              </View>
            ))}
          </>
        ) : leadDetails &&
          leadDetails.statusCode == 200 &&
          leadDetails.message ? (
          <View style={{}}>
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                fontWeight: "500",
                fontSize: 20,
              }}
            >
              No data found!
            </Text>
          </View>
        ) : leadDetails && leadDetails.statusCode != 200 ? (
          <View>
            <Text>{`${leadDetails.message}`}</Text>
          </View>
        ) : (
          <CDSLoader />
        )}
      </>
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      {renderSearchBar()}
      <ScrollView contentContainerStyle={{ paddingBottom: "40%" }}>
        {renderItems()}
      </ScrollView>
    </ImageBackground>
  );
};
export default LeadScreen;
