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
import { useState } from "react";
import { DisplayToast } from "../../utility/ToastMessage";
import CDSAlertBox from "../../component/CDSAlertBox";
import CDSLoader from "../../component/CDSLoader";
import CDSImageBG from "../../component/CDSImageBG";

type ReportScreenProps = NativeStackScreenProps<RootStackParamList, "Reports">;

const ReportScreen: React.FC<ReportScreenProps> = (props) => {
  const [alertState, setAlertState] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const [email, setEmail] = useState("");
  const renderBtn = () => {
    return (
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          let emailRegex =
            /^(?:[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})$/;
          if (!email) {
            DisplayToast("Please enter email");
          } else if (email && !emailRegex.test(email)) {
            DisplayToast("Please enter valid email");
          } else {
            sendReport(email);
          }
        }}
      >
        <Text style={style.btnText}>Send Report</Text>
      </TouchableOpacity>
    );
  };
  const sendReport = async (email: string) => {
    const resp = await SendReportRequest({ email: email });
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
        {/* <Text style={style.labelText}>Campaign Name:</Text> */}
        {/* <CDSDropDown
          data={[{ label: "", value: "" }]}
          onSelect={() => {}}
          placeholder="Select campaign"
        /> */}
        {/* State */}
        <Text style={style.labelText}>Enter Email</Text>
        <TextInput
          placeholder="Enter Email ID"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
          }}
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 8,
            padding: "2%",
          }}
        />
        {/* <Text style={style.labelText}>Select Data:</Text>
        <CDSDropDown
          data={[{ label: "", value: "" }]}
          onSelect={() => {}}
          placeholder="Select data"
        /> */}
      </View>
    );
  };
  return (
    <CDSImageBG
      renderJXX={() => (
        <>
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
        </>
      )}
    />
  );
};
export default ReportScreen;
