import { GetCampaignDataResp } from "../../../types/campaignTypes/GetCampaignsTypes";
import { RoleMasterResponse } from "../../../types/roleMasterTypes/RoleMasterTypes";
import { SBUMasterResp } from "../../../types/sbuMasterTypes/SBUMasterTypes";
import { DropDownType } from "../../login/CDSDropDown";

export interface UserData {
  orgID: string;
  orgName: string;
  sbuId: string;
}

export const GetRoleMaster = (data: RoleMasterResponse | null) => {
  const picker: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      picker.push({
        label: data.message[i].roleName,
        value: data.message[i].id.toString(),
      });
    }
  }
  return picker;
};
export const GetRoleNameById = (
  data: RoleMasterResponse | null,
  id: number
) => {
  if (data && data.statusCode == 200 && data.message.length) {
    const val = data.message.find((item) => item.id == id);
    return val?.roleName;
  }
};

export const GetCampaignData = (data: GetCampaignDataResp | null) => {
  const respData: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      respData.push({
        label: data.message[i].campaignName,
        value: data.message[i].id.toString(),
      });
    }
  }
  return respData;
};

export const GetSBUNameById = (data: SBUMasterResp | null, id: number) => {
  if (data && data.statusCode == 200 && data.message && data.message.length) {
    return data.message.find((item) => item.id == id)?.sbuName;
  } else {
    return "";
  }
};

export const GetCampaignUNameById = (
  data: GetCampaignDataResp | null,
  id: number
) => {
  if (data && data.statusCode == 200 && data.message && data.message.length) {
    return data.message.find((item) => item.id == id)?.campaignName;
  } else {
    return "";
  }
};
