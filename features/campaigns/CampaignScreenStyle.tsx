import { Platform, StyleSheet } from "react-native";
import { APP_THEME_COLOR } from "../../constants/Colors";

export const style = StyleSheet.create({
  headerIcon: {
    marginRight: "8%",
    color: "white",
  },
  searchView: {
    margin: "4%",
    padding: "1%",
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
});
