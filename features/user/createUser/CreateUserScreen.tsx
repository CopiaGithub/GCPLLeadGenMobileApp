import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../../../types";
import { useEffect, useState } from "react";
import { style } from "./CreateUserStyle";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GetCampaignData,
  GetRoleMaster,
  GetRoleNameById,
  GetSBUNameById,
  UserData,
} from "./CreateUserUtility";
import CreateUserHelper from "./CreateUserHelper";
import { useFormik } from "formik";
import CDSDropDown from "../../login/CDSDropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { RoleMasterRequest } from "../../../services/roleMasterRequest/RoleMasterRequest";
import { DisplayToast } from "../../../utility/ToastMessage";
import { CreateUserReq } from "../../../types/userTypes/CreateUserTypes";
import CDSAlertBox from "../../../component/CDSAlertBox";
import CDSLoader from "../../../component/CDSLoader";
import { CreateUserRequest } from "../../../services/userRequest/CreateUserRequest";
import { UpdateUserRequest } from "../../../services/userRequest/UpdateUserRequest";
import { CompanyTypeRequest } from "../../../services/companyTypeRequest/CompanyTypeRequest";
import { GetCampNameById } from "../../leads/stepperScreensEdit/leadDetails/LeadDetailsUtility";
import { CampaignTypeRequest } from "../../../services/campaignTypeRequest/CampaignTypeRequest";
import { GetCampaignDataRequest } from "../../../services/campaignRequest/GetCampaignDataRequest";
import { SBUMasterRequest } from "../../../services/sbuMasterRequest.tsx/SBUMasterRequest";
import { GetSBUMaster } from "../../dashboard/DashboardUtility";

type CreateUserScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateUser"
>;

const CreateUserScreen: React.FC<CreateUserScreenProps> = (props) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch<AppDispatch>();
  const { roleMaster } = useSelector((state: RootState) => state.roleMaster);

  const formHelper = new CreateUserHelper();
  const { operation, item } = props.route.params;
  const { getCampaignData } = useSelector(
    (state: RootState) => state.getCampaignData
  );
  const { sbuMaster } = useSelector((state: RootState) => state.sbuMaster);
  const [loaderState, setLoaderState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [sbuID, setSBUId] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        setSBUId(user.message.user.sbuId);
      }
    });
  }, [isFocused]);
  useEffect(() => {
    if (isFocused) {
      dispatch(RoleMasterRequest(""));
      dispatch(GetCampaignDataRequest({}));
      dispatch(SBUMasterRequest(null));
    }
  }, [isFocused]);

  const createUser = useFormik({
    initialValues: formHelper.formikInitialValue,
    onSubmit: async (values) => {
      setLoaderState(true);
      const val = values.formData;
      const payload: CreateUserReq = {
        orgId: val.orgId,
        orgName: val.orgName,
        sbuId: Number(val.sbuId),
        username: val.username,
        password: val.password,
        email: val.email,
        mobile: val.mobile,
        address: val.address,
        pincode: val.pincode,
        roleId: Number(val.roleId),
        campaignId: Number(val.campaignId),
        campaignName: val.campaignName,
        status: val.status,
      };
      if (item && item.id) {
        const resp = await UpdateUserRequest(payload, item.id);
        setLoaderState(resp ? false : true);
        if (resp && resp.statusCode == 200) {
          setAlertState(true);
        } else {
          DisplayToast(`${resp.message}`);
        }
      } else {
        const resp = await CreateUserRequest(payload);
        setLoaderState(resp ? false : true);
        if (resp && resp.statusCode == 201) {
          setAlertState(true);
        } else {
          DisplayToast(`${resp.message}`);
        }
      }
    },
  });
  useEffect(() => {
    if (isFocused && item && item.username) {
      createUser.setValues({
        formData: {
          address: item.address,
          email: item.email,
          mobile: item.mobile,
          orgId: item.orgId,
          orgName: item.orgName,
          password: item.password,
          pincode: item.pincode.toString(),
          roleId: item.roleId,
          sbuId: item.sbuId,
          username: item.username,
          campaignId: item.campaignId,
          campaignName: item.campaignName,
          status: item.status,
        },
      });
    }
  }, [isFocused, item]);
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        const data = user.message.user;
        createUser.setFieldValue("formData.orgId", data.orgId);
        createUser.setFieldValue("formData.orgName", data.orgName);
        createUser.setFieldValue("formData.orgsbuId", data.orgsbuId);
      }
    });
  }, [isFocused]);

  useEffect(() => {
    if (operation && operation == "1") {
      props.navigation.setOptions({
        headerTitle: "Edit User",
      });
    }
  }, [operation]);
  const isValid = () => {
    const val = createUser.values.formData;
    let emailRegex = /^(?:[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})$/;

    if (val.sbuId == 0) {
      DisplayToast("Please select SBU");
      return false;
    } else if (!val.username) {
      DisplayToast("Please enter username");
      return false;
    } else if (!val.mobile) {
      DisplayToast("Please enter mobile number");
      return false;
    } else if (val.mobile && val.mobile.length < 10) {
      DisplayToast("Please enter valid mobile number");
      return false;
    } else if (!val.email) {
      DisplayToast("Please enter email");
      return false;
    } else if (val.email && !emailRegex.test(val.email)) {
      DisplayToast("Please enter valid mail");
      return false;
    } else if (!val.password) {
      DisplayToast("Please enter password");
      return false;
    } else if (val.roleId == 0) {
      DisplayToast("Please select role");
      return false;
    }
    return true;
  };

  const renderCreateUserView = () => {
    return (
      <View style={style.createView}>
        {/* Organization */}
        <Text style={style.labelText}>Organization:</Text>
        <TextInput
          style={[style.inputTxt, { color: "grey" }]}
          placeholder="Enter Organization*"
          placeholderTextColor={"grey"}
          editable={false}
          value={createUser.values.formData.orgName}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.orgName", val);
          }}
        />
        {/* Role */}
        <Text style={style.labelText}>
          SBU/Brand:<Text style={{ color: "red" }}> *</Text>
        </Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            data={GetSBUMaster(sbuMaster, sbuID)}
            onSelect={(val) => {
              createUser.setFieldValue("formData.sbuId", val.value);
            }}
            placeholder={
              createUser.values.formData.sbuId
                ? GetSBUNameById(sbuMaster, createUser.values.formData.sbuId)
                : "Select SBU/Brand"
            }
          />
        </View>
        {/* Campaign */}
        {/* <Text style={style.labelText}>Campaign Name:</Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            data={GetCampaignData(getCampaignData)}
            onSelect={(val) => {
              createUser.setFieldValue("formData.campaignId", val.value);
              createUser.setFieldValue("formData.campaignName", val.label);
            }}
            placeholder={
              createUser.values.formData.campaignId
                ? GetCampNameById(
                    getCampaignData,
                    createUser.values.formData.campaignId
                  )
                : "Select Campaign*"
            }
          />
        </View> */}
        {/* User Name */}
        <Text style={style.labelText}>
          User Name:<Text style={{ color: "red" }}> *</Text>
        </Text>
        <TextInput
          style={style.inputTxt}
          value={createUser.values.formData.username}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.username", val);
          }}
          placeholder="Enter User Name*"
          placeholderTextColor={"grey"}
        />
        {/* Email */}
        <Text style={style.labelText}>
          Email:<Text style={{ color: "red" }}> *</Text>
        </Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Email*"
          placeholderTextColor={"grey"}
          value={createUser.values.formData.email}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.email", val);
          }}
        />

        {/* Mobile Number */}
        <Text style={style.labelText}>
          Mobile Number:<Text style={{ color: "red" }}> *</Text>
        </Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Mobile Number*"
          maxLength={10}
          keyboardType="numeric"
          placeholderTextColor={"grey"}
          value={createUser.values.formData.mobile}
          onChangeText={(val) => {
            const numericValue = val.replace(/[^0-9]/g, "");
            createUser.setFieldValue("formData.mobile", numericValue);
          }}
        />

        {/* State */}
        {/* <Text style={style.labelText}>State:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter State"
          placeholderTextColor={"grey"}
        /> */}
        {/* District */}
        {/* <Text style={style.labelText}>District:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter District"
          placeholderTextColor={"grey"}
        /> */}
        {/* Location */}
        <Text style={style.labelText}>Address/Location:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Location"
          placeholderTextColor={"grey"}
          value={createUser.values.formData.address}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.address", val);
          }}
        />
        {/* Pincode */}
        <Text style={style.labelText}>
          Pincode:<Text style={{ color: "red" }}> *</Text>
        </Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Pincode*"
          maxLength={6}
          keyboardType="numeric"
          placeholderTextColor={"grey"}
          value={createUser.values.formData.pincode.toString()}
          onChangeText={(val) => {
            const numericValue = val.replace(/[^0-9]/g, "");
            createUser.setFieldValue("formData.pincode", numericValue);
          }}
        />
        {/* Password */}
        <Text style={style.labelText}>
          Password:<Text style={{ color: "red" }}> *</Text>
        </Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Password*"
          placeholderTextColor={"grey"}
          value={createUser.values.formData.password}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.password", val);
          }}
        />
        {/* Role */}
        <Text style={style.labelText}>
          Role:<Text style={{ color: "red" }}> *</Text>
        </Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            data={GetRoleMaster(roleMaster)}
            onSelect={(val) => {
              createUser.setFieldValue("formData.roleId", val.value);
            }}
            placeholder={
              createUser.values.formData.roleId
                ? GetRoleNameById(roleMaster, createUser.values.formData.roleId)
                : "Select role*"
            }
          />
        </View>
        {/* Role */}
        <Text style={style.labelText}>
          Status:<Text style={{ color: "red" }}> *</Text>
        </Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            data={[
              { label: "Active", value: "0" },
              { label: "InActive", value: "1" },
            ]}
            onSelect={(val) => {
              createUser.setFieldValue(
                "formData.status",
                val.value == "0" ? true : false
              );
            }}
            placeholder={
              createUser.values.formData.status == true
                ? "Active"
                : createUser.values.formData.status == false
                ? "InActive"
                : "Select status*"
            }
          />
        </View>
      </View>
    );
  };
  const renderBtn = () => {
    return (
      <TouchableOpacity
        style={style.btn}
        onPress={() => {
          //props.navigation.navigate("Users");
          if (isValid()) {
            createUser.submitForm();
          }
        }}
      >
        <Text style={style.btnText}>Submit</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      source={require("../../../assets/background_image.png")}
      style={{ flex: 1 }}
    >
      <CDSAlertBox
        alertVisibility={alertState}
        alertTitle={item && item.id ? "Edit User" : "Create User"}
        alertDesc={
          item && item.id
            ? "User updated successfully!"
            : "User created successfully!"
        }
        showNegativeBtn={false}
        positiveBtnTxt="Cancel"
        negativeBtnTxt="Ok"
        onNegativeClick={() => {
          setAlertState(false);
          props.navigation.navigate("Users");
        }}
        onPositiveClick={() => {
          setAlertState(false);
        }}
      />
      <>
        {loaderState ? (
          <CDSLoader />
        ) : (
          <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ paddingBottom: "50%" }}
          >
            {renderCreateUserView()}
            {renderBtn()}
          </ScrollView>
        )}
      </>
    </ImageBackground>
  );
};
export default CreateUserScreen;
