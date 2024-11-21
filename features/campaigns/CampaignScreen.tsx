import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { RootStackParamList } from "../../types";
import { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { style } from "./CampaignScreenStyle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useIsFocused } from "@react-navigation/native";
import { GetCampaignDataRequest } from "../../services/campaignRequest/GetCampaignDataRequest";
import CDSLoader from "../../component/CDSLoader";

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

  useEffect(() => {
    if (isFocused) {
      dispatch(GetCampaignDataRequest({}));
    }
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Feather
          name="plus"
          size={24}
          style={style.headerIcon}
          onPress={() => {
            props.navigation.navigate("CreateCampaign");
          }}
        />
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
        />
      </View>
    );
  };
  const renderItems = () => {
    return (
      <>
        {getCampaignData && getCampaignData.length ? (
          <>
            {getCampaignData.map((item, i) => (
              <View style={style.itemView} key={i}>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Campaign:</Text>
                  <Text style={style.valueText}>{item.campaignName}</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>From Date:</Text>
                  <Text style={style.valueText}>{item.fromDate}</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>To Date:</Text>
                  <Text style={style.valueText}>{item.toDate}</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Location:</Text>
                  <Text style={style.valueText}>Mumbai</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>State:</Text>
                  <Text style={style.valueText}>Maharashtra</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>District:</Text>
                  <Text style={style.valueText}>Thane</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Status:</Text>
                  <Text style={style.valueText}>{item.status}</Text>
                  <View style={style.extra}></View>
                </View>
              </View>
            ))}
          </>
        ) : getCampaignData && !getCampaignData.length ? null : (
          <CDSLoader marginTop={"-50%"} />
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
      {renderItems()}
    </ImageBackground>
  );
};
export default CampaignScreen;
