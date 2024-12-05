import axios from "axios";
import API from "../../API";
import { FootfallCountResp } from "../../types/footfallCountType/FootfallCountType";

export async function FootfallCountRequest(
  sbuId: number
): Promise<FootfallCountResp> {
  let data = {} as FootfallCountResp;

  return await axios({
    method: "get",
    url: `${API.FOOTFALL_COUNT}/${sbuId == 4 ? 0 : sbuId}`,
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((error) => {
      return error;
    });
}
