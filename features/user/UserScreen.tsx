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
import { useEffect } from "react";
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

type UserScreenProps = NativeStackScreenProps<RootStackParamList, "Users">;

const UserScreen: React.FC<UserScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const { getUsers } = useSelector((state: RootState) => state.userArray);
  const { roleMaster } = useSelector((state: RootState) => state.roleMaster);
  useEffect(() => {
    if (isFocused) {
      dispatch(GetUsersRequest(""));
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
              dispatch(GetUsersRequest(""));
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
                    {GetRoleNameById(roleMaster, item.id)}
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
      <ScrollView>{renderItems()}</ScrollView>
    </ImageBackground>
  );
};
export default UserScreen;
