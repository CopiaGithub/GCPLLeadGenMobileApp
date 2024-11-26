import axios from "axios";
import API from "../../API";
import {
  CreateCampaignReq,
  CreateCampaignResp,
} from "../../types/campaignTypes/CreateCampaignTypes";

export async function CreateCampaignRequest(
  reqData: CreateCampaignReq
): Promise<CreateCampaignResp> {
  let data = {} as CreateCampaignResp;

  return await axios({
    method: "post",
    url: API.CAMPAIGN.DATA,
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
