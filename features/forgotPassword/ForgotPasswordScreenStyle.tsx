import { Platform, StyleSheet } from "react-native";
import { APP_THEME_COLOR } from "../../constants/Colors";

export const style = StyleSheet.create({
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
    fontWeight: "500",
  },
  boxView: {
    backgroundColor: "white",
    margin: "2%",
    padding: "2%",
    borderWidth: 1,
    borderColor: "#d7d9d7",
    borderRadius: 8,
  },
  sendOTPView: {
    margin: "2%",
    padding: "2%",
    backgroundColor: "black",
    borderRadius: 8,
  },
  sendOTPText: {
    textAlign: "center",
    fontWeight: "500",
    color: "white",
  },
  resendOTP: {
    fontWeight: "600",
    marginHorizontal: "2%",
    color: APP_THEME_COLOR,
    marginBottom: "2%",
  },
  iconView: {
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#fcba03",
    borderRadius: 10,
    padding: "2%",
    marginVertical: "4%",
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
  forgotPass: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "500",
    color: "grey",
    marginBottom: "2%",
  },
});
