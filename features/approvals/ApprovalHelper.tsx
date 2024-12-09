import * as Yup from "yup";
import { GetUserRespMessage } from "../../types/userTypes/GetUserTypes";

export interface IApprovalsForm {
  items: GetUserRespMessage[];
}

interface IApprovalsHelper {
  formikInstance: any;
  formikInitialValue: IApprovalsForm;
  dsrValidationSchema: any;
}

class ApprovalsHelper implements IApprovalsHelper {
  formikInstance: any;
  constructor() {}

  public get formikInitialValue(): IApprovalsForm {
    return {
      items: [],
    };
  }
  public set formikInitialValue(value: IApprovalsForm) {
    this.formikInitialValue.items = value.items;
  }

  public get dsrValidationSchema(): any {
    const validationSchema = Yup.object().shape({});
    return validationSchema;
  }
}
export default ApprovalsHelper;
