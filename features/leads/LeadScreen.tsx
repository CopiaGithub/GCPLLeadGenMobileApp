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
import { style } from "./LeadScreenStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type LeadScreenProps = NativeStackScreenProps<RootStackParamList, "Leads">;

const LeadScreen: React.FC<LeadScreenProps> = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Feather
          name="plus"
          size={24}
          style={style.headerIcon}
          onPress={() => {
            props.navigation.navigate("CustomerCreateOption");
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
          placeholder="Search Leads"
          placeholderTextColor={"grey"}
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
            <FontAwesome5
              name="gifts"
              size={16}
              color="black"
              style={style.extra}
              onPress={() => {
                props.navigation.navigate("CreateUser", { operation: "1" });
              }}
            />
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>Customer:</Text>
            <Text style={style.valueText}>Test Customer</Text>
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>Lead ID:</Text>
            <Text style={style.valueText}>123456</Text>
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>Date:</Text>
            <Text style={style.valueText}>08 Nov 2024</Text>
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
export default LeadScreen;
