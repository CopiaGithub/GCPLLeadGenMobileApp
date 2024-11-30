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

  return await axios({
    method: "post",
    url: API.REGISTER.REGISTER_USER,
    data: reqData,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}
