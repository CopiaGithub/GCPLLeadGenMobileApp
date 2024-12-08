import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {},
  cardView: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "white",
    margin: "4%",
    padding: "4%",
  },
  rowView: {
    flexDirection: "row",
    marginVertical: "1%",
  },
  rowLeftValues: {
    flex: 0.6,
    fontWeight: "500",
  },
  rowRighValues: {
    flex: 1.4,
  },
  btnView: {
    backgroundColor: "black",
    padding: "2%",
    width: "90%",
    borderRadius: 8,
    alignSelf: "center",
  },
  btnTxt: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
});
