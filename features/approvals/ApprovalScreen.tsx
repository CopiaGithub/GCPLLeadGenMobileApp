import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../../types";
import { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { style } from "./ApprovalScreenStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

type ApprovalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Approvals"
>;

const ApprovalScreen: React.FC<ApprovalScreenProps> = (props) => {
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
          placeholder="Search Approvals"
          placeholderTextColor={"grey"}
        />
      </View>
    );
  };
  const renderButtons = () => {
    return (
      <View style={style.btnsView}>
        <TouchableOpacity style={style.approveBtn}>
          <Text style={style.approveBtnTxt}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.rejectBtn}>
          <Text style={style.rejectBtnTxt}>Reject</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItems = () => {
    return (
      <>
        <View style={style.itemView}>
          <View style={style.txtView}>
            <Text style={style.keyText}>Name:</Text>
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
            <Text style={style.keyText}>Mobile:</Text>
            <Text style={style.valueText}>+91 9999999999</Text>
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>Organization:</Text>
            <Text style={style.valueText}>Caterpillar</Text>
            <View style={style.extra}></View>
          </View>
          <View style={style.txtView}>
            <Text style={style.keyText}>Role:</Text>
            <Text style={style.valueText}>Super Admin</Text>
            <View style={style.extra}></View>
          </View>
          {renderButtons()}
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
      {renderItems()}
    </ImageBackground>
  );
};
export default ApprovalScreen;
