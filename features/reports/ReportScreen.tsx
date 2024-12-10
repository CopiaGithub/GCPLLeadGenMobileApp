import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../../types";
import { style } from "./ReportScreenStyle";
import CDSDropDown from "../login/CDSDropDown";
import { SendReportRequest } from "../../services/sendReportRequest/SendReportRequest";
import { useEffect, useState } from "react";
import { DisplayToast } from "../../utility/ToastMessage";
import CDSAlertBox from "../../component/CDSAlertBox";
import CDSLoader from "../../component/CDSLoader";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { SBUMasterRequest } from "../../services/sbuMasterRequest.tsx/SBUMasterRequest";
import { GetSBUMaster } from "../dashboard/DashboardUtility";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReportTypesReq } from "../../types/reportTypes/ReportTypes";

type ReportScreenProps = NativeStackScreenProps<RootStackParamList, "Reports">;

const ReportScreen: React.FC<ReportScreenProps> = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();

  const { sbuMaster } = useSelector((state: RootState) => state.sbuMaster);
  const [alertState, setAlertState] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const [roleID, setRoleID] = useState(0);
  const [sbuId, setSbuId] = useState(0);
  const [reportId, setReportId] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isFocused) {
      dispatch(SBUMasterRequest(null));
    }
  }, [isFocused]);
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        setRoleID(user.message.user.roleId);
      }
    });
  }, [isFocused]);
  const isValid = () => {
    let emailRegex = /^(?:[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})$/;
    if (sbuId == 0) {
      DisplayToast("Please select sbu/brand");
      return false;
    } else if (reportId == 0) {
      DisplayToast("Please select report");
      return false;
    } else if (!email) {
      DisplayToast("Please enter email");
      return false;
    } else if (email && !emailRegex.test(email)) {
      DisplayToast("Please enter valid email");
      return false;
    } else {
      return true;
    }
  };
  const renderBtn = () => {
    return (
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          if (isValid()) {
            sendReport(email);
          }
        }}
      >
        <Text style={style.btnText}>Send Report</Text>
      </TouchableOpacity>
    );
  };
  const sendReport = async (email: string) => {
    setLoaderState(true);
    const payload: ReportTypesReq = {
      email: email,
      sbuId: sbuId == 4 ? 0 : sbuId,
    };

    const resp = await SendReportRequest(payload, reportId);
    setLoaderState(resp ? false : true);
    if (resp && resp.message) {
      setAlertState(true);
    } else {
      DisplayToast(`${resp.message}`);
    }
  };
  const renderForm = () => {
    return (
      <View style={style.viewBox}>
        {/* Organization */}
        <Text style={style.labelText}>SBU/Brand:</Text>
        <CDSDropDown
          data={GetSBUMaster(sbuMaster, roleID)}
          onSelect={(val) => {
            if (val && val.value) {
              setSbuId(+val.value);
            }
          }}
          placeholder="Select SBU/Brand"
        />
        {/* Organization */}
        <Text style={style.labelText}>Report:</Text>
        <CDSDropDown
          data={[
            { label: "User Report", value: "1" },
            { label: "Lead Details Report", value: "2" },
            { label: "Lead Report", value: "3" },
          ]}
          onSelect={(val) => {
            if (val && val.value) {
              setReportId(+val.value);
            }
          }}
          placeholder="Select report"
        />
        {/* State */}
        <Text style={style.labelText}>Email</Text>
        <TextInput
          placeholder="Enter Email ID"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
          }}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: "3%",
          }}
        />
      </View>
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <CDSAlertBox
        alertVisibility={alertState}
        alertTitle="Report!"
        alertDesc="Report sent successfully!"
        showNegativeBtn={false}
        positiveBtnTxt="Cancel"
        negativeBtnTxt="Ok"
        onNegativeClick={() => {
          setAlertState(false);
          setEmail("");
        }}
        onPositiveClick={() => {
          setAlertState(false);
        }}
      />
      {!loaderState ? (
        <>
          {renderForm()}
          {renderBtn()}
        </>
      ) : (
        <CDSLoader />
      )}
      <></>
    </ImageBackground>
  );
};
export default ReportScreen;
