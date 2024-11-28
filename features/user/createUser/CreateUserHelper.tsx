import * as Yup from "yup";
import { CreateUserReq } from "../../../types/userTypes/CreateUserTypes";

export interface ICreateUserForm {
  formData: CreateUserReq;
}

interface ICreateUserrHelper {
  formikInstance: any;
  formikInitialValue: ICreateUserForm;
  dsrValidationSchema: any;
}

class CreateUserHelper implements ICreateUserrHelper {
  formikInstance: any;
  constructor() {}

  public get formikInitialValue(): ICreateUserForm {
    return {
      formData: {
        address: "",
        email: "",
        mobile: "",
        orgId: 0,
        orgName: "",
        password: "",
        pincode: 0,
        roleId: 0,
        sbuId: 1,
        username: "",
      },
    };
  }
  public set formikInitialValue(value: ICreateUserForm) {
    this.formikInitialValue.formData = value.formData;
  }

  public get dsrValidationSchema(): any {
    const validationSchema = Yup.object().shape({});
    return validationSchema;
  }
}
export default CreateUserHelper;
