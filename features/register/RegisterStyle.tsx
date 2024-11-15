import { Platform, StyleSheet } from "react-native";
import { APP_THEME_COLOR } from "../../constants/Colors";

export const style = StyleSheet.create({
  iconView: {
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#fcba03",
    borderRadius: 10,
    padding: "2%",
    marginTop: "4%",
    alignSelf: "center",
  },
  txtOne: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fcba03",
  },
  txtSymbol: {
    color: "#fcba03",
  },
  txtTwo: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: "-3%",
  },
  txtThree: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: "-3%",
  },
  createAcc: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
    color: "grey",
    marginBottom: "2%",
  },
  registerBoxView: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d6d6d6",
    padding: "2%",
    margin: "2%",
  },
  signUpBtnView: {
    backgroundColor: "black",
    padding: "2%",
    borderRadius: 8,
    margin: "2%",
  },
  txView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    marginVertical: "2%",
    paddingHorizontal: "2%",
    padding: Platform.OS == "ios" ? "2%" : "0%",
  },
  leftIcon: {
    color: APP_THEME_COLOR,
    alignSelf: "center",
  },
  txtInput: {
    marginLeft: "2%",
    fontSize: 14,
    fontWeight: "500",
  },
  signUpBtnTxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
});
export default style;
