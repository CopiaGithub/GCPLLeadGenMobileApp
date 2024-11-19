import axios from "axios";
import API from "../../API";
import {
  RegisterUser,
  RegisterUserResponse,
} from "../../types/registerType/RegisterType";

export async function RegisterUserRequest(
  reqData: RegisterUser
): Promise<RegisterUserResponse> {
  let data = {} as RegisterUserResponse;

  return await axios({
    method: "post",
    url: API.REGISTER.REGISTER_USER,
    data: reqData,
  })
    .then((resp) => {
      console.error("Response Then", resp.data);

      return resp.data;
    })
    .catch((error) => {
      console.error("Response error", error);
      return error;
    });
}
