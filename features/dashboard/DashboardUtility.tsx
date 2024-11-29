import { SBUMasterResp } from "../../types/sbuMasterTypes/SBUMasterTypes";
import { DropDownType } from "../login/CDSDropDown";

export const GetSBUMaster = (data: SBUMasterResp | null) => {
  const pickerData: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      pickerData.push({
        label: data.message[i].sbuName,
        value: data.message[i].id.toString(),
      });
    }
  }
  return pickerData;
};
