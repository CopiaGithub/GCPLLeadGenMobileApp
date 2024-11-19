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
        address: "Airoli",
        email: "",
        mobile: "8778489464",
        orgId: 1,
        orgName: "Copia",
        password: "1234",
        pincode: 400708,
        roleId: 1,
        sbuId: 1,
        status: true,
        username: "Siddhesh",
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
