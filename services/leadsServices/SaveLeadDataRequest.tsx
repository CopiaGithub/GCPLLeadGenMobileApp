import axios from "axios";
import API from "../../API";
import {
  SaveLeadReq,
  SaveLeadResp,
} from "../../types/leadTypes/CreateLeadTypes";

export async function SaveLeadRequest(
  reqData: SaveLeadReq
): Promise<SaveLeadResp> {
  let data = {} as SaveLeadResp;

  return await axios({
    method: "post",
    url: API.LEAD_MASTER,
    data: reqData,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}

export async function EditLeaveRequest(
  reqData: SaveLeadReq,
  id: number
): Promise<SaveLeadResp> {
  let data = {} as SaveLeadResp;

  return await axios({
    method: "patch",
    url: `${API.LEAD_MASTER}/${id}`,
    data: reqData,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}
