import { GetCampaignDataResp } from "../../../../types/campaignTypes/GetCampaignsTypes";
import { CompanyTypeResponse } from "../../../../types/companyTypeTypes/CompanyTypeTypes";
import { IndustryTypeResponse } from "../../../../types/industryTypeTypes/IndustryTypeTypes";
import { OrganizationDataResponse } from "../../../../types/organizationTypes/OrganizationTypes";
import { DropDownType } from "../../../login/CDSDropDown";

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
export const GetCompanyType = (data: CompanyTypeResponse | null) => {
  const respData: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      respData.push({
        label: data.message[i].companyType,
        value: data.message[i].id.toString(),
      });
    }
  }
  return respData;
};
export const GetIndustry = (data: IndustryTypeResponse | null) => {
  const respData: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      respData.push({
        label: data.message[i].industryType,
        value: data.message[i].id.toString(),
      });
    }
  }
  return respData;
};

export const GetIndustryNameById = (
  data: IndustryTypeResponse | null,
  id: number
) => {
  if (data && data.statusCode == 200 && data.message.length) {
    return data.message.find((item) => item.id == id)?.industryType;
  } else {
    return "";
  }
};

export const GetCampNameById = (
  data: GetCampaignDataResp | null,
  id: number
) => {
  if (data && data.statusCode == 200 && data.message.length) {
    return data.message.find((item) => item.id == id)?.campaignName;
  } else {
    return "";
  }
};

export const GetCompanyTypeNameById = (
  data: CompanyTypeResponse | null,
  id: number
) => {
  if (data && data.statusCode == 200 && data.message.length) {
    return data.message.find((item) => item.id == id)?.companyType;
  } else {
    return "";
  }
};
