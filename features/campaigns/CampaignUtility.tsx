import {
  GetCampaignDataResp,
  GetCampaignMessage,
} from "../../types/campaignTypes/GetCampaignsTypes";
import { CapmpaignTypeResponse } from "../../types/campaignTypeTypes/CampaignTypeTypes";
import { DistrictResponse } from "../../types/districtTypes/DistrictTypes";
import { OrganizationDataResponse } from "../../types/organizationTypes/OrganizationTypes";
import { StateResponse } from "../../types/stateTypes/StateTypes";
import { DropDownType } from "../login/CDSDropDown";

export const GetOrgData = (data: OrganizationDataResponse | null) => {
  const respData: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      respData.push({
        label: data.message[i].orgName,
        value: data.message[i].id.toString(),
      });
    }
  }
  return respData;
};

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
  if (
    campaignType &&
    campaignType.statusCode == 200 &&
    campaignType.message.length
  ) {
    for (let i = 0; i < campaignType.message.length; i++) {
      pickerData.push({
        label: campaignType.message[i].camapignType,
        value: campaignType.message[i].id.toString(),
      });
    }
  }
  return pickerData;
};

export const HandleSearchList = (
  searchText: string,
  campaignList: GetCampaignDataResp | null,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  itemData: GetCampaignMessage[],
  setItemData: React.Dispatch<React.SetStateAction<GetCampaignMessage[]>>
) => {
  setSearch(searchText);

  searchText = searchText.toLowerCase();
  if (
    searchText &&
    campaignList &&
    campaignList.statusCode == 200 &&
    campaignList.message &&
    campaignList.message.length
  ) {
    const result = campaignList.message.filter((item) => {
      if (
        item.campaignName.toLowerCase().indexOf(searchText) > -1 ||
        item.description.toLowerCase().indexOf(searchText) > -1 ||
        item.fromDate.toLowerCase().indexOf(searchText) > -1
      ) {
        return item;
      }
    });
    return setItemData(result);
  } else {
    return setItemData(campaignList?.message as any);
  }
};
