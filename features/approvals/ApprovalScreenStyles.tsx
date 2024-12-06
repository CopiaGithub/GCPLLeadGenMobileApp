import { Platform, StyleSheet } from "react-native";
import { APP_THEME_COLOR } from "../../constants/Colors";

export const style = StyleSheet.create({
  headerIcon: {
    marginRight: "8%",
  },
  searchView: {
    margin: "4%",
    padding: "14%",
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: "4%",
    paddingVertical: Platform.OS == "ios" ? "3%" : "auto",
  },
  searchIcon: {
    flex: 0.2,
    alignSelf: "center",
    color: APP_THEME_COLOR,
  },
  searchTxtInput: {
    flex: 1.8,
    fontSize: 15,
    fontWeight: "500",
    margin: "4%",
  },
  itemView: {
    marginVertical: "2%",
    marginHorizontal: "4%",
    padding: "1%",
    borderWidth: 1,
    borderColor: "#d6d4d4",
    borderRadius: 8,
    backgroundColor: "white",
    paddingHorizontal: "4%",
    paddingVertical: "3%",
  },
  txtView: {
    flexDirection: "row",
    marginVertical: "0.5%",
  },
  keyText: {
    flex: 0.7,
    fontWeight: "500",
  },
  valueText: {
    flex: 1.1,
  },
  extra: {
    flex: 0.2,
    alignSelf: "center",
  },
  btnsView: {
    flexDirection: "row",
    marginVertical: "2%",
  },
  approveBtnTxt: {
    fontWeight: "500",
    textAlign: "center",
    color: "white",
  },
  rejectBtnTxt: {
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  approveBtn: {
    flex: 1,
    backgroundColor: APP_THEME_COLOR,
    padding: "2%",
    borderRadius: 8,
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: "black",
    padding: "2%",
    marginLeft: "2%",
    borderRadius: 8,
  },
});
