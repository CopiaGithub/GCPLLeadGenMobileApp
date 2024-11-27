import * as Yup from "yup";
import { GetLeadRespMessage } from "../../types/leadTypes/GetLeadsTypes";

export interface IGiftForm {
  formData: Array<GetLeadRespMessage>;
}

interface IGiftsHelper {
  formikInstance: any;
  formikInitialValue: IGiftForm;
  dsrValidationSchema: any;
}

class GiftsHelper implements IGiftsHelper {
  formikInstance: any;
  constructor() {}

  public get formikInitialValue(): IGiftForm {
    return {
      formData: [],
    };
  }
  public set formikInitialValue(value: IGiftForm) {
    this.formikInitialValue.formData = value.formData;
  }

  public get dsrValidationSchema(): any {
    const validationSchema = Yup.object().shape({});
    return validationSchema;
  }
}
export default GiftsHelper;
