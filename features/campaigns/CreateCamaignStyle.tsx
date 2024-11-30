import { Platform, StyleSheet } from "react-native";
import { APP_THEME_COLOR } from "../../constants/Colors";

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
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  selected: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  leftIcon: {
    color: APP_THEME_COLOR,
    alignSelf: "center",
  },
});
