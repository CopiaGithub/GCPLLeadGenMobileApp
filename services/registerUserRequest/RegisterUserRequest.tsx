import axios from "axios";
import API from "../../API";
import {
  RegisterUser,
  RegisterUserRep,
} from "../../types/registerType/RegisterType";

export async function RegisterUserRequest(
  reqData: RegisterUser
): Promise<RegisterUserRep> {
  let data = {} as RegisterUserRep;
  const payload = {
    address: reqData.address,
    email: reqData.email,
    mobile: reqData.mobile,
    orgId: +reqData.orgId,
    orgName: reqData.orgName,
    password: reqData.password,
    pincode: +reqData.pincode,
    roleId: +reqData.roleId,
    sbuId: +reqData.sbuId,
    status: reqData.status,
    username: reqData.username,
  };
  console.warn(payload);

  return await axios({
    method: "post",
    url: API.REGISTER.REGISTER_USER,
    data: payload,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}
