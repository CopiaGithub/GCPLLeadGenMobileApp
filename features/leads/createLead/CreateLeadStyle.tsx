import { StyleSheet } from "react-native";
import { APP_THEME_COLOR } from "../../../constants/Colors";

export const style = StyleSheet.create({
  createView: {
    margin: "3%",
    padding: "1%",
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    backgroundColor: "white",
    paddingHorizontal: "4%",
    paddingVertical: "4%",
  },
  labelText: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: "2%",
  },
  inputTxt: {
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    marginVertical: "2%",
    padding: "3%",
  },
  btn: {
    backgroundColor: "black",
    padding: "2%",
    borderRadius: 8,
    marginVertical: "2%",
    marginHorizontal: "4%",
    flex: 1,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
  steeperTextInActive: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    borderRadius: 10,
    backgroundColor: APP_THEME_COLOR,
    padding: "2%",
    color: "white",
    fontWeight: "500",
  },
  stepperView: {
    flexDirection: "row",
    margin: "2%",
    justifyContent: "space-evenly",
  },
  steeperTextActive: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    borderRadius: 10,
    backgroundColor: "black",
    padding: "2%",
    color: "white",
    fontWeight: "500",
  },
  stepperLine: {
    borderBottomWidth: 2,
    borderBottomColor: APP_THEME_COLOR,
    flex: 1,
    alignSelf: "center",
  },
});
