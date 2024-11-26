import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CDSDropDown from "../../../login/CDSDropDown";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import {
  addCustomerDetails,
  createCustomerDetailsTable,
  deleteCustomer,
  getCustomerDetails,
  resetCustomerDetailsTable,
} from "./leadDetailsDao/LeadDetailsDao";
import AddCustomerDataHelper, { CustomerDetails } from "./LeadDetailsHelper";
import { useFormik } from "formik";
import { DisplayToast } from "../../../../utility/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { GetCampaignDataRequest } from "../../../../services/campaignRequest/GetCampaignDataRequest";
import {
  GetCampaignData,
  GetCompanyType,
  GetIndustry,
} from "./LeadDetailsUtility";
import { CompanyTypeRequest } from "../../../../services/companyTypeRequest/CompanyTypeRequest";
import { IndustryTypeRequest } from "../../../../services/industryTypeRequest/IndustryTypeRequest";

type LeadDetailsProps = {};

const LeadDetails: React.FC<LeadDetailsProps> = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const { getCampaignData } = useSelector(
    (state: RootState) => state.getCampaignData
  );
  const { CompanyType } = useSelector(
    (state: RootState) => state.companyTypeData
  );
  const { IndustryType } = useSelector(
    (state: RootState) => state.industryTypeData
  );

  const formHelper = new AddCustomerDataHelper();
  const [companyDetails, setCompanyDetails] = useState(true);
  const [custDetails, setCustDetails] = useState(false);
  const [custCartData, setCustCardData] = useState<Array<CustomerDetails>>(
    new Array<CustomerDetails>()
  );
  useEffect(() => {
    createCustomerDetailsTable();
    getCustomerDetails(setCustCardData);
    dispatch(GetCampaignDataRequest({}));
    dispatch(CompanyTypeRequest(""));
    dispatch(IndustryTypeRequest(""));
  }, [isFocused]);

  const submitLeadDetails = useFormik({
    initialValues: formHelper.formikInitialValue,
    onSubmit: async (values) => {},
  });

  const addToCart = () => {
    const data = submitLeadDetails.values;
    const cartData: CustomerDetails = {
      alternativeMobileNumber: data.alternativeMobileNumber,
      customerName: data.customerName,
      email: data.email,
      mobileNumber: data.mobileNumber,
      ID: 0,
    };
    addCustomerDetails(cartData, setCustCardData);
  };

  const renderDetailsHeaderOne = (headerName: string) => {
    return (
      <View style={style.headerDetailsView}>
        <Text style={style.headerDetailsTxt}>{headerName}</Text>
        <AntDesign
          name={companyDetails ? "arrowdown" : "arrowup"}
          onPress={() => setCompanyDetails(!companyDetails)}
          size={24}
          style={style.headerDetailsIcon}
        />
      </View>
    );
  };
  const renderDetailsHeaderTwo = (headerName: string) => {
    return (
      <View style={style.headerDetailsView}>
        <Text style={style.headerDetailsTxt}>{headerName}</Text>
        <AntDesign
          name={custDetails ? "arrowdown" : "arrowup"}
          onPress={() => setCustDetails(!custDetails)}
          size={24}
          style={style.headerDetailsIcon}
        />
      </View>
    );
  };
  const renderCustCartList = () => {
    return (
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingRight: "30%" }}
        keyboardShouldPersistTaps="always"
      >
        {custCartData && custCartData.length ? (
          <>
            {custCartData.map((item, i) => (
              <View style={style.cartCard} key={i}>
                <View style={style.cartView}>
                  <Text style={style.cartTxt}>{item.customerName}</Text>
                </View>
                <View style={style.cartView}>
                  <Text style={style.cartTxt}>{item.email}</Text>
                </View>
                <View style={style.cartView}>
                  <Text style={style.cartTxt}>{item.mobileNumber}</Text>
                </View>
                <TouchableOpacity
                  style={style.cartBtnView}
                  onPress={() => {
                    deleteCustomer(item.ID, setCustCardData);
                  }}
                >
                  <Text style={style.cartBtnTxt}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
    );
  };
  const renderAddCust = () => {
    return (
      <View style={{ marginHorizontal: "2%" }}>
        <View style={style.cardView}>
          {renderDetailsHeaderOne("Company Details")}
          {companyDetails ? (
            <>
              {/* Campaign Name */}
              <Text style={style.labelText}>Campaign Name:</Text>
              <View style={{ marginVertical: "2%" }}>
                <CDSDropDown
                  placeholder="Select campaign type"
                  data={GetCampaignData(getCampaignData)}
                  onSelect={(val) => {
                    submitLeadDetails.setFieldValue("campaignID", val.value);
                  }}
                />
              </View>

              {/* Company Name */}
              <Text style={style.labelText}>Company Name:</Text>
              <TextInput
                style={style.inputTxt}
                placeholder="Enter Company Name"
                placeholderTextColor={"grey"}
                value={submitLeadDetails.values.companyName}
                onChangeText={(val) => {
                  submitLeadDetails.setFieldValue("companyName", val);
                }}
              />
              {/* Company Type */}
              <Text style={style.labelText}>Company Type:</Text>
              <View style={{ marginVertical: "2%" }}>
                <CDSDropDown
                  placeholder="Select company type"
                  data={GetCompanyType(CompanyType)}
                  onSelect={(val) => {
                    submitLeadDetails.setFieldValue("companyTypeID", val.value);
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
                    submitLeadDetails.setFieldValue(
                      "industryTypeId",
                      val.value
                    );
                  }}
                />
              </View>
              {/* Location */}
              <Text style={style.labelText}>Location:</Text>
              <TextInput
                style={style.inputTxt}
                placeholder="Enter Location"
                placeholderTextColor={"grey"}
                value={submitLeadDetails.values.location}
                onChangeText={(val) => {
                  submitLeadDetails.setFieldValue("location", val);
                }}
              />
              {/* Pincode */}
              <Text style={style.labelText}>Pincode:</Text>
              <TextInput
                style={style.inputTxt}
                placeholder="Enter Pincode"
                placeholderTextColor={"grey"}
                value={submitLeadDetails.values.pinCode}
                onChangeText={(val) => {
                  submitLeadDetails.setFieldValue("pinCode", val);
                }}
              />
            </>
          ) : null}
          {renderDetailsHeaderTwo("Customer Details")}
          {custDetails ? (
            <>
              {/* Customer Name */}
              <Text style={style.labelText}>Customer Name:</Text>
              <TextInput
                value={submitLeadDetails.values.customerName}
                onChangeText={(val) => {
                  submitLeadDetails.setFieldValue("customerName", val);
                }}
                style={style.inputTxt}
                placeholder="Enter Customer Name"
                placeholderTextColor={"grey"}
              />
              {/* Mobile Number */}
              <Text style={style.labelText}>Mobile Number:</Text>
              <TextInput
                value={submitLeadDetails.values.mobileNumber}
                onChangeText={(val) => {
                  submitLeadDetails.setFieldValue("mobileNumber", val);
                }}
                style={style.inputTxt}
                placeholder="Enter Mobile Number"
                placeholderTextColor={"grey"}
              />
              {/* Alternative Mobile Number */}
              <Text style={style.labelText}>Alternative Mobile Number:</Text>
              <TextInput
                value={submitLeadDetails.values.alternativeMobileNumber}
                onChangeText={(val) => {
                  submitLeadDetails.setFieldValue(
                    "alternativeMobileNumber",
                    val
                  );
                }}
                style={style.inputTxt}
                placeholder="Enter Alternative Mobile Number"
                placeholderTextColor={"grey"}
              />
              {/* Email */}
              <Text style={style.labelText}>Email:</Text>
              <TextInput
                value={submitLeadDetails.values.email}
                onChangeText={(val) => {
                  submitLeadDetails.setFieldValue("email", val);
                }}
                style={style.inputTxt}
                placeholder="Enter Email"
                placeholderTextColor={"grey"}
              />

              <TouchableOpacity
                style={style.addBtnView}
                onPress={() => addToCart()}
              >
                <FontAwesome6 name="add" size={24} style={style.addBtnIcon} />
                <Text style={style.addBtnTxt}>Add to customer</Text>
              </TouchableOpacity>
              {renderCustCartList()}
            </>
          ) : null}
        </View>
      </View>
    );
  };
  const renderScanQR = () => {
    return (
      <View style={{ marginHorizontal: "2%" }}>
        <View style={style.cardView}>
          <Text style={style.qrText}>Scan QR Code to continue</Text>
          <AntDesign name="qrcode" size={100} style={style.qrIcon} />
        </View>
      </View>
    );
  };
  const renderAttachVC = () => {
    return (
      <View style={{ marginHorizontal: "2%" }}>
        <View style={style.cardView}>
          {/* Mobile Number */}
          <Text style={style.labelText}>Mobile Number:</Text>
          <TextInput
            style={style.inputTxt}
            placeholder="Enter Mobile Number"
            placeholderTextColor={"grey"}
          />
          {/* Mobile Number */}
          <Text style={style.labelText}>Attach Visiting Card:</Text>
          <AntDesign name="camera" size={30} style={style.cameraIcon} />
        </View>
      </View>
    );
  };
  enum leadDetailOption {
    ADD_CUSTOMER = "ADD_CUSTOMER",
    SCAN = "SCAN",
    ATTACH = "ATTACH",
  }
  const [detailsOpt, setDetailsOpt] = useState<leadDetailOption>(
    leadDetailOption.ADD_CUSTOMER
  );
  return (
    <View>
      <View style={style.optionView}>
        <Text
          onPress={() => setDetailsOpt(leadDetailOption.ADD_CUSTOMER)}
          style={
            detailsOpt == leadDetailOption.ADD_CUSTOMER
              ? style.optionTxtActive
              : style.optionTxt
          }
        >
          {"Add\n Customer Data"}
        </Text>
        <Text
          onPress={() => setDetailsOpt(leadDetailOption.SCAN)}
          style={
            detailsOpt == leadDetailOption.SCAN
              ? style.optionTxtActive
              : style.optionTxt
          }
        >
          {"Scan\n QR Code"}
        </Text>
        <Text
          onPress={() => setDetailsOpt(leadDetailOption.ATTACH)}
          style={
            detailsOpt == leadDetailOption.ATTACH
              ? style.optionTxtActive
              : style.optionTxt
          }
        >
          {"Attach\n Visiting Card"}
        </Text>
      </View>
      <ScrollView keyboardShouldPersistTaps="always">
        {detailsOpt == leadDetailOption.ADD_CUSTOMER
          ? renderAddCust()
          : detailsOpt == leadDetailOption.SCAN
          ? renderScanQR()
          : renderAttachVC()}
      </ScrollView>
    </View>
  );
};
export default LeadDetails;

const style = StyleSheet.create({
  cartCard: {
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    backgroundColor: "white",
    marginVertical: "2%",
    padding: "1.5%",
    marginRight: "2%",
  },
  cartView: {
    flexDirection: "row",
  },

  cartTxt: {
    flex: 1,
    fontWeight: "400",
  },
  cartIcon: { flex: 1 },
  cartBtnView: {
    backgroundColor: "#d90404",
    padding: "2%",
    borderRadius: 8,
    margin: "2%",
  },
  cartBtnTxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
  headerDetailsView: {
    flexDirection: "row",
    paddingVertical: "2%",
    backgroundColor: "#dedfe0",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
    marginVertical: "2%",
  },
  headerDetailsTxt: {
    flex: 1.8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  headerDetailsIcon: {
    flex: 0.2,
    alignItems: "center",
  },
  optionView: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: "1%",
    paddingVertical: "2%",
    justifyContent: "center",
  },
  optionTxt: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "500",
    borderWidth: 0.8,
    borderColor: "white",
    padding: "1%",
    borderTopLeftRadius: 2,
    paddingHorizontal: "4%",
    backgroundColor: "black",
    color: "white",
  },
  optionTxtActive: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "500",
    borderWidth: 0.8,
    borderColor: "black",
    padding: "1%",
    borderTopLeftRadius: 2,
    paddingHorizontal: "4%",
    backgroundColor: "white",
    height: "120%",
  },
  formView: {
    marginHorizontal: "3%",
    marginVertical: "1%",
    padding: "1%",
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    backgroundColor: "white",
    paddingHorizontal: "4%",
    paddingVertical: "4%",
  },
  headerView: {
    flexDirection: "row",
  },
  headerTxt: {
    flex: 1.8,
    fontWeight: "500",
    fontSize: 16,
  },
  headerIcon: {
    flex: 0.2,
  },
  cardView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#d6d4d4",
    borderBottomColor: "#d6d4d4",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 6,
    backgroundColor: "white",
    padding: "2%",
  },
  qrText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
  },
  qrIcon: {
    textAlign: "center",
  },
  acvView: {
    flexDirection: "row",
    marginVertical: "1%",
  },
  avcText: {
    flex: 0.8,
    fontWeight: "500",
    textAlignVertical: "center",
  },
  acvIcon: {
    flex: 1.2,
  },
  acvTxtInput: {
    flex: 1.2,
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    paddingHorizontal: "2%",
  },
  labelText: {
    fontSize: 15,
    fontWeight: "500",
  },
  inputTxt: {
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    marginVertical: "2%",
    padding: "3%",
  },
  btn: {
    backgroundColor: "black",
    padding: "2%",
    borderRadius: 8,
    marginVertical: "2%",
    marginHorizontal: "4%",
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
  cameraIcon: {
    marginVertical: "2%",
  },
  addBtnView: {
    flexDirection: "row",
    padding: "2%",
    alignSelf: "flex-end",
    width: "50%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#5c5c5c",
  },
  addBtnIcon: {
    flex: 0.2,
    color: "white",
  },
  addBtnTxt: {
    flex: 0.8,
    textAlignVertical: "center",
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
});
