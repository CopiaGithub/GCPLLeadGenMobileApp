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
import { RootStackParamList } from "../../types";
import { useEffect } from "react";
import { style } from "./CreateUserStyle";

type CreateUserScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateUser"
>;

const CreateUserScreen: React.FC<CreateUserScreenProps> = (props) => {
  const { operation } = props.route.params;

  useEffect(() => {
    if (operation && operation == "1") {
      props.navigation.setOptions({
        headerTitle: "Edit User",
      });
    }
  }, [operation]);
  const renderCreateUserView = () => {
    return (
      <View style={style.createView}>
        {/* User Name */}
        <Text style={style.labelText}>User Name:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter User Name" />
        {/* Mobile Number */}
        <Text style={style.labelText}>Mobile Number:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Mobile Number" />
        {/* Email */}
        <Text style={style.labelText}>Email:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Email" />
        {/* Organization */}
        <Text style={style.labelText}>Organization:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Organization" />
        {/* State */}
        <Text style={style.labelText}>State:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter State" />
        {/* District */}
        <Text style={style.labelText}>District:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter District" />
        {/* Location */}
        <Text style={style.labelText}>Location:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Location" />
        {/* Password */}
        <Text style={style.labelText}>Password:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Password" />
        {/* Role */}
        <Text style={style.labelText}>Role:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Role" />
      </View>
    );
  };
  const renderBtn = () => {
    return (
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          props.navigation.navigate("DashboardDrawer");
        }}
      >
        <Text style={style.btnText}>Submit</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: "50%" }}>
        {renderCreateUserView()}
        {renderBtn()}
      </ScrollView>
    </ImageBackground>
  );
};
export default CreateUserScreen;
