import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootStackParamList } from "../../types";
import style from "./LoginStyle";
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
import { DisplayToast } from "../../utility/ToastMessage";
import { LoginWPassRequest } from "../../services/loginRequest/LoginWPassRequest";
import CDSAlertBox from "../../component/CDSAlertBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import CDSLoader from "../../component/CDSLoader";
import { LoginMethod } from "../../types/loginTypes/loginWPasswordTypes/LoginWPasswordTypes";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LoginSendOTPRequest } from "../../services/loginRequest/LoginSendOTPRequest";
import { LoginValidateOTPRequest } from "../../services/loginRequest/LoginValidateOTPRequest";
import CDSTest from "./CDSDropDown";
import Dropdown from "./CDSDropDown";
import CDSDropDown from "./CDSDropDown";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  //User Creation
  //Org Grey color
  //SBU/Brand
  //Campaign
  //Asterick for  mandatory field
  //Address optional

  //Register User
  //Org Name TextBox
  //Remove Camp
  //Name
  //Email
  //Mobile Number
  //Location
  //Pincode

  //My Account (New Menu)
  //All Data
  //Delete My Account with data (Confimation Alert)

  //Dashboard
  //SBU DD - Selection All
  //Table - Brand - Model -No Of Machines

  //Lead Details
  //Contact Detail - Validation
  //Email, Mobile Number Duplicate check
  //Company Type - Customer -

  //User - Edit User - Status Active/InActive

  //Name, Email Mobile, SBU[Blank] Role 2

  //SBU and Status True id PATCH

  //Lead Creation
  //Hide SBU DD if roleID=1 else

  //Admin All Access
  //Business Admin - SBU Admin
  //Business User -

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [loaderState, setLoaderState] = useState(false);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(
    LoginMethod.Password
  );
  const [otpState, setOTPState] = useState(false);

  const icon = () => {
    return (
      <Image
        source={require("../../assets/mainLogo.png")}
        style={{
          height: 90,
          width: 300,
          alignSelf: "center",
          marginVertical: "6%",
        }}
      />
    );
  };
  const handleLoginMethod = (method: LoginMethod) => setLoginMethod(method);

  const handleLoginWithPassword = async () => {
    if (isValid()) {
      setLoaderState(true);
      const resp = await LoginWPassRequest({
        email: email,
        password: password,
      });
      setLoaderState(resp ? false : true);
      if (resp && resp.statusCode == 200) {
        const userDataJSON = JSON.stringify(resp);
        await AsyncStorage.setItem("@userData", userDataJSON);
        props.navigation.navigate("DashboardDrawer");
        DisplayToast(`Welcome ${resp.message.user.username}`);
      } else {
        DisplayToast(`${resp.message}`);
      }
    }
  };
  const handleLoginWithOTP = async () => {
    if (isValid()) {
      setLoaderState(true);
      const resp = await LoginValidateOTPRequest({
        email: email,
        otp: otp,
      });
      setLoaderState(resp ? false : true);
      if (resp && resp.statusCode == 200 && resp.message) {
        const userDataJSON = JSON.stringify(resp);
        await AsyncStorage.setItem("@userData", userDataJSON);
        props.navigation.navigate("DashboardDrawer");
        DisplayToast(`${resp.message}`);
      } else {
        DisplayToast(`${resp.message}`);
      }
    }
  };
  const isValid = () => {
    let emailRegex = /^(?:[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})$/;
    if (!email) {
      DisplayToast("Please enter email");
      return false;
    } else if (email && !emailRegex.test(email)) {
      DisplayToast("Please enter valid mail");
      return false;
    } else if (loginMethod == LoginMethod.Password && !password) {
      DisplayToast("Please enter password");
      return false;
    } else if (loginMethod == LoginMethod.OTP && !otp) {
      DisplayToast("Please enter OTP");
      return false;
    } else {
      return true;
    }
  };
  const GenerateOTP = async () => {
    setLoaderState(true);
    const resp = await LoginSendOTPRequest({ email: email });
    setLoaderState(resp ? false : true);
    setOTPState(resp ? true : false);
    if (resp && resp.statusCode == 200 && resp.message) {
      DisplayToast(`${resp.message}`);
    } else {
      DisplayToast(`${resp.message}`);
    }
  };
  const renderHeader = () => {
    return (
      <View>
        <Text style={style.headerText}>Exhibition Leads</Text>
        <Text style={style.childText}>Sign in to continue</Text>
      </View>
    );
  };
  const renderLoginBox = () => {
    return (
      <View style={style.boxView}>
        {renderSignOptions()}

        <View style={style.txView}>
          <Foundation name="mail" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Enter Mail ID"
            style={style.txtInput}
            value={email}
            placeholderTextColor={"grey"}
            onChangeText={(val) => {
              setEmail(val);
            }}
          />
        </View>

        {loginMethod == LoginMethod.Password ? (
          <View style={style.txView}>
            <AntDesign name="lock" size={24} style={style.leftIcon} />
            <TextInput
              placeholder="Enter Password"
              value={password}
              secureTextEntry={passwordVisibility}
              style={style.txtInput}
              placeholderTextColor={"grey"}
              onChangeText={(value) => {
                setPassword(value);
              }}
            />
            <Feather
              name={passwordVisibility ? "eye" : "eye-off"}
              size={24}
              style={style.leftIcon}
              onPress={() => {
                setPasswordVisibility(!passwordVisibility);
              }}
            />
          </View>
        ) : (
          <View style={style.txView}>
            <MaterialIcons
              name="password"
              size={24}
              color="black"
              style={style.leftIcon}
            />
            <TextInput
              placeholder="Enter OTP"
              value={otp}
              style={style.txtInput}
              maxLength={6}
              keyboardType="numeric"
              placeholderTextColor={"grey"}
              onChangeText={(value) => {
                setOTP(value);
              }}
            />
          </View>
        )}
        {loginMethod == LoginMethod.Password ? (
          <Text
            onPress={() => {
              props.navigation.navigate("ForgotPassword");
            }}
            style={style.forgotPwd}
          >
            Forgot Password?
          </Text>
        ) : (
          <Text onPress={() => GenerateOTP()} style={style.forgotPwd}>
            {otpState ? "Resend OTP" : "Send OTP"}
          </Text>
        )}

        <TouchableOpacity
          style={style.btn}
          onPress={() =>
            loginMethod == LoginMethod.OTP
              ? handleLoginWithOTP()
              : handleLoginWithPassword()
          }
        >
          <Text style={style.btnText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderSignUp = () => {
    return (
      <View style={style.registerView}>
        <Text
          style={style.dHAText}
          onPress={() => props.navigation.navigate("Register")}
        >
          Don't have an account? <Text style={style.rNText}>Register Now</Text>
        </Text>
      </View>
    );
  };
  const renderSignOptions = () => {
    return (
      <View style={style.toggleView}>
        <Text
          style={
            loginMethod == LoginMethod.Password
              ? style.activeToggle
              : style.disableToggle
          }
          onPress={() => handleLoginMethod(LoginMethod.Password)}
        >
          Sign in
        </Text>
        <Text
          style={
            loginMethod == LoginMethod.OTP
              ? style.activeToggle
              : style.disableToggle
          }
          onPress={() => handleLoginMethod(LoginMethod.OTP)}
        >
          Sign in with OTP
        </Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <>
        {loaderState ? (
          <CDSLoader />
        ) : (
          <>
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
                }}
                onPositiveClick={() => {
                  setAlertState(false);
                }}
              />

              {icon()}
              {renderHeader()}
              {renderLoginBox()}
            </ScrollView>
            {renderSignUp()}
          </>
        )}
      </>
    </ImageBackground>
  );
};
export default LoginScreen;
