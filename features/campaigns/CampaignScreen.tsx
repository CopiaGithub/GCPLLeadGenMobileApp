import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
} from "react-native";
import { RootStackParamList } from "../../types";
import { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { style } from "./CampaignScreenStyle";

type CampaignScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Campaigns"
>;

const CampaignScreen: React.FC<CampaignScreenProps> = (props) => {
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
        />
      </View>
    );
  };
  const renderItems = () => {
    return (
      <>
        <View style={style.itemView}>
          <View style={style.txtView}>
            <Text style={style.keyText}>Campaign:</Text>
            <Text style={style.valueText}>Exibhition Admin</Text>
            {/* <FontAwesome5
              name="pencil-alt"
              size={16}
              color="black"
              style={style.extra}
              onPress={() => {
                props.navigation.navigate("CreateUser", { operation: "1" });
              }}
            /> */}
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>From Date:</Text>
            <Text style={style.valueText}>01 Nov 2024</Text>
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>To Date:</Text>
            <Text style={style.valueText}>25 Nov 2024</Text>
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
            <Text style={style.valueText}>Active</Text>
            <View style={style.extra}></View>
          </View>
        </View>
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
