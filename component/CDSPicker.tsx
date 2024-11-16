import {
  Platform,
  StyleSheet,
  View,
  Text,
  DimensionValue,
  Dimensions,
} from "react-native";
import type { CdsPickerModel } from "../types/CdsPickerModel";
import { Dropdown } from "react-native-element-dropdown";

type CdsPickerProps = {
  pickerData: Array<CdsPickerModel>;
  onChange: (val: CdsPickerModel) => void;
  isDisable?: boolean;
  value: string;
  pickerWidth?: DimensionValue | undefined;
};

const CdsPicker: React.FC<CdsPickerProps> = (props) => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <Dropdown
      data={props.pickerData}
      labelField="label"
      onChange={(val) => props.onChange(val)}
      valueField="value"
      disable={props.isDisable}
      mode="default"
      value={props.value}
      activeColor="#dee3e0"
      itemContainerStyle={styles.itemContainer}
      containerStyle={styles.container}
      keyboardAvoiding={true}
      style={{
        width: props.pickerWidth ? props.pickerWidth : "90%",
      }}
    />
  );
};
export default CdsPicker;

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 0.8,
    borderColor: "#bbbdbb",
  },
  container: {
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: "#bbbdbb",
  },
});
