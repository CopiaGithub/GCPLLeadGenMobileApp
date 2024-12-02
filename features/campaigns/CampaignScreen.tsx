import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { RootStackParamList } from "../../types";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { style } from "./CampaignScreenStyle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useIsFocused } from "@react-navigation/native";
import { GetCampaignDataRequest } from "../../services/campaignRequest/GetCampaignDataRequest";
import CDSLoader from "../../component/CDSLoader";
import { ScrollView } from "react-native-gesture-handler";
import React from "react";
import { DisplayToast } from "../../utility/ToastMessage";
import { GetStateNameByID, HandleSearchList } from "./CampaignUtility";
import { GetCampaignMessage } from "../../types/campaignTypes/GetCampaignsTypes";
import { StateRequest } from "../../services/stateRequest/StateRequest";
import moment from "moment";
import CDSImageBG from "../../component/CDSImageBG";

type CampaignScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Campaigns"
>;

const CampaignScreen: React.FC<CampaignScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const { getCampaignData } = useSelector(
    (state: RootState) => state.getCampaignData
  );
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [itemData, setItemData] = useState<Array<GetCampaignMessage>>(
    new Array<GetCampaignMessage>()
  );
  const { states } = useSelector((state: RootState) => state.stateData);
  useEffect(() => {
    if (
      isFocused &&
      getCampaignData &&
      getCampaignData.statusCode == 200 &&
      getCampaignData.message &&
      getCampaignData.message.length
    ) {
      setItemData(getCampaignData.message);
    } else {
      setItemData([]);
    }
  }, [isFocused, getCampaignData?.statusCode]);
  useEffect(() => {
    if (isFocused) {
      dispatch(StateRequest(null));
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(GetCampaignDataRequest({}));

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(GetCampaignDataRequest({}));
    }
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Feather
            name="refresh-ccw"
            size={24}
            style={style.headerIcon}
            onPress={() => {
              dispatch(GetCampaignDataRequest({}));
              DisplayToast("Updating campaign list");
              setSearchTxt("");
            }}
          />
          <Feather
            name="plus"
            size={24}
            style={style.headerIcon}
            onPress={() => {
              props.navigation.navigate("CreateCampaign");
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
          placeholder="Search Campaigns"
          placeholderTextColor={"grey"}
          value={searchTxt}
          onChangeText={(val) =>
            HandleSearchList(
              val,
              getCampaignData,
              setSearchTxt,
              itemData,
              setItemData
            )
          }
        />
      </View>
    );
  };
  const renderItems = () => {
    return (
      <>
        {getCampaignData &&
        getCampaignData.statusCode == 200 &&
        getCampaignData.message.length &&
        itemData.length ? (
          <>
            {itemData.map((item, i) => (
              <View style={style.itemView} key={i}>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Campaign:</Text>
                  <Text style={style.valueText}>{item.campaignName}</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>From Date:</Text>
                  <Text style={style.valueText}>
                    {" "}
                    {moment(item.fromDate, "YYYY-MM-DD").format("DD MMM YYYY")}
                  </Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>To Date:</Text>
                  <Text style={style.valueText}>
                    {moment(item.toDate, "YYYY-MM-DD").format("DD MMM YYYY")}
                  </Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Location:</Text>
                  <Text style={style.valueText}>{item.location}</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>State:</Text>
                  <Text style={style.valueText}>
                    {GetStateNameByID(states, item.stateId)}
                  </Text>
                  <View style={style.extra}></View>
                </View>
                {/* <View style={style.txtView}>
                  <Text style={style.keyText}>District:</Text>
                  <Text style={style.valueText}>Thane</Text>
                  <View style={style.extra}></View>
                </View> */}
                <View style={style.txtView}>
                  <Text style={style.keyText}>Status:</Text>
                  <Text style={style.valueText}>
                    {item.status == true ? "Active" : "InActive"}
                  </Text>
                  <View style={style.extra}></View>
                </View>
              </View>
            ))}
          </>
        ) : getCampaignData && !getCampaignData.message.length ? null : (
          <CDSLoader marginTop={"-50%"} />
        )}
      </>
    );
  };
  return (
    <CDSImageBG
      renderJXX={() => (
        <>
          {renderSearchBar()}
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {renderItems()}
          </ScrollView>
        </>
      )}
    />
  );
};
export default CampaignScreen;
