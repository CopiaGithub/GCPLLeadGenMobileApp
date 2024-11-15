import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = (props: any) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [sdtSuperUser, setSdtSuperUser] = useState("");
  const [UserName, setUserName] = useState("");
  const [Designation_Desc, setDesignation_Desc] = useState("");
  const navigation = useNavigation();
  const icon = () => {
    return (
      <View style={styles.iconView}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.txtOne}>GCPL</Text>
          <Text style={styles.txtSymbol}>®</Text>
        </View>
        <Text style={styles.txtTwo}>LEAD</Text>
        <Text style={styles.txtThree}>GEN</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerStyle}
      >
        <View style={styles.headerView}>
          {icon()}
          <View style={{ flex: 1, justifyContent: "center", marginLeft: "2%" }}>
            <Text style={styles.headerTxt}>Exibhition Admin</Text>
            <Text style={styles.childTxt}>Super Admin</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{ backgroundColor: "black" }}
        onPress={() => navigation.navigate("Login")}
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
    color: "grey",
  },
  childTxt: {
    fontWeight: "500",
    fontSize: 16,
    color: "grey",
  },
  headerView: {
    flexDirection: "row",
    borderBottomColor: "#d6d4d4",
    borderBottomWidth: 1,
    marginVertical: "2%",
  },
});
