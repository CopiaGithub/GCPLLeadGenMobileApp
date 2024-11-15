import { StyleSheet } from "react-native";
import { APP_THEME_COLOR } from "../../constants/Colors";

export const style = StyleSheet.create({
  hmView: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d7d9d7",
    padding: "4%",
    flexDirection: "row",
  },
  menuItemView: {
    marginHorizontal: "2%",
  },
  menuIcon: {
    alignSelf: "center",
  },
  menuTxt: {
    fontWeight: "500",
    textAlign: "center",
    textAlignVertical: "center",
    marginVertical: "2%",
  },
  headerNameView: {
    backgroundColor: APP_THEME_COLOR,
    padding: "2%",
    flexDirection: "row",
    borderTopColor: "#d7d9d7",
    borderBottomColor: "#d7d9d7",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  headerTxtValue: {
    flex: 0.7,
    fontWeight: "500",
  },
  headerTxtKey: {
    flex: 1.3,
  },
  countBox: {
    marginVertical: "4%",
    marginHorizontal: "2%",
    borderRadius: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d7d9d7",
    padding: "4%",
  },
  cbText: {
    fontWeight: "600",
    fontSize: 19,
  },
  subCBBox: {
    marginTop: "2%",
    padding: "2%",
    borderRadius: 8,
    backgroundColor: "#f5f0f0",
    borderWidth: 1,
    borderColor: "#d7d9d7",
    flex: 1,
    marginRight: "2%",
  },
  countLabel: {
    fontSize: 18,
    textAlign: "center",
  },
  countTxt: {
    fontWeight: "500",
    fontSize: 26,
    textAlign: "center",
  },
  tableView: {
    borderRadius: 8,
    margin: "2%",
    padding: "2%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d7d9d7",
  },
  tbHeaderView: {
    flexDirection: "row",
  },
  tbHeaderLeftText: {
    flex: 1,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "black",
    borderRightColor: "white",
    padding: "1%",
    textAlign: "center",
  },
  tbHeaderRightText: {
    flex: 1,
    fontWeight: "500",
    borderWidth: 1,
    borderColor: "black",
    padding: "1%",
    textAlign: "center",
  },
  tbLeftText: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRightColor: "white",
    padding: "1%",
    textAlign: "center",
  },
  tbRightText: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: "1%",
    textAlign: "center",
  },
});
