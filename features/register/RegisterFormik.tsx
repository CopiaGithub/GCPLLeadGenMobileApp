import * as Yup from "yup";
import { RegisterUser } from "../../types/registerType/RegisterType";

export interface IRegisterForm {
  formData: RegisterUser;
}

interface IRegisterHelper {
  formikInstance: any;
  formikInitialValue: IRegisterForm;
  dsrValidationSchema: any;
}

class RegisterHelper implements IRegisterHelper {
  formikInstance: any;
  constructor() {}

  public get formikInitialValue(): IRegisterForm {
    return {
      formData: {
        address: "",
        email: "",
        mobile: "",
        orgId: 1,
        orgName: "",
        password: "",
        pincode: "",
        roleId: 1,
        sbuId: 1,
        status: true,
        username: "",
        campaignId: 0,
        campaignName: "",
      },
    };
  }
  public set formikInitialValue(value: IRegisterForm) {
    this.formikInitialValue.formData = value.formData;
  }

  public get dsrValidationSchema(): any {
    const validationSchema = Yup.object().shape({});
    return validationSchema;
  }
}
export default RegisterHelper;
