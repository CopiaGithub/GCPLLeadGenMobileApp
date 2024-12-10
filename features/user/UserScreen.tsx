import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../../types";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { style } from "./UserScreenStyle";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useIsFocused } from "@react-navigation/native";
import { GetUsersRequest } from "../../services/userRequest/GetUserRequest";
import { RoleMasterRequest } from "../../services/roleMasterRequest/RoleMasterRequest";
import { GetRoleNameById } from "./createUser/CreateUserUtility";
import CDSLoader from "../../component/CDSLoader";
import CDSDropDown from "../login/CDSDropDown";

type UserScreenProps = NativeStackScreenProps<RootStackParamList, "Users">;

const UserScreen: React.FC<UserScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const { getUsers } = useSelector((state: RootState) => state.userArray);
  const { roleMaster } = useSelector((state: RootState) => state.roleMaster);
  const [status, setStaus] = useState(true);
  useEffect(() => {
    if (isFocused) {
      dispatch(GetUsersRequest(status));
      dispatch(RoleMasterRequest(""));
    }
  }, [isFocused]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Feather
            name="refresh-ccw"
            size={24}
            style={style.headerIcon}
            onPress={() => {
              dispatch(GetUsersRequest(status));
            }}
          />
          <Feather
            name="plus"
            size={24}
            style={style.headerIcon}
            onPress={() => {
              props.navigation.navigate("CreateUser", {
                operation: "0",
              } as any);
            }}
          />
        </View>
      ),
    });
  }, []);

  const renderSearchBar = () => {
    return (
      <View style={style.searchView}>
        <Ionicons
          name="search-sharp"
          size={24}
          color="black"
          style={style.searchIcon}
        />
        <TextInput
          style={style.searchTxtInput}
          placeholder="Search Users"
          placeholderTextColor={"grey"}
        />
      </View>
    );
  };

  const renderItems = () => {
    return (
      <>
        {getUsers &&
        getUsers.statusCode == 200 &&
        getUsers.message &&
        getUsers.message.length ? (
          <>
            {getUsers.message.map((item, i) => (
              <View style={style.itemView} key={i}>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Name:</Text>
                  <Text style={style.valueText}>{item.username}</Text>
                  <FontAwesome5
                    name="pencil-alt"
                    size={16}
                    color="black"
                    style={style.extra}
                    onPress={() => {
                      props.navigation.navigate("CreateUser", {
                        operation: "1",
                        item: item,
                      });
                    }}
                  />
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Mobile:</Text>
                  <Text style={style.valueText}>{item.mobile}</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Organization:</Text>
                  <Text style={style.valueText}>{item.orgName}</Text>
                  <View style={style.extra}></View>
                </View>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Role:</Text>
                  <Text style={style.valueText}>
                    {item.roleId
                      ? GetRoleNameById(roleMaster, item.roleId)
                      : null}
                  </Text>
                  <View style={style.extra}></View>
                </View>
              </View>
            ))}
          </>
        ) : getUsers && getUsers.statusCode == 200 && !getUsers.message ? (
          <View>
            <Text>No Data Found!</Text>
          </View>
        ) : getUsers && getUsers.statusCode != 200 ? (
          <View>
            <Text>{`${getUsers.message}`}</Text>
          </View>
        ) : (
          <CDSLoader />
        )}
      </>
    );
  };
  return (
    <ImageBackground
      source={require("../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      {renderSearchBar()}
      <View style={{ marginHorizontal: "4%" }}>
        <CDSDropDown
          data={[
            { label: "Active Users", value: "1" },
            { label: "InActive Users", value: "0" },
          ]}
          placeholder={status ? "Active Users" : "InActive Users"}
          onSelect={(val) => {
            setStaus(val.value == "1" ? true : false);
            dispatch(GetUsersRequest(val.value == "1" ? true : false));
          }}
        />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: "50%" }}>
        {renderItems()}
      </ScrollView>
    </ImageBackground>
  );
};
export default UserScreen;
