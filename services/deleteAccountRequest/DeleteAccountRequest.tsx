import axios from "axios";
import API from "../../API";
import {
  CreateUserReq,
  CreateUserResp,
} from "../../types/userTypes/CreateUserTypes";

export async function DeleteAccountRequest(
  status: boolean,
  ID: number
): Promise<CreateUserResp> {
  let data = {} as CreateUserResp;
  const payload = {
    status: status,
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
