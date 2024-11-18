import {
  Platform,
  StyleSheet,
  View,
  Text,
  DimensionValue,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import type { CdsPickerModel } from "../types/CdsPickerModel";
import { Dropdown } from "react-native-element-dropdown";
import { Overlay } from "react-native-elements";
import { useState } from "react";

type CDSAlertBoxProps = {
  alertTitle: string;
  alertDesc: string;
  showNegativeBtn?: boolean;
  onPositiveClick: () => void;
  onNegativeClick: () => void;
  positiveBtnTxt: string;
  negativeBtnTxt: string;
  alertVisibility: boolean;
};

const CDSAlertBox: React.FC<CDSAlertBoxProps> = (props) => {
  return (
    <Overlay
      isVisible={props.alertVisibility}
      overlayStyle={styles.overlayStyle}
    >
      <View>
        <Text style={styles.alertTitle}>{props.alertTitle}</Text>
        <Text style={styles.alertDesc}>{props.alertDesc}</Text>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.negativeBtn}
            onPress={props.onNegativeClick}
          >
            <Text style={styles.negativeBtnTxt}>{props.negativeBtnTxt}</Text>
          </TouchableOpacity>
          {props.showNegativeBtn ? (
            <TouchableOpacity
              style={styles.positiveBtn}
              onPress={props.onNegativeClick}
            >
              <Text style={styles.positiveBtnTxt}>{props.positiveBtnTxt}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Overlay>
  );
};
export default CDSAlertBox;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 8,
    borderColor: "black",
    padding: "1%",
    minWidth: "80%",
    maxWidth: "96%",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  alertTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: "black",
    padding: "1%",
    textAlign: "center",
  },
  alertDesc: {
    fontWeight: "400",
    fontSize: 16,
    color: "black",
    padding: "1%",
    textAlign: "center",
  },
  btnView: {
    flexDirection: "row",
    margin: "2%",
  },
  positiveBtn: {
    flex: 1,
    backgroundColor: "#f0f0f2",
    padding: "2%",
    borderRadius: 4,
    marginLeft: "2%",
  },
  negativeBtn: {
    flex: 1,
    backgroundColor: "black",
    padding: "2%",
    borderRadius: 4,
  },
  positiveBtnTxt: {
    textAlign: "center",
    fontWeight: "500",
  },
  negativeBtnTxt: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
});
