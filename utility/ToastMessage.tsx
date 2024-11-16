import { Platform, ToastAndroid } from "react-native";
import Toast from "react-native-root-toast";
export function DisplayToast(msg: string) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Toast.show(msg);
  }
}
