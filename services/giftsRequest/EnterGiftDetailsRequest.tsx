import axios from "axios";
import API from "../../API";
import {
  EnterGiftDetailsReq,
  EnterGiftDetailsResp,
} from "../../types/giftTypes/EnterGiftDetailsTypes";

export async function EnterGiftDetails(
  reqData: EnterGiftDetailsReq,
  id: number
): Promise<EnterGiftDetailsResp> {
  let data = {} as EnterGiftDetailsResp;

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
