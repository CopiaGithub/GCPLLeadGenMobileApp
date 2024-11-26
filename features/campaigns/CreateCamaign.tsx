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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useIsFocused } from "@react-navigation/native";
import { StateRequest } from "../../services/stateRequest/StateRequest";
import CDSDropDown from "../login/CDSDropDown";
import {
  GetCampaignType,
  GetDistrict,
  GetOrgData,
  GetStates,
} from "./CampaignUtility";
import { DistrictRequest } from "../../services/districtRequest/DistrictRequest";
import { CampaignTypeRequest } from "../../services/campaignTypeRequest/CampaignTypeRequest";
import CreateCampaignHelper, {
  ICreateCampaignForm,
} from "./CreateCampaignHelper";
import { useFormik } from "formik";
import { DisplayToast } from "../../utility/ToastMessage";
import { CreateCampaignRequest } from "../../services/campaignRequest/CreateCampaignRequest";
import { CreateCampaignReq } from "../../types/campaignTypes/CreateCampaignTypes";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { OrganizationRequest } from "../../services/organizationRequest/OrganizationRequest";
import CDSLoader from "../../component/CDSLoader";
import CDSAlertBox from "../../component/CDSAlertBox";

type CreateCampaignScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateCampaign"
>;

const CreateCampaignScreen: React.FC<CreateCampaignScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const formHelper = new CreateCampaignHelper();
  const { states } = useSelector((state: RootState) => state.stateData);
  const { districts } = useSelector((state: RootState) => state.districtData);
  const { capmpaignTypes } = useSelector(
    (state: RootState) => state.campaignTypeData
  );

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const [alertState, setAlertState] = useState(false);

  const { orgData } = useSelector((state: RootState) => state.orgnizationData);

  useEffect(() => {
    if (isFocused) {
      dispatch(OrganizationRequest({}));
      dispatch(CampaignTypeRequest(""));
      dispatch(StateRequest(null));
    }
  }, [isFocused]);

  const submitCampaignData = useFormik({
    initialValues: formHelper.formikInitialValue,
    onSubmit: async (values) => {
      console.warn(values);
      if (isValid(values)) {
        setLoaderState(true);
        const reqPayload: CreateCampaignReq = {
          campaignName: values.campaignName,
          // campaignObjective: values.campaignObjective,
          campaignTypeId: values.campaignTypeID,
          description: values.campaignObjective,
          // districtID: values.districtID,
          fromDate: moment(values.fromDate, "DD, MMM YYYY").format(
            "YYYY-MM-DD"
          ),
          // location: values.location,
          orgId: values.organizationID,
          // stateID: values.stateID,
          toDate: moment(values.toDate, "DD, MMM YYYY").format("YYYY-MM-DD"),
        };
        const resp = await CreateCampaignRequest(reqPayload);
        setLoaderState(resp ? false : true);
        if (resp && resp.statusCode == 201) {
          setAlertState(true);
          props.navigation.navigate("Campaigns");
        } else {
          DisplayToast(`${resp.message}`);
        }
      }
    },
  });
  const isValid = (values: ICreateCampaignForm) => {
    if (!values.campaignName) {
      DisplayToast("Please enter campaign name");
      return false;
    } else if (values.campaignTypeID == 0) {
      DisplayToast("Please select campaign type");
      return false;
    } else if (values.organizationID == 0) {
      DisplayToast("Please select organization");
      return false;
    } else if (values.stateID == 0) {
      DisplayToast("Please select state");
      return false;
    } else if (values.districtID == 0) {
      DisplayToast("Please select district");
      return false;
    } else if (!values.location) {
      DisplayToast("Please enter location");
      return false;
    } else if (!values.campaignObjective) {
      DisplayToast("Please enter campaign objective");
      return false;
    }
    return true;
  };
  const renderCreateCampaignView = () => {
    return (
      <View style={style.createView}>
        {/* Campaign Name */}
        <Text style={style.labelText}>Campaign Name:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Campaign Name"
          placeholderTextColor={"grey"}
          value={submitCampaignData.values.campaignName}
          onChangeText={(val) => {
            submitCampaignData.setFieldValue("campaignName", val);
          }}
        />
        {/* Campaign Type */}
        <Text style={style.labelText}>Campaign Type:</Text>
        <CDSDropDown
          data={GetCampaignType(capmpaignTypes)}
          onSelect={(val) => {
            submitCampaignData.setFieldValue(
              "campaignTypeID",
              Number(val.value)
            );
          }}
          placeholder="Select campaign type"
          hasSearchOperation={false}
        />
        {/* Dates */}
        <View style={{ flexDirection: "row", marginVertical: "2%" }}>
          {/* From Date */}
          <View style={{ flex: 1 }}>
            <Text style={style.labelText}>From Date:</Text>
            <CDSDatePicker
              dateFormat="YYYY-MM-DD"
              date={submitCampaignData.values.fromDate}
              onDateTap={(val) => {
                submitCampaignData.setFieldValue("fromDate", val);
              }}
            />
          </View>
          {/* To Date */}
          <View style={{ flex: 1, marginLeft: "2%" }}>
            <Text style={style.labelText}>To Date:</Text>
            <CDSDatePicker
              dateFormat="YYYY-MM-DD"
              date={submitCampaignData.values.toDate}
              onDateTap={(val) => {
                submitCampaignData.setFieldValue("toDate", val);
              }}
            />
          </View>
        </View>
        {/* Organization */}
        <Text style={style.labelText}>Organization:</Text>
        <CDSDropDown
          data={GetOrgData(orgData)}
          hasSearchOperation={true}
          searchPlaceholder="Search orgnization"
          leftIcon={() => (
            <SimpleLineIcons
              name="organization"
              size={24}
              style={style.leftIcon}
            />
          )}
          onSelect={(val) => {
            submitCampaignData.setFieldValue(
              "organizationID",
              Number(val.value)
            );
          }}
          hasLeftIcon={true}
          placeholder="Please select Organization"
        />
        {/* State */}
        <Text style={style.labelText}>State:</Text>
        <CDSDropDown
          data={GetStates(states)}
          onSelect={(val) => {
            submitCampaignData.setFieldValue("stateID", Number(val.value));
            dispatch(DistrictRequest(Number(val.value)));
          }}
          hasSearchOperation
          placeholder="Select State"
          searchPlaceholder="Search State"
        />
        {/* District */}
        <Text style={style.labelText}>District:</Text>
        <CDSDropDown
          data={GetDistrict(districts)}
          onSelect={(val) => {
            submitCampaignData.setFieldValue("districtID", Number(val.value));
          }}
          hasSearchOperation
          placeholder="Select State"
          searchPlaceholder="Search State"
        />
        {/* Location */}
        <Text style={style.labelText}>Location:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Location"
          placeholderTextColor={"grey"}
          value={submitCampaignData.values.location}
          onChangeText={(val) => {
            submitCampaignData.setFieldValue("location", val);
          }}
        />
        {/* Campaign Objective */}
        <Text style={style.labelText}>Campaign Objective:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Campaign Objective"
          placeholderTextColor={"grey"}
          value={submitCampaignData.values.campaignObjective}
          onChangeText={(val) => {
            submitCampaignData.setFieldValue("campaignObjective", val);
          }}
        />
      </View>
    );
  };
  const renderBtn = () => {
    return (
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          submitCampaignData.handleSubmit();
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
      <CDSAlertBox
        alertVisibility={alertState}
        alertTitle="Campaign"
        alertDesc="Campaign created successfully!"
        showNegativeBtn={false}
        positiveBtnTxt="Cancel"
        negativeBtnTxt="Ok"
        onNegativeClick={() => {
          setAlertState(false);
        }}
        onPositiveClick={() => {
          setAlertState(false);
        }}
      />
      {loaderState ? (
        <CDSLoader />
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ paddingBottom: "50%" }}
        >
          {renderCreateCampaignView()}
          {renderBtn()}
        </ScrollView>
      )}
    </ImageBackground>
  );
};
export default CreateCampaignScreen;
