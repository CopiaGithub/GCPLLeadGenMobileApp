import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
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

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  //hhh
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
          <Foundation name="telephone" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="10 digit Mobile number"
            style={style.txtInput}
            placeholderTextColor={"grey"}
          />
        </View>
        <View style={style.txView}>
          <AntDesign name="lock" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Password"
            style={style.txtInput}
            placeholderTextColor={"grey"}
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
          onPress={() => {
            props.navigation.navigate("DashboardDrawer");
          }}
        >
          <Text style={style.btnText}>Sign in</Text>
        </TouchableOpacity>
        <View style={style.orView}>
          <View style={style.horizontalBorderLeft}></View>
          <Text style={style.orText}>OR</Text>
          <View style={style.horizontalBorderRight}></View>
        </View>
        <TouchableOpacity style={style.btn}>
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
      <ScrollView>
        <View style={style.container}>
          {icon()}
          {renderHeader()}
          {renderLoginBox()}
        </View>
      </ScrollView>
      {renderSignUp()}
    </ImageBackground>
  );
};
export default LoginScreen;
