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

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const [email, setEmail] = useState("siddhesh.chaure@copiacs.com");
  const [password, setPassword] = useState("123");
  const [otp, setOTP] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const icon = () => {
    return (
      <Image
        source={require("../../assets/mainLogo.png")}
        style={{
          height: "10%",
          width: "80%",
          alignSelf: "center",
          marginVertical: "6%",
        }}
      />
    );
  };
  const isValidWPass = () => {
    let emailRegex = /^(?:[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})$/;
    if (!email) {
      DisplayToast("Please enter email");
      return false;
    } else if (email && !emailRegex.test(email)) {
      DisplayToast("Please enter valid mail");
      return false;
    } else if (!password) {
      DisplayToast("Please enter password");
      return false;
    } else {
      return true;
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
        <Text
          onPress={() => {
            props.navigation.navigate("ForgotPassword");
          }}
          style={style.forgotPwd}
        >
          Forgot Password?
        </Text>
        <TouchableOpacity
          style={style.btn}
          onPress={async () => {
            if (isValidWPass()) {
              const resp = await LoginWPassRequest({
                email: email,
                password: password,
              });
              if (resp && resp.email) {
                const userDataJSON = JSON.stringify(resp);
                await AsyncStorage.setItem("@userData", userDataJSON);
                props.navigation.navigate("DashboardDrawer");
              } else if (resp && resp.statusCode == 401) {
                DisplayToast(resp.message);
              } else {
                DisplayToast("Something went wrong!");
              }
            }
          }}
        >
          <Text style={style.btnText}>Sign in</Text>
        </TouchableOpacity>
        <View style={style.orView}>
          <View style={style.horizontalBorderLeft}></View>
          <Text style={style.orText}>OR</Text>
          <View style={style.horizontalBorderRight}></View>
        </View>
        <TouchableOpacity style={[style.btn]}>
          <Text style={style.btnText}>Sign in with OTP</Text>
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
    </ImageBackground>
  );
};
export default LoginScreen;
