import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { RootStackParamList } from "../../types";
import style from "./SplashScreenStyles";
import { View, Text, ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { APP_THEME_COLOR } from "../../constants/Colors";

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, "Splash">;

const SplashScreen: React.FC<SplashScreenProps> = (props) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        props.navigation.navigate("Login");
      }, 1000);
    }
  }, [isFocused]);

  return (
    <View style={style.container}>
      <Text style={style.text}>Cat Lead Gen</Text>
      <ActivityIndicator size={60} color={APP_THEME_COLOR} />
    </View>
  );
};
export default SplashScreen;
