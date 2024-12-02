import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../../types";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { style } from "./ApprovalScreenStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useIsFocused } from "@react-navigation/native";
import { GetUsersRequest } from "../../services/userRequest/GetUserRequest";
import { GetUserRespMessage } from "../../types/userTypes/GetUserTypes";
import { ApprovalRequest } from "../../services/approvalsRequest/ApprovalsRequest";
import { DisplayToast } from "../../utility/ToastMessage";
import CDSAlertBox from "../../component/CDSAlertBox";
import CDSLoader from "../../component/CDSLoader";
import { RoleMasterRequest } from "../../services/roleMasterRequest/RoleMasterRequest";
import { GetRoleNameById } from "../user/createUser/CreateUserUtility";
import CDSDropDown from "../login/CDSDropDown";
import CDSImageBG from "../../component/CDSImageBG";

type ApprovalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Approvals"
>;

const ApprovalScreen: React.FC<ApprovalScreenProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();
  const { getUsers } = useSelector((state: RootState) => state.userArray);
  const { roleMaster } = useSelector((state: RootState) => state.roleMaster);
  const [alertState, setAlertState] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const [approvalData, setApprovalData] = useState<Array<GetUserRespMessage>>(
    new Array<GetUserRespMessage>()
  );
  const [userStatus, setUserStatus] = useState(true);
  useEffect(() => {
    if (isFocused) {
      dispatch(GetUsersRequest(""));
      dispatch(RoleMasterRequest(""));
    }
  }, [isFocused]);

  useEffect(() => {
    if (
      isFocused &&
      getUsers &&
      getUsers.statusCode == 200 &&
      getUsers.message &&
      getUsers.message.length
    ) {
      setApprovalData(getUsers.message);
    } else {
      setApprovalData([]);
    }
  }, [isFocused, getUsers?.statusCode, userStatus]);

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
          placeholder="Search Approvals"
          placeholderTextColor={"grey"}
        />
      </View>
    );
  };
  const handleApproval = async (flag: boolean, id: number) => {
    setLoaderState(true);
    const resp = await ApprovalRequest({ status: flag }, id);
    setLoaderState(resp ? false : true);
    if (resp && resp.statusCode == 200) {
      setAlertState(true);
    } else {
      DisplayToast(`${resp.message}`);
    }
  };
  const renderButtons = (id: number) => {
    return (
      <View style={style.btnsView}>
        <TouchableOpacity
          style={style.approveBtn}
          onPress={() => {
            handleApproval(true, id);
          }}
        >
          <Text style={style.approveBtnTxt}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.rejectBtn}
          onPress={() => {
            handleApproval(false, id);
          }}
        >
          <Text style={style.rejectBtnTxt}>Reject</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItems = () => {
    return (
      <>
        {getUsers &&
        getUsers.statusCode == 200 &&
        getUsers.message.length &&
        approvalData.length ? (
          <>
            {approvalData.map((item, i) => (
              <View style={style.itemView} key={i}>
                <View style={style.txtView}>
                  <Text style={style.keyText}>Name:</Text>
                  <Text style={style.valueText}>{item.username}</Text>
                  <View style={style.extra}></View>
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

                {renderButtons(item.id)}
              </View>
            ))}
          </>
        ) : getUsers && getUsers.statusCode == 200 && !getUsers.message ? (
          <View>
            <Text>No data found</Text>
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
    <CDSImageBG
      renderJXX={() => (
        <>
          <CDSAlertBox
            alertVisibility={alertState}
            alertTitle="Approval!"
            alertDesc="User updated successfully!"
            showNegativeBtn={false}
            positiveBtnTxt="Cancel"
            negativeBtnTxt="Ok"
            onNegativeClick={() => {
              setAlertState(false);
              dispatch(GetUsersRequest(""));
            }}
            onPositiveClick={() => {
              setAlertState(false);
            }}
          />
          {renderSearchBar()}

          <ScrollView>{renderItems()}</ScrollView>
        </>
      )}
    />
  );
};
export default ApprovalScreen;
