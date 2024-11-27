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
import { GetRoleMaster, UserData } from "./CreateUserUtility";
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

  const [loaderState, setLoaderState] = useState(false);
  const [alertState, setAlertState] = useState(false);
  useEffect(() => {
    if (isFocused) {
      dispatch(RoleMasterRequest(""));
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
        sbuId: val.sbuId,
        username: val.username,
        password: val.password,
        email: val.email,
        mobile: val.mobile,
        address: val.address,
        pincode: Number(val.pincode),
        roleId: Number(val.roleId),
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
    if (isFocused && item.username) {
      createUser.setValues({
        formData: {
          address: item.address,
          email: item.email,
          mobile: item.mobile,
          orgId: item.orgId,
          orgName: item.orgName,
          password: item.password,
          pincode: item.pincode,
          roleId: item.roleId,
          sbuId: item.sbuId,
          username: item.username,
        },
      });
    }
  }, [isFocused, item]);
  useEffect(() => {
    AsyncStorage.getItem("@userData").then((res) => {
      if (res) {
        const user = JSON.parse(res);
        const data = user.message;
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
    if (!val.username) {
      DisplayToast("Please enter username");
      return false;
    } else if (!val.mobile) {
      DisplayToast("Please enter mobile number");
      return false;
    } else if (!val.email) {
      DisplayToast("Please enter email");
      return false;
    } else if (!val.address) {
      DisplayToast("Please enter location");
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
        {/* User Name */}
        <Text style={style.labelText}>User Name:</Text>
        <TextInput
          style={style.inputTxt}
          value={createUser.values.formData.username}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.username", val);
          }}
          placeholder="Enter User Name"
          placeholderTextColor={"grey"}
        />
        {/* Mobile Number */}
        <Text style={style.labelText}>Mobile Number:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Mobile Number"
          maxLength={10}
          keyboardType="numeric"
          placeholderTextColor={"grey"}
          value={createUser.values.formData.mobile}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.mobile", val);
          }}
        />
        {/* Email */}
        <Text style={style.labelText}>Email:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Email"
          placeholderTextColor={"grey"}
          value={createUser.values.formData.email}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.email", val);
          }}
        />
        {/* Organization */}
        <Text style={style.labelText}>Organization:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Organization"
          placeholderTextColor={"grey"}
          editable={false}
          value={createUser.values.formData.orgName}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.orgName", val);
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
        <Text style={style.labelText}>Location:</Text>
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
        <Text style={style.labelText}>Pincode:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Pincode"
          placeholderTextColor={"grey"}
          value={createUser.values.formData.pincode.toString()}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.pincode", val);
          }}
        />
        {/* Password */}
        <Text style={style.labelText}>Password:</Text>
        <TextInput
          style={style.inputTxt}
          placeholder="Enter Password"
          placeholderTextColor={"grey"}
          value={createUser.values.formData.password}
          onChangeText={(val) => {
            createUser.setFieldValue("formData.password", val);
          }}
        />
        {/* Role */}
        <Text style={style.labelText}>Role:</Text>
        <View style={{ marginVertical: "2%" }}>
          <CDSDropDown
            data={GetRoleMaster(roleMaster)}
            onSelect={(val) => {
              createUser.setFieldValue("formData.roleId", val.value);
            }}
            placeholder="Select role"
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
