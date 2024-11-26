import { ProductFamilyResponse } from "../../../../types/productFamilyModelTypes/ProductFamilyTypes";
import { ProductModelResponse } from "../../../../types/productFamilyModelTypes/ProductModelTypes";
import { DropDownType } from "../../../login/CDSDropDown";

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
