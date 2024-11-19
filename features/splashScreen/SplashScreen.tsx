import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { RootStackParamList } from "../../types";
import style from "./SplashScreenStyles";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ImageBackground,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { APP_THEME_COLOR } from "../../constants/Colors";

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, "Splash">;

const SplashScreen: React.FC<SplashScreenProps> = (props) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 3000);
    }
  }, [isFocused]);

  const renderIcon = () => {
    return (
      <Image
        source={require("../../assets/mainLogo.png")}
        style={style.imageIcon}
      />
    );
  };
  const renderYellowBlock = () => {
    return <View style={style.yellowBlock} />;
  };
  const renderBlackBlock = () => {
    return <View style={style.blackBlock} />;
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={style.imageBackground}
    >
      {renderYellowBlock()}
      {renderBlackBlock()}
      <View style={style.container}>
        {renderIcon()}
        <ActivityIndicator size={60} color={APP_THEME_COLOR} />
      </View>
      {renderYellowBlock()}
    </ImageBackground>
  );
};
export default SplashScreen;
