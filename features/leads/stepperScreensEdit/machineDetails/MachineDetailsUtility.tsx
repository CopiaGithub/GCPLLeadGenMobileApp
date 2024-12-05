import { ProductFamilyResponse } from "../../../../types/productFamilyModelTypes/ProductFamilyTypes";
import {
  Models,
  ProductModel,
  ProductModelResponse,
} from "../../../../types/productFamilyModelTypes/ProductModelTypes";
import { SBUMasterResp } from "../../../../types/sbuMasterTypes/SBUMasterTypes";
import { DropDownType } from "../../../login/CDSDropDown";
import { AddCustomerData } from "../leadDetails/LeadDetailsHelper";
import { MachineDetailsData } from "./machineDetailsDao/MachineDetails";

export const GetProductFamily = (data: ProductFamilyResponse | null) => {
  const respData: DropDownType[] = [];
  if (data && data.statusCode == 200 && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      respData.push({
        label: data.message[i].productFamilyName,
        value: data.message[i].id.toString(),
      });
    }
  }
  return respData;
};

export const GetProductModel = (data: ProductModelResponse | null) => {
  const respData: DropDownType[] = [];
  if (data && data.message && data.message.length) {
    for (let i = 0; i < data.message.length; i++) {
      respData.push({
        label: data.message[i].productName,
        value: data.message[i].id.toString(),
      });
    }
  }
  return respData;
};
export const GetProductFamNameById = (
  data: ProductFamilyResponse | null,
  id: number
) => {
  if (data && data.statusCode == 200 && data.message && data.message.length) {
    return data.message.find((item) => item.id == id)?.productFamilyName;
  }
};

export const GetProductModelNameById = (
  data: ProductModelResponse | null,
  id: number
) => {
  if (data && data.message && data.message.length) {
    return data.message.find((item) => item.id == id)?.productName;
  }
};
export const GetSBUNameById = (data: SBUMasterResp | null, id: number) => {
  if (data && data.statusCode == 200 && data.message && data.message.length) {
    return data.message.find((item) => item.id == id)?.sbuName;
  }
};

export const GetModelFromProductModel = (
  model: ProductModel[] | undefined,
  id: number
) => {
  if (model && model.length) {
    return model.find((item) => item.id == id);
  } else return "";
};
export interface MachineDetailsFormData {
  machineArray: Array<MachineDetailsData>;
}
