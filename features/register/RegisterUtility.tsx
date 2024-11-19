import { CdsPickerModel } from "../../types/CdsPickerModel";
import { OrganizationDataResponse } from "../../types/organizationTypes/OrganizationTypes";
import { RegisterUser } from "../../types/registerType/RegisterType";
import { DisplayToast } from "../../utility/ToastMessage";
import { IRegisterForm } from "./RegisterFormik";

export const GetOrgData = (data: OrganizationDataResponse[] | null) => {
  const respData: CdsPickerModel[] = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      respData.push({
        label: data[i].orgName,
        value: data[i].id,
      });
    }
  }
  return respData;
};
export const isRegisterFormValid = (val: RegisterUser, cPass: string) => {
  let emailRegex = /^(?:[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6})$/;
  if (!val.username) {
    DisplayToast(`Please enter name ${val.username}`);
    return false;
  } else if (!val.mobile) {
    DisplayToast("Please enter mobile number");
    return false;
  } else if (!val.orgId) {
    DisplayToast("Please select organization");
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
