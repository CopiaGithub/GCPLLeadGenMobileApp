import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useIsFocused } from "@react-navigation/native";
import { OrganizationRequest } from "../../services/organizationRequest/OrganizationRequest";
import { GetOrgData } from "./RegisterUtility";
import { CdsPickerModel } from "../../types/CdsPickerModel";

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

const RegisterScreen: React.FC<RegisterScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const { orgData } = useSelector((state: RootState) => state.orgnizationData);
  const [alertState, setAlertState] = useState(false);

  useEffect(() => {
    if (isFocused) {
      dispatch(OrganizationRequest());
    }
  }, [isFocused]);

  const respData: CdsPickerModel[] = [];
  if (orgData) {
    for (let i = 0; i < orgData.length; i++) {
      respData.push({
        label: orgData[i].orgName,
        value: orgData[i].id,
      });
    }
  }
  console.error(respData);
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
          <TextInput
            placeholder="Name*"
            style={style.txtInput}
            placeholderTextColor={"grey"}
          />
        </View>
        {/* Mobile Number */}
        <View style={style.txView}>
          <Foundation name="telephone" size={22} style={style.leftIcon} />
          <TextInput
            placeholder="Mobile Number*"
            style={style.txtInput}
            placeholderTextColor={"grey"}
          />
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
            pickerData={GetOrgData(orgData)}
            value="1"
            onChange={(val) => {
              if (val && val.label) {
              }
            }}
            pickerWidth={"80%"}
            isDisable={false}
          />
        </View>

        {/* Email */}
        <View style={style.txView}>
          <Fontisto name="email" size={22} style={style.leftIcon} />
          <TextInput
            placeholder="Email*"
            style={style.txtInput}
            placeholderTextColor={"grey"}
          />
        </View>
        {/* Location */}
        <View style={style.txView}>
          <MaterialIcons name="my-location" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Location*"
            style={style.txtInput}
            placeholderTextColor={"grey"}
          />
        </View>
        {/* Password */}
        <View style={style.txView}>
          <AntDesign name="lock" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Password*"
            style={style.txtInput}
            placeholderTextColor={"grey"}
          />
        </View>
        {/* Confirm Password */}
        <View style={style.txView}>
          <AntDesign name="lock" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Confirm Password*"
            style={style.txtInput}
            placeholderTextColor={"grey"}
          />
        </View>
      </View>
    );
  };
  const renderSignUpBtn = () => {
    return (
      <TouchableOpacity
        style={style.signUpBtnView}
        onPress={() => {
          setAlertState(true);
        }}
      >
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
          alertVisibility={alertState}
          alertTitle="Register"
          alertDesc="User registerd successfully!"
          showNegativeBtn={false}
          positiveBtnTxt="Cancel"
          negativeBtnTxt="Ok"
          onNegativeClick={() => {
            setAlertState(false);
          }}
          onPositiveClick={() => {
            setAlertState(false);
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
