import FontAwesome from "@expo/vector-icons/FontAwesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";
import { ImageBackground, View, Text, TextInput } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import CDSDropDown from "../../login/CDSDropDown";
import { style } from "./EditLeadCustomerStyle";
import {
  GetCampaignData,
  GetCompanyType,
  GetIndustry,
} from "../stepperScreens/leadDetails/LeadDetailsUtility";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { GetCampaignDataRequest } from "../../../services/campaignRequest/GetCampaignDataRequest";
import { CompanyTypeRequest } from "../../../services/companyTypeRequest/CompanyTypeRequest";
import { IndustryTypeRequest } from "../../../services/industryTypeRequest/IndustryTypeRequest";

type EditLeadCustomerProps = NativeStackScreenProps<
  RootStackParamList,
  "editLeadCustomer"
>;

const EditLeadCustomerScreen: React.FC<EditLeadCustomerProps> = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const { address } = props.route.params;

  const { getCampaignData } = useSelector(
    (state: RootState) => state.getCampaignData
  );
  const { CompanyType } = useSelector(
    (state: RootState) => state.companyTypeData
  );
  const { IndustryType } = useSelector(
    (state: RootState) => state.industryTypeData
  );
  useEffect(() => {
    if (isFocused) {
      dispatch(GetCampaignDataRequest({}));
      dispatch(CompanyTypeRequest(""));
      dispatch(IndustryTypeRequest(""));
    }
  }, [isFocused]);
  const renderForm = () => {
    return (
      <>
        {/* Campaign Name */}
        <Text style={style.labelText}>Campaign Name:</Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            placeholder="Select campaign type"
            data={GetCampaignData(getCampaignData)}
            onSelect={(val) => {
              // submitLeadDetails.setFieldValue("campaignID", val.value);
            }}
          />
        </View>

        {/* Company Name */}
        <Text style={style.labelText}>Company Name:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Company Name"
          placeholderTextColor={"grey"}
          // value={submitLeadDetails.values.companyName}
          onChangeText={(val) => {
            // submitLeadDetails.setFieldValue("companyName", val);
          }}
        />
        {/* Company Type */}
        <Text style={style.labelText}>Company Type:</Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            placeholder="Select company type"
            data={GetCompanyType(CompanyType)}
            onSelect={(val) => {
              // submitLeadDetails.setFieldValue("companyTypeID", val.value);
            }}
          />
        </View>
        {/* Industry Type */}
        <Text style={style.labelText}>Industry Type:</Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            placeholder="Select industry type"
            data={GetIndustry(IndustryType)}
            onSelect={(val) => {
              //   DisplayToast(`${val.value}`);
              //   submitLeadDetails.setFieldValue("industryTypeId", val.value);
            }}
          />
        </View>
        {/* Location */}
        <Text style={style.labelText}>Addresss/Location:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Location"
          placeholderTextColor={"grey"}
          // value={submitLeadDetails.values.location}
          onChangeText={(val) => {
            // submitLeadDetails.setFieldValue("location", val);
          }}
        />
        {/* Pincode */}
        <Text style={style.labelText}>Pincode:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Pincode"
          maxLength={6}
          keyboardType="numeric"
          placeholderTextColor={"grey"}
          // value={submitLeadDetails.values.pinCode}
          onChangeText={(val) => {
            //submitLeadDetails.setFieldValue("pinCode", val);
          }}
        />
      </>
    );
  };
  return (
    <ImageBackground
      source={require("../../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <View>{renderForm()}</View>
    </ImageBackground>
  );
};
export default EditLeadCustomerScreen;
