import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../../types";
import style from "./RegisterStyle";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import { APP_THEME_COLOR } from "../../constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import CdsPicker from "../../component/CDSPicker";
import { DisplayToast } from "../../utility/ToastMessage";
import CDSAlertBox from "../../component/CDSAlertBox";

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

const RegisterScreen: React.FC<RegisterScreenProps> = (props) => {
  const icon = () => {
    return (
      <View style={style.iconView}>
        <View style={{ flexDirection: "row" }}>
          <Text style={style.txtOne}>GCPL</Text>
          <Text style={style.txtSymbol}>®</Text>
        </View>
        <Text style={style.txtTwo}>LEAD</Text>
        <Text style={style.txtThree}>GEN</Text>
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <>
        {icon()}
        <Text style={style.createAcc}>Create Account</Text>
      </>
    );
  };
  const renderResgisterBox = () => {
    return (
      <View style={style.registerBoxView}>
        {/* Name */}
        <View style={style.txView}>
          <FontAwesome5 name="user-alt" size={18} style={style.leftIcon} />
          <TextInput placeholder="Name*" style={style.txtInput} />
        </View>
        {/* Mobile Number */}
        <View style={style.txView}>
          <Foundation name="telephone" size={22} style={style.leftIcon} />
          <TextInput placeholder="Mobile Number*" style={style.txtInput} />
        </View>
        {/* Organization */}
        <View style={[style.txView, { padding: "2%" }]}>
          <SimpleLineIcons
            name="organization"
            size={24}
            style={style.leftIcon}
          />
          <View style={style.txtInput} />
          <CdsPicker
            pickerData={[
              { label: "One", value: "1" },
              { label: "Two", value: "2" },
              { label: "Two", value: "3" },
            ]}
            value="1"
            onChange={(val) => {
              if (val && val.label) {
                DisplayToast(val.label);
              }
            }}
            pickerWidth={"80%"}
            isDisable={false}
          />
        </View>

        {/* Email */}
        <View style={style.txView}>
          <Fontisto name="email" size={22} style={style.leftIcon} />
          <TextInput placeholder="Email*" style={style.txtInput} />
        </View>
        {/* Location */}
        <View style={style.txView}>
          <MaterialIcons name="my-location" size={24} style={style.leftIcon} />
          <TextInput placeholder="Location*" style={style.txtInput} />
        </View>
        {/* Password */}
        <View style={style.txView}>
          <AntDesign name="lock" size={24} style={style.leftIcon} />
          <TextInput placeholder="Password*" style={style.txtInput} />
        </View>
        {/* Confirm Password */}
        <View style={style.txView}>
          <AntDesign name="lock" size={24} style={style.leftIcon} />
          <TextInput placeholder="Confirm Password*" style={style.txtInput} />
        </View>
      </View>
    );
  };
  const renderSignUpBtn = () => {
    return (
      <TouchableOpacity style={style.signUpBtnView}>
        <Text style={style.signUpBtnTxt}>Signup</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <CDSAlertBox
          alertVisibility={false}
          alertTitle="Register"
          alertDesc="User registerd successfully!"
          showNegativeBtn={true}
          positiveBtnTxt="Cancel"
          negativeBtnTxt="Ok"
          onNegativeClick={() => {
            DisplayToast("Negative");
          }}
          onPositiveClick={() => {
            DisplayToast("Positive");
          }}
        />
        {renderHeader()}
        {renderResgisterBox()}
        {renderSignUpBtn()}
      </ScrollView>
    </ImageBackground>
  );
};
export default RegisterScreen;
