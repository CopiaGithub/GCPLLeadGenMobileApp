import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props: any) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [sdtSuperUser, setSdtSuperUser] = useState("");
  const [UserName, setUserName] = useState("");
  const [Designation_Desc, setDesignation_Desc] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
      }
    });
  }, [isFocused]);
  const icon = () => {
    return (
      <Image
        source={require("../../assets/mainLogo.png")}
        style={{
          height: 60,
          width: 220,
          alignSelf: "center",
        }}
      />
    );
  };
  const renderHorizontalBorder = () => {
    return <View style={{ borderTopWidth: 0.8, borderTopColor: "grey" }} />;
  };
  const userDetails = () => {
    return (
      <View style={{ marginTop: "1%", marginBottom: "4%" }}>
        <Text style={styles.headerTxt}>Exibhition Admin</Text>
        <Text style={styles.childTxt}>Super Admin</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerStyle}
      >
        {icon()}
        {renderHorizontalBorder()}
        {userDetails()}
        <View style={styles.headerView}></View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{ backgroundColor: "black" }}
        onPress={() =>
          Alert.alert("Hold on!", "Are you sure you want to logout?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "YES",
              onPress: () => {
                AsyncStorage.removeItem("@userData").then(() => {});
                props.navigation.navigate("Login");
              },
            },
          ])
        }
      >
        <View style={styles.logoutView}>
          <AntDesign name="logout" size={24} color="white" />
          <Text style={styles.logoutTxt}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: "white",
    height: "100%",
  },
  draweHeader: {
    width: "100%",
    height: "20%",
    paddingLeft: 20,
    justifyContent: "center",
    marginTop: -34,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  desc: {
    fontWeight: "400",
    color: "white",
    fontSize: 18,
  },
  logoutView: {
    height: 50,
    top: 10,
    left: 20,
    flexDirection: "row",
  },
  logoutTxt: {
    left: 10,
    fontWeight: "600",
    color: "white",
    fontSize: 20,
  },
  iconView: {
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#fcba03",
    borderRadius: 10,
    padding: "2%",
    marginVertical: "4%",
    alignSelf: "center",
    flex: 0.4,
  },
  txtOne: {
    fontSize: 18,
    fontWeight: "900",
    color: "#fcba03",
  },
  txtSymbol: {
    color: "#fcba03",
  },
  txtTwo: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: "-3%",
  },
  txtThree: {
    fontSize: 24,
    fontWeight: "800",
    marginTop: "-3%",
  },
  headerTxt: {
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
  childTxt: {
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    textAlignVertical: "center",
  },
  headerView: {
    borderBottomColor: "#d6d4d4",
    borderBottomWidth: 1,
  },
});
