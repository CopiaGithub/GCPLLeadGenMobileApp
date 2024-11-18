import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { RootStackParamList } from "../../types";
import { View } from "react-native";
import { style } from "./ForgotPasswordScreenStyle";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";

type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props) => {
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
        <Text style={style.forgotPass}>Password Reset</Text>
      </>
    );
  };
  const renderHeaderOne = () => {
    return (
      <>
        <View style={style.txView}>
          <Foundation name="telephone" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="10 digit Mobile number"
            style={style.txtInput}
            placeholderTextColor={"grey"}
          />
        </View>
        <TouchableOpacity style={style.sendOTPView}>
          <Text style={style.sendOTPText}>Send OTP</Text>
        </TouchableOpacity>
        <View style={style.txView}>
          <TextInput
            placeholder="Enter OTP"
            style={style.txtInput}
            placeholderTextColor={"grey"}
          />
        </View>
        <Text style={style.resendOTP}>Resent OTP</Text>
      </>
    );
  };
  const renderPasswordFields = () => {
    return (
      <>
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
      </>
    );
  };
  const renderButton = () => {
    return (
      <TouchableOpacity style={style.sendOTPView}>
        <Text style={style.sendOTPText}>Submit</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{}}>
        {renderHeader()}
        <View style={style.boxView}>
          {renderHeaderOne()}
          {renderPasswordFields()}
        </View>
        {renderButton()}
      </ScrollView>
    </ImageBackground>
  );
};
export default ForgotPasswordScreen;
