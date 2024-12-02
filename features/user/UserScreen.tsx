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
import CDSImageBG from "../../component/CDSImageBG";
import { UserMaster } from "./userMasterDao/UserMaster";
import {
  addUserMasterData,
  createUserMasterTable,
  getUserMasterData,
  resetUserMasterTable,
} from "./userMasterDao/UserMasterDao";
import { DisplayToast } from "../../utility/ToastMessage";
import { checkInternetConnection } from "../../utility/NetInfo";
import { NetworkState, useNetworkState } from "expo-network";
import { GetUserResp } from "../../types/userTypes/GetUserTypes";

type UserScreenProps = NativeStackScreenProps<RootStackParamList, "Users">;

const UserScreen: React.FC<UserScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const [userMaster, setUserMaster] = useState<Array<UserMaster>>(
    new Array<UserMaster>()
  );
  const [netState, setNetState] = useState(checkInternetConnection());
  const { getUsers } = useSelector((state: RootState) => state.userArray);
  const { roleMaster } = useSelector((state: RootState) => state.roleMaster);
  useEffect(() => {
    if (isFocused) {
      dispatch(GetUsersRequest(""));
      dispatch(RoleMasterRequest(""));
      createUserMasterTable();
    }
  }, [isFocused]);
  const networkState = useNetworkState();
  useEffect(() => {
    if (isFocused && networkState) {
      DisplayToast(`${networkState.isConnected}`);
    }
  }, [networkState, isFocused]);
  const handleOfflineOnlineState = (
    getUsers: GetUserResp | null,
    networkState: NetworkState,
    userMaster: UserMaster[]
  ) => {
    if (
      getUsers &&
      getUsers.statusCode == 200 &&
      getUsers.message.length &&
      getUsers.message.length == userMaster.length &&
      networkState &&
      networkState.isConnected
    ) {
      resetUserMasterTable(setUserMaster);
      const val = getUsers.message;
      for (let i = 0; i < val.length; i++) {
        const data: UserMaster = {
          ID: "0",
          masterId: val[i].id,
          orgId: val[i].orgId,
          orgName: val[i].orgName,
          sbuId: val[i].sbuId,
          username: val[i].username,
          password: val[i].password,
          email: val[i].email,
          mobile: val[i].mobile,
          address: val[i].address,
          pincode: val[i].pincode,
          roleId: val[i].roleId,
          status: val[i].status,
        };
        addUserMasterData(data, setUserMaster);
      }
    } else {
      getUserMasterData(setUserMaster);
    }
  };
  useEffect(() => {
    if (isFocused) {
      handleOfflineOnlineState(getUsers, networkState, userMaster);
    }
  }, [isFocused, getUsers?.statusCode, networkState]);

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
        {userMaster && userMaster.length ? (
          <>
            {userMaster.map((item, i) => (
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
        ) : userMaster && userMaster.length ? (
          <View>
            <Text>No Data Found!</Text>
          </View>
        ) : (
          <CDSLoader />
        )}
      </>
    );
  };
  return (
    <CDSImageBG
      renderJXX={() => (
        <>
          {renderSearchBar()}

          <ScrollView contentContainerStyle={{ paddingBottom: "50%" }}>
            {renderItems()}
          </ScrollView>
        </>
      )}
    />
  );
};
export default UserScreen;
