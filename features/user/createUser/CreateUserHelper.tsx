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
        pincode: "",
        roleId: 0,
        sbuId: 0,
        username: "",
        campaignId: 0,
        campaignName: "",
        status: true,
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
