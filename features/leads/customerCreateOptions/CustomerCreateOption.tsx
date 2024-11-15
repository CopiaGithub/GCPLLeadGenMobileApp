import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../../../types";
import { style } from "./CustomerCreateOptionsStyle";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type CustomerCreateOptionsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CustomerCreateOption"
>;

const CustomerCreateOptionsScreen: React.FC<
  CustomerCreateOptionsScreenProps
> = (props) => {
  const [firstOptionState, setFirstOptionState] = useState(false);
  const [secondOptionState, setSecondOptionState] = useState(false);
  const [thirdOptionState, setThirdOptionState] = useState(false);

  const renderFirstOption = () => {
    return (
      <View style={style.formView}>
        <View style={style.headerView}>
          <Text style={style.headerTxt}>Scan QR Code</Text>
          <AntDesign
            name={firstOptionState ? "arrowdown" : "arrowup"}
            size={24}
            color="black"
            style={style.headerIcon}
            onPress={() => {
              setFirstOptionState(!firstOptionState);
            }}
          />
        </View>
        {firstOptionState ? (
          <View style={style.cardView}>
            <View style={{ flexDirection: "row" }}>
              <Text style={style.qrText}>Scan QR Code:</Text>
              <AntDesign
                name="qrcode"
                size={30}
                color="black"
                style={style.qrIcon}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  const renderSecondOption = () => {
    return (
      <View style={style.formView}>
        <View style={style.headerView}>
          <Text style={style.headerTxt}>Attach Visiting Card</Text>
          <AntDesign
            name={secondOptionState ? "arrowdown" : "arrowup"}
            size={24}
            color="black"
            style={style.headerIcon}
            onPress={() => {
              setSecondOptionState(!secondOptionState);
            }}
          />
        </View>
        {secondOptionState ? (
          <View style={style.cardView}>
            <View style={style.acvView}>
              <Text style={style.avcText}>Mobile No.:</Text>
              <TextInput
                style={style.acvTxtInput}
                placeholder="Enter Mobile No."
              />
            </View>
            <View style={style.acvView}>
              <Text style={style.avcText}>Visiting Card:</Text>
              <AntDesign
                name="camera"
                size={28}
                color="black"
                style={style.acvIcon}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };
  const renderCustomerForm = () => {
    return (
      <View style={style.cardView}>
        {/* Campaign Name */}
        <Text style={style.labelText}>Campaign Name:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Campaign Name" />
        {/* Customer Name */}
        <Text style={style.labelText}>Customer Name:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Customer Name" />
        {/* Mobile Number */}
        <Text style={style.labelText}>Mobile Number:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Mobile Number" />
        {/* Alternative Mobile Number */}
        <Text style={style.labelText}>Alternative Mobile Number:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Alternative Mobile Number"
        />
        {/* Email */}
        <Text style={style.labelText}>Email:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Email" />
        {/* Company Name */}
        <Text style={style.labelText}>Company Name:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Company Name" />
        {/* Industry Type */}
        <Text style={style.labelText}>Industry Type:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter Industry Type" />
        {/* State */}
        <Text style={style.labelText}>State:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter State" />
        {/* District */}
        <Text style={style.labelText}>District:</Text>
        <TextInput style={style.inputTxt} placeholder="Enter District" />
      </View>
    );
  };
  const renderThirdOption = () => {
    return (
      <View style={style.formView}>
        <View style={style.headerView}>
          <Text style={style.headerTxt}>Add Customer Data</Text>
          <AntDesign
            name={thirdOptionState ? "arrowdown" : "arrowup"}
            size={24}
            color="black"
            style={style.headerIcon}
            onPress={() => {
              setThirdOptionState(!thirdOptionState);
            }}
          />
        </View>
        {thirdOptionState ? <>{renderCustomerForm()}</> : null}
      </View>
    );
  };
  const renderButton = () => {
    return (
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          props.navigation.navigate("AddMachineDetails");
        }}
      >
        <Text style={style.btnText}>Add Machine Details</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      source={require("../../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: "50%" }}>
        <View style={{ marginVertical: "2%" }}>
          {renderFirstOption()}
          {renderSecondOption()}
          {renderThirdOption()}
          {renderButton()}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default CustomerCreateOptionsScreen;
