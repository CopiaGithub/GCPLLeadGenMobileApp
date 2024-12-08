import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { style } from "./MyAccountStyle";
import {
  ImageBackground,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { RoleMasterRequest } from "../../services/roleMasterRequest/RoleMasterRequest";
import { GetRoleNameById } from "../user/createUser/CreateUserUtility";
import { DeleteAccountRequest } from "../../services/deleteAccountRequest/DeleteAccountRequest";
import { DisplayToast } from "../../utility/ToastMessage";
import CDSAlertBox from "../../component/CDSAlertBox";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "MyAccount">;

const MyAccountScreen: React.FC<LoginScreenProps> = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [roleId, setRoleId] = useState("");
  const [id, setId] = useState("");
  const [loaderState, setLoaderState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const { roleMaster } = useSelector((state: RootState) => state.roleMaster);

  useEffect(() => {
    if (isFocused) {
      dispatch(RoleMasterRequest(""));
    }
  }, [isFocused]);
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        setId(user.message.user.id);
        setName(user.message.user.username);
        setOrgName(user.message.user.orgName);
        setEmail(user.message.user.email);
        setMobile(user.message.user.mobile);
        setAddress(user.message.user.address);
        setRoleId(user.message.user.roleId);
      }
    });
  }, [isFocused]);
  const renderForm = () => {
    return (
      <View style={style.cardView}>
        <View style={style.rowView}>
          <Text style={style.rowLeftValues}>Name: </Text>
          <Text style={style.rowRighValues}>{name}</Text>
        </View>
        <View style={style.rowView}>
          <Text style={style.rowLeftValues}>Organization: </Text>
          <Text style={style.rowRighValues}>{orgName}</Text>
        </View>
        <View style={style.rowView}>
          <Text style={style.rowLeftValues}>Email: </Text>
          <Text style={style.rowRighValues}>{email}</Text>
        </View>
        <View style={style.rowView}>
          <Text style={style.rowLeftValues}>Mobile: </Text>
          <Text style={style.rowRighValues}>{mobile}</Text>
        </View>
        <View style={style.rowView}>
          <Text style={style.rowLeftValues}>Address: </Text>
          <Text style={style.rowRighValues}>{address}</Text>
        </View>
        <View style={style.rowView}>
          <Text style={style.rowLeftValues}>Role: </Text>
          <Text style={style.rowRighValues}>
            {GetRoleNameById(roleMaster, +roleId)}
          </Text>
        </View>
      </View>
    );
  };
  const DeleteAccountAPI = async () => {
    const resp = await DeleteAccountRequest(false, +id);

    setLoaderState(resp ? false : true);
    if (resp && resp.statusCode == 200) {
      setAlertState(true);
    } else {
      DisplayToast(`${resp.message}`);
    }
  };
  const showAlert = () => {
    Alert.alert("Hold on!", "Are you sure you want to delete your account?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Delete Account",
        onPress: () => {
          DeleteAccountAPI();
        },
      },
    ]);
  };
  const renderButton = () => {
    return (
      <TouchableOpacity style={style.btnView} onPress={showAlert}>
        <Text style={style.btnTxt}>Delete My Account</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={style.container}>
        <CDSAlertBox
          alertVisibility={alertState}
          alertTitle={"My Account "}
          alertDesc={"Your account deleted successfully!"}
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
        {renderForm()}
        {renderButton()}
      </ScrollView>
    </ImageBackground>
  );
};
export default MyAccountScreen;
