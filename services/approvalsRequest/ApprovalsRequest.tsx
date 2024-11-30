import axios from "axios";
import API from "../../API";

import {
  ApprovalsReq,
  ApprovalsResp,
} from "../../types/approvalsTypes/ApprovalsTypes";

export async function ApprovalRequest(
  reqData: ApprovalsReq,
  id: number
): Promise<ApprovalsResp> {
  let data = {} as ApprovalsResp;

  return await axios({
    method: "patch",
    url: `${API.USER_MASTER}/${id}`,
    data: reqData,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}
