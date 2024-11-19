import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";
import { RootStackParamList } from "../../types";
import { style } from "./ForgotPasswordScreenStyle";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { LoginSendOTPRequest } from "../../services/loginRequest/LoginSendOTPRequest";
import { DisplayToast } from "../../utility/ToastMessage";
import { LoginValidateOTPRequest } from "../../services/loginRequest/LoginValidateOTPRequest";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props) => {
  const [mail, setMail] = useState("siddhesh.chaure@copiacs.com");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [id, setId] = useState("");

  const [sendOTPState, setSendOTPState] = useState(false);
  const [validateOTPState, setValidateOTPState] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        setId(user.id);
      }
    });
  }, [isFocused]);

  const icon = () => {
    return (
      <Image
        source={require("../../assets/mainLogo.png")}
        style={{
          height: "10%",
          width: "80%",
          alignSelf: "center",
        }}
      />
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
  const isValid = () => {
    if (!password) {
      DisplayToast("Please enter password");
      return false;
    } else if (!cPassword) {
      DisplayToast("Please enter confirm password");
      return false;
    } else if (password === cPassword) {
      DisplayToast("Password and confirm password doesn't match");
      return false;
    } else {
      return true;
    }
  };
  const renderHeaderOne = () => {
    return (
      <>
        <View style={style.txView}>
          <Foundation name="mail" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Enter Email"
            style={style.txtInput}
            placeholderTextColor={"grey"}
            editable={sendOTPState ? false : true}
            value={mail}
            onChangeText={(val) => {
              setMail(val);
            }}
          />
        </View>
        {!sendOTPState ? (
          <TouchableOpacity
            style={style.sendOTPView}
            onPress={async () => {
              const resp = await LoginSendOTPRequest({
                email: mail,
              });
              if (resp && resp.statusCode != 0) {
                DisplayToast(resp.message);
                setSendOTPState(true);
              }
            }}
          >
            <Text style={style.sendOTPText}>Send OTP</Text>
          </TouchableOpacity>
        ) : null}

        <View style={style.txView}>
          <TextInput
            placeholder="Enter OTP"
            style={style.txtInput}
            value={otp}
            editable={validateOTPState ? false : true}
            onChangeText={(val) => {
              setOTP(val);
            }}
            placeholderTextColor={"grey"}
          />
        </View>
        {!validateOTPState ? (
          <>
            <Text
              style={style.resendOTP}
              onPress={async () => {
                const resp = await LoginSendOTPRequest({
                  email: mail,
                });

                if (resp && resp.statusCode != 0) {
                  DisplayToast(resp.message);
                  setSendOTPState(true);
                }
              }}
            >
              Resent OTP
            </Text>
            <TouchableOpacity
              style={style.sendOTPView}
              onPress={async () => {
                const resp = await LoginValidateOTPRequest({
                  email: mail,
                  otp: otp,
                });
                if (resp && resp.message) {
                  DisplayToast("Success");
                  setValidateOTPState(true);
                }
              }}
            >
              <Text style={style.sendOTPText}>Validate OTP</Text>
            </TouchableOpacity>
          </>
        ) : null}
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
      <TouchableOpacity
        style={style.sendOTPView}
        onPress={async () => {
          if (isValid()) {
          }
        }}
      >
        <Text style={style.sendOTPText}>Submit</Text>
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
