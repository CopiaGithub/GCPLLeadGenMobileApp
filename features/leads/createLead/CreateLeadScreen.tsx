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
import { useState } from "react";
import LeadDetails from "../stepperScreens/leadDetails/LeadDetails";
import MachineDetails from "../stepperScreens/machineDetails/MachineDetails";
import OtherDetails from "../stepperScreens/otherDetails/OtherDetails";
import UserConsent from "../stepperScreens/userConsent/UserConsent";

type CreateLeadScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateLead"
>;

const CreateLeadScreen: React.FC<CreateLeadScreenProps> = (props) => {
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
              setStepperScreen(CurrentSteeperScreen.LEAD_DETAILS);
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
              setStepperScreen(CurrentSteeperScreen.SELECT_MACHINE);
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
              setStepperScreen(CurrentSteeperScreen.OTHER_DETAILS);
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
              setStepperScreen(CurrentSteeperScreen.USER_CONSENT);
            }}
          >
            {"User\n Consent"}
          </Text>
          <View style={style.stepperLine} />
        </View>
      </View>
    );
  };
  return (
    <ImageBackground
      source={require("../../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      {renderSteppers()}
      <ScrollView
        contentContainerStyle={{ paddingBottom: "50%" }}
        keyboardShouldPersistTaps="handled"
      >
        {stepperScreen == CurrentSteeperScreen.LEAD_DETAILS ? (
          <LeadDetails />
        ) : stepperScreen == CurrentSteeperScreen.SELECT_MACHINE ? (
          <MachineDetails />
        ) : stepperScreen == CurrentSteeperScreen.OTHER_DETAILS ? (
          <OtherDetails />
        ) : stepperScreen == CurrentSteeperScreen.USER_CONSENT ? (
          <UserConsent />
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
              handleContinueBtn(stepperScreen);
            }}
          >
            <Text style={style.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default CreateLeadScreen;
