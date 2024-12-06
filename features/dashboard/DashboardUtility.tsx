import { SBUMasterResp } from "../../types/sbuMasterTypes/SBUMasterTypes";
import { DropDownType } from "../login/CDSDropDown";

export const GetSBUMaster = (data: SBUMasterResp | null, roleID: number) => {
  const pickerData: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      pickerData.push({
        label: data.message[i].sbuName,
        value: data.message[i].id.toString(),
      });
    }
  }
  return roleID && roleID != 1
    ? pickerData.filter((item) => item.label != "All")
    : pickerData;
};
