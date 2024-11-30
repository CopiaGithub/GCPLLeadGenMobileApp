import axios from "axios";
import API from "../../API";
import {
  CreateUserReq,
  CreateUserResp,
} from "../../types/userTypes/CreateUserTypes";

export async function CreateUserRequest(
  reqData: CreateUserReq
): Promise<CreateUserResp> {
  let data = {} as CreateUserResp;

  return await axios({
    method: "post",
    url: API.USER_MASTER,
    data: reqData,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}
