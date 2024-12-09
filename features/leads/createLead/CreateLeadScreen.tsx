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
import { style } from "./CreateLeadStyle";
import { DisplayToast } from "../../../utility/ToastMessage";
import { useEffect, useState } from "react";
import LeadDetails from "../stepperScreens/leadDetails/LeadDetails";
import MachineDetails from "../stepperScreens/machineDetails/MachineDetails";
import OtherDetails from "../stepperScreens/otherDetails/OtherDetails";
import UserConsent from "../stepperScreens/userConsent/UserConsent";
import { AddCustomerData } from "../stepperScreens/leadDetails/LeadDetailsHelper";
import { MachineDetailsData } from "../stepperScreens/machineDetails/machineDetailsDao/MachineDetails";
import { SaveLeadReq } from "../../../types/leadTypes/CreateLeadTypes";
import { SaveLeadRequest } from "../../../services/leadsServices/SaveLeadDataRequest";
import CDSAlertBox from "../../../component/CDSAlertBox";
import CDSLoader from "../../../component/CDSLoader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { GetLeadDataRequest } from "../../../services/leadsServices/GetLeadDataRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

type CreateLeadScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateLead"
>;

export interface OtherDetailsData {
  purchaseTimeline: string;
  financingRequired: boolean;
  noOfMachines: number;
  noOfPeople: number;
  noOfGifts: number;
}
export interface FormState {
  formOne: boolean;
  formTwo: boolean;
  formThree: boolean;
  formFour: boolean;
}
const CreateLeadScreen: React.FC<CreateLeadScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const [addCustomerData, setAddCustomerData] = useState<AddCustomerData>({
    campaignID: 0,
    companyName: "",
    companyTypeID: 0,
    customerArray: [],
    industryTypeId: 0,
    location: "",
    pinCode: "",
  });
  const [machineDetails, setMachineDetails] = useState<
    Array<MachineDetailsData>
  >(new Array<MachineDetailsData>());
  const [alertState, setAlertState] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const [otherDetails, setOtherDetails] = useState<OtherDetailsData>({
    financingRequired: false,
    noOfGifts: 0,
    noOfMachines: 0,
    noOfPeople: 0,
    purchaseTimeline: "",
  });
  const [allFormState, setAllFormState] = useState<FormState>({
    formOne: false,
    formTwo: false,
    formThree: false,
    formFour: false,
  });
  const [sbuID, setSBUId] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        setSBUId(user.message.user.sbuId);
      }
    });
  }, [isFocused, sbuID]);
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
          placeholderTextColor={"grey"}
        />
        {/* Model Number */}
        <Text style={style.labelText}>Model Number:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Model Number"
          placeholderTextColor={"grey"}
        />
        {/* No. Of Machines */}
        <Text style={style.labelText}>No. Of Machines:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. Of Machines"
          placeholderTextColor={"grey"}
        />
        {/* Planning Timeline */}
        <Text style={style.labelText}>Planning Timeline:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Planning Timeline"
          placeholderTextColor={"grey"}
        />
        {/* Financing Required */}
        <Text style={style.labelText}>Financing Required:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Financing Required"
          placeholderTextColor={"grey"}
        />
        {/* No. of People Accompained */}
        <Text style={style.labelText}>No. of People Accompained:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No. of People Accompained"
          placeholderTextColor={"grey"}
        />
        {/* No of Gifts Needed */}
        <Text style={style.labelText}>No of Gifts Needed:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter No of Gifts Needed"
          placeholderTextColor={"grey"}
        />
      </View>
    );
  };
  enum CurrentSteeperScreen {
    LEAD_DETAILS = "LEAD_DETAILS",
    SELECT_MACHINE = "MACHIN_DETAILS",
    OTHER_DETAILS = "OTHER_DETAILS",
    USER_CONSENT = "USER_CONSENT",
  }
  const [stepperScreen, setStepperScreen] = useState<CurrentSteeperScreen>(
    CurrentSteeperScreen.LEAD_DETAILS
  );
  const handleContinueBtn = (screen: CurrentSteeperScreen) => {
    switch (screen) {
      case CurrentSteeperScreen.LEAD_DETAILS:
        return setStepperScreen(CurrentSteeperScreen.SELECT_MACHINE);
        break;
      case CurrentSteeperScreen.SELECT_MACHINE:
        return setStepperScreen(CurrentSteeperScreen.OTHER_DETAILS);
        break;
      case CurrentSteeperScreen.OTHER_DETAILS:
        return setStepperScreen(CurrentSteeperScreen.USER_CONSENT);
        break;
      default:
        break;
    }
  };
  const handleBackBtn = (screen: CurrentSteeperScreen) => {
    switch (screen) {
      case CurrentSteeperScreen.SELECT_MACHINE:
        return setStepperScreen(CurrentSteeperScreen.LEAD_DETAILS);
        break;
      case CurrentSteeperScreen.OTHER_DETAILS:
        return setStepperScreen(CurrentSteeperScreen.SELECT_MACHINE);
        break;
      case CurrentSteeperScreen.USER_CONSENT:
        return setStepperScreen(CurrentSteeperScreen.OTHER_DETAILS);
        break;
      default:
        break;
    }
  };
  const renderSteppers = () => {
    return (
      <View>
        <View style={style.stepperView}>
          <View style={style.stepperLine} />
          <Text
            style={
              stepperScreen == CurrentSteeperScreen.LEAD_DETAILS
                ? style.steeperTextActive
                : style.steeperTextInActive
            }
            onPress={() => {
              // setStepperScreen(CurrentSteeperScreen.LEAD_DETAILS);
            }}
          >
            {"Lead\n Details"}
          </Text>
          <View style={style.stepperLine} />
          <Text
            style={
              stepperScreen == CurrentSteeperScreen.SELECT_MACHINE
                ? style.steeperTextActive
                : style.steeperTextInActive
            }
            onPress={() => {
              //setStepperScreen(CurrentSteeperScreen.SELECT_MACHINE);
            }}
          >
            {"Select\n Machine"}
          </Text>
          <View style={style.stepperLine} />
          <Text
            style={
              stepperScreen == CurrentSteeperScreen.OTHER_DETAILS
                ? style.steeperTextActive
                : style.steeperTextInActive
            }
            onPress={() => {
              //setStepperScreen(CurrentSteeperScreen.OTHER_DETAILS);
            }}
          >
            {"Other\n Details"}
          </Text>
          <View style={style.stepperLine} />
          <Text
            style={
              stepperScreen == CurrentSteeperScreen.USER_CONSENT
                ? style.steeperTextActive
                : style.steeperTextInActive
            }
            onPress={() => {
              //setStepperScreen(CurrentSteeperScreen.USER_CONSENT);
            }}
          >
            {"User\n Consent"}
          </Text>
          <View style={style.stepperLine} />
        </View>
      </View>
    );
  };
  const [isLeadDetailsFilled, setIsLeadDetailsFilled] = useState(false);
  const checkFormState = () => {
    if (
      !allFormState.formOne &&
      stepperScreen == CurrentSteeperScreen.LEAD_DETAILS
    ) {
      DisplayToast("Please save lead details");
      return false;
    } else if (
      !allFormState.formTwo &&
      stepperScreen == CurrentSteeperScreen.SELECT_MACHINE
    ) {
      DisplayToast("Please save machine details");
      return false;
    } else if (
      !allFormState.formThree &&
      stepperScreen == CurrentSteeperScreen.OTHER_DETAILS
    ) {
      DisplayToast("Please save other details details");
      return false;
    } else {
      return true;
    }
  };
  const SaveLeadData = async () => {
    setLoaderState(true);
    const payload: SaveLeadReq = {
      orgId: 1,
      sbuId: 1,
      campaignId: Number(addCustomerData.campaignID),
      industryTypeId: Number(addCustomerData.industryTypeId),
      companyType: Number(addCustomerData.companyTypeID),
      companyName: addCustomerData.companyName,
      address: addCustomerData.location,
      pincode: Number(addCustomerData.pinCode),
      stateId: 2,
      districtId: 13,
      productsInterested: machineDetails.map((item) => ({
        modelId: Number(item.productModelID),
        productFamilyId: Number(item.productFamilyID),
        productId: Number(item.productID),
        sbuId: Number(item.sbuId),
        noOfMachines: Number(item.noOfMachines),
      })),
      attachmentId: 0,
      giftVoucher: "",
      gvDisbursement: "",

      visitorDetails: addCustomerData.customerArray.map((item) => ({
        email: item.email,
        mobileNo: item.mobileNumber,
        visitorName: item.customerName,
        sbuId: sbuID,
      })),
      status: true,
      noOfMachines: otherDetails.noOfMachines,
      planningTimeline: otherDetails.purchaseTimeline,
      financingReuired: otherDetails.financingRequired,
      noOfPeopleAccompanied: otherDetails.noOfPeople,
      noOfGiftsNeeded: otherDetails.noOfGifts,
    };
    console.warn("Create Lead Submit Request", payload);

    const resp = await SaveLeadRequest(payload);
    setLoaderState(resp ? false : true);
    if (resp && resp.statusCode == 201) {
      setAlertState(true);
    } else {
      DisplayToast(`${resp.message}`);
    }
  };
  const renderLeadForm = () => {
    return (
      <>
        <CDSAlertBox
          alertVisibility={alertState}
          alertTitle="Create Lead"
          alertDesc="Lead created successfully!"
          showNegativeBtn={false}
          positiveBtnTxt="Cancel"
          negativeBtnTxt="Ok"
          onNegativeClick={() => {
            setAlertState(false);
            props.navigation.navigate("Leads");
          }}
          onPositiveClick={() => {
            setAlertState(false);
          }}
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: "50%" }}
          keyboardShouldPersistTaps="handled"
        >
          {stepperScreen == CurrentSteeperScreen.LEAD_DETAILS ? (
            <LeadDetails
              setFormData={setAddCustomerData}
              setAllFormState={setAllFormState}
              allFormState={allFormState}
            />
          ) : stepperScreen == CurrentSteeperScreen.SELECT_MACHINE ? (
            <MachineDetails
              setFormData={setMachineDetails}
              setAllFormState={setAllFormState}
              allFormState={allFormState}
              companyType={+addCustomerData.companyTypeID}
            />
          ) : stepperScreen == CurrentSteeperScreen.OTHER_DETAILS ? (
            <OtherDetails
              setOtherDetails={setOtherDetails}
              setAllFormState={setAllFormState}
              allFormState={allFormState}
              companyType={+addCustomerData.companyTypeID}
            />
          ) : stepperScreen == CurrentSteeperScreen.USER_CONSENT ? (
            <UserConsent
              setAllFormState={setAllFormState}
              allFormState={allFormState}
              sbuID={machineDetails.length ? machineDetails[0].sbuId : 0}
            />
          ) : null}
          <View style={{ flexDirection: "row" }}>
            {stepperScreen != CurrentSteeperScreen.LEAD_DETAILS ? (
              <TouchableOpacity
                style={style.btn}
                onPress={() => {
                  handleBackBtn(stepperScreen);
                }}
              >
                <Text style={style.btnText}>Back</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={style.btn}
              onPress={() => {
                if (checkFormState()) {
                  handleContinueBtn(stepperScreen);
                  if (stepperScreen == CurrentSteeperScreen.USER_CONSENT) {
                    SaveLeadData();
                  }
                }
              }}
            >
              <Text style={style.btnText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  };
  return (
    <ImageBackground
      source={require("../../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      {loaderState ? (
        <CDSLoader />
      ) : (
        <>
          {renderSteppers()}
          {renderLeadForm()}
        </>
      )}
    </ImageBackground>
  );
};
export default CreateLeadScreen;
