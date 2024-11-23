import { CapmpaignTypeResponse } from "../../types/campaignTypeTypes/CampaignTypeTypes";
import { DistrictResponse } from "../../types/districtTypes/DistrictTypes";
import { StateResponse } from "../../types/stateTypes/StateTypes";
import { DropDownType } from "../login/CDSDropDown";

export const GetStates = (states: StateResponse | null) => {
  const pickerData: DropDownType[] = [];
  if (states && states.statusCode == 200) {
    for (let i = 0; i < states.message.length; i++) {
      pickerData.push({
        label: states.message[i].name,
        value: states.message[i].id.toString(),
      });
    }
  }
  return pickerData;
};

export const GetDistrict = (district: DistrictResponse | null) => {
  const pickerData: DropDownType[] = [];
  if (district && district.statusCode == 200) {
    pickerData.push({
      label: district.message.name,
      value: district.message.id.toString(),
    });
  }
  return pickerData;
};
export const GetCampaignType = (campaignType: CapmpaignTypeResponse | null) => {
  const pickerData: DropDownType[] = [];
  if (campaignType && campaignType.statusCode == 200) {
    pickerData.push({
      label: campaignType.message.campaignTypeDescription,
      value: campaignType.message.campaignTypeDescription.toString(),
    });
  }
  return pickerData;
};
