import axios from "axios";
import API from "../../API";
import {
  RegisterUser,
  RegisterUserResponse,
} from "../../types/registerType/RegisterType";
import {
  LoginWPasswordReq,
  LoginWPasswordResp,
} from "../../types/loginTypes/loginWPasswordTypes/LoginWPasswordTypes";

export async function LoginWPassRequest(
  reqData: LoginWPasswordReq
): Promise<LoginWPasswordResp> {
  let data = {} as LoginWPasswordResp;

  return await axios({
    method: "post",
    url: API.LOGIN.WITH_PASSWORD,
    data: reqData,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}
