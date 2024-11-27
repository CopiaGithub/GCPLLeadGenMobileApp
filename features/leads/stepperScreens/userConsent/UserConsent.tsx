import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RadioButtonsGroup, {
  RadioButtonProps,
} from "react-native-radio-buttons-group";
import { FormState } from "../../createLead/CreateLeadScreen";

type UserConsentProps = {
  setAllFormState: React.Dispatch<React.SetStateAction<FormState>>;
  allFormState: FormState;
};

const UserConsent: React.FC<UserConsentProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState("1");
  const radioButtonsData: RadioButtonProps[] = [
    {
      id: "1",
      label:
        "Yes, I'd like to receive future marketing (e.g. new product information,promotions) email communications from Caterpillar (Caterpillar Inc. and its affiliates & subsidiaries). You can withdraw your consent at any time. Regardless of whether you decide to receive these marketing communications, Caterpillar will continue to send service/ transactional messages, including those that have to do with any accounts you may have with us. Please refer to our Global Data Privacy Statement for more information about Caterpillar's data privacy practices and rights that you may have.",
    },
    {
      id: "2",
      label:
        "No, I would not like to receive future marketing email communications from Caterpillar Inc.*",
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
      {/* {!props.allFormState.formFour ? (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            props.setAllFormState((val) => ({
              ...val,
              formFour: true,
            }));
          }}
        >
          <Text style={styles.btnText}>Save User Consent</Text>
        </TouchableOpacity>
      ) : null} */}
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
