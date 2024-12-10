import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RadioButtonsGroup, {
  RadioButtonProps,
} from "react-native-radio-buttons-group";
import { FormState } from "../../createLead/CreateLeadScreen";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { SBUMasterRequest } from "../../../../services/sbuMasterRequest.tsx/SBUMasterRequest";
import { GetSBUNameById } from "../machineDetails/MachineDetailsUtility";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserConsentProps = {
  setAllFormState: React.Dispatch<React.SetStateAction<FormState>>;
  allFormState: FormState;
  sbuID: number;
};

const UserConsent: React.FC<UserConsentProps> = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedValue, setSelectedValue] = useState("1");
  const { sbuMaster } = useSelector((state: RootState) => state.sbuMaster);
  const [roleId, setRoleId] = useState(0);
  const [userSBUId, setUserSBUId] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        setUserSBUId(user.message.user.sbuId);
        setRoleId(user.message.user.roleId);
      }
    });
  }, [isFocused, roleId]);
  useEffect(() => {
    if (isFocused) {
      dispatch(SBUMasterRequest(null));
    }
  }, [isFocused]);
  const [sbuName, setSBUName] = useState(
    roleId && roleId == 1
      ? GetSBUNameById(sbuMaster, userSBUId)
      : GetSBUNameById(sbuMaster, props.sbuID)
  );
  const radioButtonsData: RadioButtonProps[] = [
    {
      id: "1",
      label: `Yes, I'd like to receive future marketing (e.g. new product information,promotions) email communications from ${
        roleId == 1
          ? GetSBUNameById(sbuMaster, props.sbuID)
          : GetSBUNameById(sbuMaster, userSBUId)
      } (${
        roleId == 1
          ? GetSBUNameById(sbuMaster, props.sbuID)
          : GetSBUNameById(sbuMaster, userSBUId)
      } Inc. and its affiliates & subsidiaries). You can withdraw your consent at any time. Regardless of whether you decide to receive these marketing communications, ${
        roleId == 1
          ? GetSBUNameById(sbuMaster, props.sbuID)
          : GetSBUNameById(sbuMaster, userSBUId)
      } will continue to send service/ transactional messages, including those that have to do with any accounts you may have with us. Please refer to our Global Data Privacy Statement for more information about ${
        roleId == 1
          ? GetSBUNameById(sbuMaster, props.sbuID)
          : GetSBUNameById(sbuMaster, userSBUId)
      }'s data privacy practices and rights that you may have.`,
    },
    {
      id: "2",
      label:
        "No, I would not like to receive future marketing email communications.",
    },
  ];
  return (
    <View style={styles.container}>
      <RadioButtonsGroup
        radioButtons={radioButtonsData}
        onPress={(val) => setSelectedValue(val)}
        selectedId={selectedValue}
        containerStyle={styles.rbContainer}
      />
    </View>
  );
};
export default UserConsent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rbContainer: {
    margin: "4%",
  },
  btn: {
    backgroundColor: "black",
    padding: "2%",
    borderRadius: 8,
    marginVertical: "2%",
    marginHorizontal: "4%",
    width: "90%",
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
});
