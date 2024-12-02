import {
  Platform,
  StyleSheet,
  View,
  Text,
  DimensionValue,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import type { CdsPickerModel } from "../types/CdsPickerModel";
import { Overlay } from "react-native-elements";
import { useEffect, useState } from "react";
import { checkInternetConnection } from "../utility/NetInfo";
import { useIsFocused } from "@react-navigation/native";
import { DisplayToast } from "../utility/ToastMessage";
import { NetworkState, useNetworkState } from "expo-network";

type CDSImageBGProps = {
  renderJXX: () => React.JSX.Element;
};

const CDSImageBG: React.FC<CDSImageBGProps> = (props) => {
  const networkState = useNetworkState();

  const renderConnected = () => {
    setTimeout(() => {
      return (
        <View style={styles.connectedView}>
          <Text style={styles.connectedTxt}>You are connected to internet</Text>
        </View>
      );
    }, 2000);
    return null;
  };
  const renderDisconnected = () => {
    return (
      <View style={styles.disconnectedView}>
        <Text style={styles.disconnectedTx}>Your device is offline</Text>
      </View>
    );
  };
  return (
    <ImageBackground
      source={require("../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      {networkState && networkState.isConnected
        ? renderConnected()
        : renderDisconnected()}

      {props.renderJXX()}
    </ImageBackground>
  );
};
export default CDSImageBG;

const styles = StyleSheet.create({
  connectedView: {
    padding: "2%",
    backgroundColor: "#008000 ",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  connectedTxt: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  disconnectedView: {
    padding: "2%",
    backgroundColor: "#C70039",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  disconnectedTx: {
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
});
