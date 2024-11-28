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

type ReportScreenProps = NativeStackScreenProps<RootStackParamList, "Reports">;

const ReportScreen: React.FC<ReportScreenProps> = (props) => {
  const renderBtn = () => {
    return (
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          props.navigation.navigate("DashboardDrawer");
        }}
      >
        <Text style={style.btnText}>Send Report</Text>
      </TouchableOpacity>
    );
  };
  const renderForm = () => {
    return (
      <View style={style.viewBox}>
        {/* Organization */}
        <Text style={style.labelText}>Campaign Name:</Text>
        <CDSDropDown
          data={[{ label: "", value: "" }]}
          onSelect={() => {}}
          placeholder="Select campaign"
        />
        {/* State */}
        <Text style={style.labelText}>Select Data:</Text>
        <CDSDropDown
          data={[{ label: "", value: "" }]}
          onSelect={() => {}}
          placeholder="Select data"
        />
      </View>
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      {renderForm()}
      {renderBtn()}
    </ImageBackground>
  );
};
export default ReportScreen;
