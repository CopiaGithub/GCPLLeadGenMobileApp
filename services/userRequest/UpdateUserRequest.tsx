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

  return await axios({
    method: "patch",
    url: `${API.USER_MASTER}/${ID}`,
    data: reqData,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}
