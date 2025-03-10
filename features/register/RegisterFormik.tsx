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
        orgId: 0,
        orgName: "",
        password: "",
        pincode: 0,
        roleId: 1,
        sbuId: 1,
        status: true,
        username: "",
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
