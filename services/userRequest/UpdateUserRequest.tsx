import axios from "axios";
import API from "../../API";
import {
  CreateUserReq,
  CreateUserResp,
} from "../../types/userTypes/CreateUserTypes";

export async function UpdateUserRequest(
  reqData: CreateUserReq,
  ID: number
): Promise<CreateUserResp> {
  let data = {} as CreateUserResp;
  const payload = {
    address: reqData.address,
    email: reqData.email,
    mobile: reqData.mobile,
    orgId: +reqData.orgId,
    orgName: reqData.orgName,
    password: reqData.password,
    pincode: Number(reqData.pincode),
    roleId: Number(reqData.roleId),
    sbuId: Number(reqData.sbuId),
    status: reqData.status,
    username: reqData.username,
  };

  return await axios({
    method: "patch",
    url: `${API.USER_MASTER}/${ID}`,
    data: payload,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}
