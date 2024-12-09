import axios from "axios";
import API from "../../API";
import {
  ReportTypesReq,
  ReportTypesResp,
} from "../../types/reportTypes/ReportTypes";

export async function SendReportRequest(
  reqData: ReportTypesReq,
  sbuID: number
): Promise<ReportTypesResp> {
  let data = {} as ReportTypesResp;

  return await axios({
    method: "post",
    url:
      sbuID == 1
        ? API.REPROTS.USER_DETAILS
        : sbuID == 2
        ? API.REPROTS.LEAD_DETAILS
        : sbuID == 3
        ? API.REPROTS.LEAD
        : "",
    data: reqData,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}
