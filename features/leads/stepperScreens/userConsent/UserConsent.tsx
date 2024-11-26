import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RadioButtonsGroup, {
  RadioButtonProps,
} from "react-native-radio-buttons-group";

type UserConsentProps = {};

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
});
