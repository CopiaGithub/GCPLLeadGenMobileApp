import { CdsPickerModel } from "../../types/CdsPickerModel";
import { OrganizationDataResponse } from "../../types/organizationTypes/OrganizationTypes";

export const GetOrgData = (data: OrganizationDataResponse[] | null) => {
  const respData: CdsPickerModel[] = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      respData.push({
        label: data[i].orgName,
        value: data[i].id,
      });
    }
  }
  return respData;
};
