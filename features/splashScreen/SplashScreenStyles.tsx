import { StyleSheet } from "react-native";
import { APP_THEME_COLOR } from "../../constants/Colors";

export const style = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  imageIcon: {
    height: "10%",
    width: "80%",
    alignSelf: "center",
    marginVertical: "6%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  yellowBlock: {
    backgroundColor: APP_THEME_COLOR,
    height: "6%",
  },
  blackBlock: {
    backgroundColor: "black",
    height: "1%",
  },
});
export default style;
