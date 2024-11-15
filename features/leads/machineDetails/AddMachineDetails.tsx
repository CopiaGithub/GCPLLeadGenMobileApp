import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../../../types";
import { style } from "./AddMachineDetailsStyle";

type AddMachineDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "AddMachineDetails"
>;

const AddMachineDetailsScreen: React.FC<AddMachineDetailsScreenProps> = (
  props
) => {
  const renderBtn = () => {
    return (
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          props.navigation.navigate("DashboardDrawer");
        }}
      >
        <Text style={style.btnText}>Save Lead</Text>
      </TouchableOpacity>
    );
  };
  const renderForm = () => {
    return (
      <View style={style.createView}>
        {/* Machine Type Interested */}
        <Text style={style.labelText}>Machine Type Interested:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Machine Type Interested"
        />
        {/* Model Number */}
        <Text style={style.labelText}>Model Number:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Model Number" />
        {/* No. Of Machines */}
        <Text style={style.labelText}>No. Of Machines:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter No. Of Machines" />
        {/* Planning Timeline */}
        <Text style={style.labelText}>Planning Timeline:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Planning Timeline"
        />
        {/* Financing Required */}
        <Text style={style.labelText}>Financing Required:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Financing Required"
        />
        {/* No. of People Accompained */}
        <Text style={style.labelText}>No. of People Accompained:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. of People Accompained"
        />
        {/* No of Gifts Needed */}
        <Text style={style.labelText}>No of Gifts Needed:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No of Gifts Needed"
        />
      </View>
    );
  };
  return (
    <ImageBackground
      source={require("../../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: "50%" }}>
        {renderForm()}
        {renderBtn()}
      </ScrollView>
    </ImageBackground>
  );
};
export default AddMachineDetailsScreen;
