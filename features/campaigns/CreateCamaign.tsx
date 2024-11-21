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
import React, { useEffect, useState } from "react";
import { style } from "./CreateCamaignStyle";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import CDSDatePicker from "../../component/CDSDatePicker";

type CreateCampaignScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateCampaign"
>;

const CreateCampaignScreen: React.FC<CreateCampaignScreenProps> = (props) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const renderCreateCampaignView = () => {
    return (
      <View style={style.createView}>
        {/* Campaign Name */}
        <Text style={style.labelText}>Campaign Name:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Campaign Name"
          placeholderTextColor={"grey"}
        />
        {/* Campaign Type */}
        <Text style={style.labelText}>Campaign Type:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Campaign Type"
          placeholderTextColor={"grey"}
        />
        {/* Dates */}
        <View style={{ flexDirection: "row", marginVertical: "2%" }}>
          {/* From Date */}
          <View style={{ flex: 1 }}>
            <Text style={style.labelText}>From Date:</Text>
            <CDSDatePicker
              dateFormat="YYYY-MM-DD"
              date={date}
              onDateTap={(val) => {
                console.error(new Date(val));
                setDate(new Date(val));
              }}
            />
          </View>
          {/* To Date */}
          <View style={{ flex: 1, marginLeft: "2%" }}>
            <Text style={style.labelText}>To Date:</Text>
            <CDSDatePicker
              dateFormat="YYYY-MM-DD"
              date={date}
              onDateTap={(val) => {
                console.error(new Date(val));
                setDate(new Date(val));
              }}
            />
          </View>
        </View>
        {/* Organization */}
        <Text style={style.labelText}>Organization:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Organization"
          placeholderTextColor={"grey"}
        />
        {/* State */}
        <Text style={style.labelText}>State:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter State"
          placeholderTextColor={"grey"}
        />
        {/* District */}
        <Text style={style.labelText}>District:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter District"
          placeholderTextColor={"grey"}
        />
        {/* Location */}
        <Text style={style.labelText}>Location:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Location"
          placeholderTextColor={"grey"}
        />
        {/* Campaign Objective */}
        <Text style={style.labelText}>Campaign Objective:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Campaign Objective"
          placeholderTextColor={"grey"}
        />
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
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: "50%" }}>
        {renderCreateCampaignView()}

        {renderBtn()}
      </ScrollView>
    </ImageBackground>
  );
};
export default CreateCampaignScreen;
