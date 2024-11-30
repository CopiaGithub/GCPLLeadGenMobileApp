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
import CDSLoader from "../../component/CDSLoader";
import { OTPFormState } from "../../types/loginTypes/loginWOTPTypes/LoginSentOTPTypes";
import { UpdatePasswordRequest } from "../../services/updatePasswordRequest/UpdatePasswordRequest";

type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = (props) => {
  const isFocused = useIsFocused();
  const [mail, setMail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [id, setId] = useState(0);
  const [validateOTPState, setValidateOTPState] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const [formState, setFormState] = useState<OTPFormState>(
    OTPFormState.SEND_OTP
  );

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
    } else if (password != cPassword) {
      DisplayToast("Password and confirm password doesn't match");
      return false;
    } else {
      return true;
    }
  };

  const handleFormState = (state: OTPFormState) => setFormState(state);

  const handleSendOTP = async () => {
    setLoaderState(true);
    const resp = await LoginSendOTPRequest({
      email: mail,
    });
    setLoaderState(resp ? false : true);
    if (resp && resp.statusCode == 200) {
      DisplayToast(resp.message);
      handleFormState(OTPFormState.VALIDATE_OTP);
    } else {
      DisplayToast(`${resp.message}`);
    }
  };
  const handleValidateOTP = async () => {
    if (otp) {
      setLoaderState(true);
      const resp = await LoginValidateOTPRequest({
        email: mail,
        otp: otp,
      });
      setLoaderState(resp ? false : true);
      if (resp && resp.statusCode == 200) {
        handleFormState(OTPFormState.SUBMIT_PASS);
        setId(resp.message.id);
      } else {
        DisplayToast(`${resp.message}`);
      }
    } else {
      DisplayToast("Please enter OTP");
    }
  };
  const handleUpdatePassword = async () => {
    if (isValid()) {
      setLoaderState(true);
      const resp = await UpdatePasswordRequest({
        id: id,
        password: password,
      });
      setLoaderState(resp ? false : true);
      if (resp && resp.statusCode == 200) {
        DisplayToast("Password updated succesfully!");
        props.navigation.navigate("Login");
      } else {
        DisplayToast(`${resp.message}`);
      }
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
            editable={formState == OTPFormState.SEND_OTP ? true : false}
            value={mail}
            onChangeText={(val) => {
              setMail(val);
            }}
          />
        </View>
        {formState == OTPFormState.SEND_OTP ? (
          <TouchableOpacity style={style.sendOTPView} onPress={handleSendOTP}>
            <Text style={style.sendOTPText}>Send OTP</Text>
          </TouchableOpacity>
        ) : null}

        <View style={style.txView}>
          <TextInput
            placeholder="Enter OTP"
            style={style.txtInput}
            value={otp}
            editable={formState == OTPFormState.VALIDATE_OTP ? true : false}
            onChangeText={(val) => setOTP(val)}
            maxLength={6}
            keyboardType="numeric"
            placeholderTextColor={"grey"}
          />
        </View>
        {formState == OTPFormState.VALIDATE_OTP ? (
          <>
            <Text style={style.resendOTP} onPress={handleSendOTP}>
              Resent OTP
            </Text>
            <TouchableOpacity
              style={style.sendOTPView}
              onPress={handleValidateOTP}
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
            value={password}
            placeholderTextColor={"grey"}
            onChangeText={(val) => setPassword(val)}
          />
        </View>
        {/* Confirm Password */}
        <View style={style.txView}>
          <AntDesign name="lock" size={24} style={style.leftIcon} />
          <TextInput
            placeholder="Confirm Password*"
            style={style.txtInput}
            value={cPassword}
            onChangeText={(val) => setCPassword(val)}
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
        onPress={handleUpdatePassword}
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
      {loaderState ? (
        <CDSLoader />
      ) : (
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
            {formState == OTPFormState.SUBMIT_PASS
              ? renderPasswordFields()
              : null}
          </View>
          {formState == OTPFormState.SUBMIT_PASS ? renderButton() : null}
        </ScrollView>
      )}
    </ImageBackground>
  );
};
export default ForgotPasswordScreen;
