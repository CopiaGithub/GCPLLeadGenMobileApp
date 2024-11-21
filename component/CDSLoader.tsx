import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  DimensionValue,
} from "react-native";
import { useState } from "react";
import { APP_THEME_COLOR } from "../constants/Colors";

type CDSLoaderProps = {
  marginTop?: DimensionValue | undefined;
};

const CDSLoader: React.FC<CDSLoaderProps> = (props) => {
  return (
    <View
      style={[
        styles.loaderView,
        { marginTop: props.marginTop ? props.marginTop : "0%" },
      ]}
    >
      <ActivityIndicator size={50} color={APP_THEME_COLOR} />
      <Text style={styles.loaderTxt}>Please wait ...</Text>
    </View>
  );
};
export default CDSLoader;

const styles = StyleSheet.create({
  loaderView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  loaderTxt: {
    textAlign: "center",
    marginTop: "3%",
    fontWeight: "500",
    fontSize: 16,
  },
});
