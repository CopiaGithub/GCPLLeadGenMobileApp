import { ProductFamilyResponse } from "../../../../types/productFamilyModelTypes/ProductFamilyTypes";
import {
  Models,
  ProductModelResponse,
} from "../../../../types/productFamilyModelTypes/ProductModelTypes";
import { DropDownType } from "../../../login/CDSDropDown";
import { AddCustomerData } from "../leadDetails/LeadDetailsHelper";
import { MachineDetailsData } from "./machineDetailsDao/MachineDetails";

export const GetProductFamily = (data: ProductFamilyResponse | null) => {
  const respData: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      respData.push({
        label: data.message[i].productName,
        value: data.message[i].id.toString(),
      });
    }
  }
  return respData;
};

export const GetProductModel = (data: ProductModelResponse | null) => {
  const respData: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message) {
    for (let i = 0; i < data.message.model.length; i++) {
      respData.push({
        label: data.message.model[i].modelName.toString(),
        value: data.message.model[i].id.toString(),
      });
    }
  }
  return respData;
};

export const GetModelFromProductModel = (
  model: Models[] | undefined,
  id: number
) => {
  if (model && model.length) {
    return model.find((item) => item.id == id);
  } else return "";
};
export interface MachineDetailsFormData {
  machineArray: Array<MachineDetailsData>;
}
