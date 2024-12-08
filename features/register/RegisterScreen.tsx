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
  Dimensions,
  Alert,
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
import { GetOrgData, isRegisterFormValid } from "./RegisterUtility";
import { CdsPickerModel } from "../../types/CdsPickerModel";
import RegisterHelper, { IRegisterForm } from "./RegisterFormik";
import { useFormik } from "formik";
import { RegisterUserRequest } from "../../services/registerUserRequest/RegisterUserRequest";
import { RegisterUser } from "../../types/registerType/RegisterType";
import CDSDropDown from "../login/CDSDropDown";
import { GetCampaignDataRequest } from "../../services/campaignRequest/GetCampaignDataRequest";
import { GetCampaignData } from "../user/createUser/CreateUserUtility";

type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Register"
>;

const RegisterScreen: React.FC<RegisterScreenProps> = (props) => {
  const { width } = Dimensions.get("window");
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const { orgData } = useSelector((state: RootState) => state.orgnizationData);
  const { getCampaignData } = useSelector(
    (state: RootState) => state.getCampaignData
  );
  const [alertState, setAlertState] = useState(false);

  const [cPass, setCPass] = useState("");
  const formHelper = new RegisterHelper();
  const handleAPI = async (data: RegisterUser) => {
    const resp = await RegisterUserRequest(data);
    if (resp && resp.statusCode == 201) {
      setAlertState(true);
    } else {
      DisplayToast(`${resp.message}`);
    }
  };
  const submitRegData = useFormik({
    initialValues: formHelper.formikInitialValue,
    onSubmit: async (values) => {
      if (isRegisterFormValid(values.formData, cPass)) {
        await handleAPI(values.formData);
      }
    },
  });

  useEffect(() => {
    if (isFocused) {
      dispatch(GetCampaignDataRequest({}));
      dispatch(OrganizationRequest({}));
    }
  }, [isFocused]);

  const headerIcon = () => {
    return (
      <Image
        source={require("../../assets/mainLogo.png")}
        style={{
          height: 90,
          width: 300,
          alignSelf: "center",
        }}
      />
    );
  };
  const renderHeader = () => {
    return (
      <>
        {headerIcon()}
        <Text style={style.createAcc}>Create Account</Text>
      </>
    );
  };

  const [value, setValue] = useState("");
  const renderResgisterBox = () => {
    return (
      <View style={style.registerBoxView}>
        {/* Organization */}
        <View style={style.txView}>
          <SimpleLineIcons
            name="organization"
            size={20}
            style={style.leftIcon}
          />
          <TextInput
            placeholder="Organization*"
            value={submitRegData.values.formData.orgName}
            style={style.txtInput}
            placeholderTextColor={"grey"}
            onChangeText={(value) => {
              submitRegData.setFieldValue("formData.orgId", 1);
              submitRegData.setFieldValue("formData.orgName", value);
            }}
          />
        </View>
        {/* Name */}
        <View style={style.txView}>
          <FontAwesome5 name="user-alt" size={18} style={style.leftIcon} />
          <TextInput
            placeholder="Name*"
            value={submitRegData.values.formData.username}
            style={style.txtInput}
            placeholderTextColor={"grey"}
            onChangeText={(value) => {
              submitRegData.setFieldValue("formData.username", value);
            }}
          />
        </View>
        {/* Mobile Number */}
        <View style={style.txView}>
          <Foundation name="telephone" size={22} style={style.leftIcon} />
          <TextInput
            value={submitRegData.values.formData.mobile}
            placeholder="Mobile Number*"
            maxLength={10}
            keyboardType="number-pad"
            style={style.txtInput}
            placeholderTextColor={"grey"}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              submitRegData.setFieldValue("formData.mobile", numericValue);
            }}
          />
        </View>

        {/* Email */}
        <View style={style.txView}>
          <Fontisto name="email" size={22} style={style.leftIcon} />
          <TextInput
            placeholder="Email*"
            value={submitRegData.values.formData.email}
            style={style.txtInput}
            placeholderTextColor={"grey"}
            onChangeText={(value) => {
              submitRegData.setFieldValue("formData.email", value);
            }}
          />
        </View>
        {/* Location */}
        <View style={style.txView}>
          <MaterialIcons name="my-location" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Location/Address*"
            value={submitRegData.values.formData.address}
            style={style.txtInput}
            placeholderTextColor={"grey"}
            onChangeText={(value) => {
              submitRegData.setFieldValue("formData.address", value);
            }}
          />
        </View>

        {/* Pincode */}
        <View style={style.txView}>
          <MaterialIcons name="my-location" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Pincode*"
            value={submitRegData.values.formData.pincode}
            style={style.txtInput}
            placeholderTextColor={"grey"}
            keyboardType="number-pad"
            maxLength={6}
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              submitRegData.setFieldValue("formData.pincode", numericValue);
            }}
          />
        </View>
        {/* Password */}
        <View style={style.txView}>
          <AntDesign name="lock" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Password*"
            value={submitRegData.values.formData.password}
            style={style.txtInput}
            placeholderTextColor={"grey"}
            onChangeText={(value) => {
              submitRegData.setFieldValue("formData.password", value);
            }}
          />
        </View>
        {/* Confirm Password */}
        <View style={style.txView}>
          <AntDesign name="lock" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Confirm Password*"
            style={style.txtInput}
            placeholderTextColor={"grey"}
            value={cPass}
            onChangeText={(value) => {
              setCPass(value);
            }}
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
          submitRegData.handleSubmit();
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
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <CDSAlertBox
          alertVisibility={alertState}
          alertTitle="Register"
          alertDesc="User registerd successfully!"
          showNegativeBtn={false}
          positiveBtnTxt="Cancel"
          negativeBtnTxt="Ok"
          onNegativeClick={() => {
            setAlertState(false);
            props.navigation.navigate("Login");
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
