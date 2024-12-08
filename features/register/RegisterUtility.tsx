import { CdsPickerModel } from "../../types/CdsPickerModel";
import { OrganizationDataResponse } from "../../types/organizationTypes/OrganizationTypes";
import { RegisterUser } from "../../types/registerType/RegisterType";
import { DisplayToast } from "../../utility/ToastMessage";
import { DropDownType } from "../login/CDSDropDown";
import { IRegisterForm } from "./RegisterFormik";

export const GetOrgData = (data: OrganizationDataResponse | null) => {
  const respData: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      respData.push({
        label: data.message[i].orgName,
        value: data.message[i].id.toString(),
      });
    }
  }
  return respData;
};
export const isRegisterFormValid = (val: RegisterUser, cPass: string) => {
  let emailRegex = /^(?:[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})$/;
  if (!val.orgName) {
    DisplayToast("Please select organization");
    return false;
  } else if (!val.username) {
    DisplayToast(`Please enter name ${val.username}`);
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
  } else if (!val.address) {
    DisplayToast("Please enter address");
    return false;
  } else if (!val.password) {
    DisplayToast("Please enter password");
    return false;
  } else if (!cPass) {
    DisplayToast("Please enter confirm password");
    return false;
  } else if (val.password != cPass) {
    DisplayToast("Password and confirm password are not matched");
    return false;
  } else {
    return true;
  }
};
