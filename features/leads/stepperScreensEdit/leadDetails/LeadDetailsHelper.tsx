import * as Yup from "yup";

export interface CustomerDetails {
  ID: number;
  customerName: string;
  mobileNumber: string;
  alternativeMobileNumber: string;
  email: string;
  sbuId: number;
}

export interface AddCustomerData {
  campaignID: number;
  companyName: string;
  companyTypeID: number;
  industryTypeId: number;
  location: string;
  pinCode: string;
  customerArray: Array<CustomerDetails>;
}

export interface IAddCustomerData {
  campaignID: number;
  companyName: string;
  companyTypeID: number;
  industryTypeId: number;
  location: string;
  customerName: string;
  mobileNumber: string;
  alternativeMobileNumber: string;
  email: string;
  pinCode: string;
}

interface IAddCustomerDataHelper {
  formikInstance: any;
  formikInitialValue: IAddCustomerData;
  dsrValidationSchema: any;
}

class AddCustomerDataHelper implements IAddCustomerDataHelper {
  formikInstance: any;
  constructor() {}

  public get formikInitialValue(): IAddCustomerData {
    return {
      campaignID: 0,
      companyName: "",
      companyTypeID: 0,
      industryTypeId: 0,
      location: "",
      alternativeMobileNumber: "",
      customerName: "",
      email: "",
      mobileNumber: "",
      pinCode: "",
    };
  }
  public set formikInitialValue(value: IAddCustomerData) {
    this.formikInitialValue.campaignID = value.campaignID;
    this.formikInitialValue.customerName = value.customerName;
    this.formikInitialValue.mobileNumber = value.mobileNumber;
    this.formikInitialValue.alternativeMobileNumber =
      value.alternativeMobileNumber;
    this.formikInitialValue.email = value.email;
    this.formikInitialValue.companyName = value.companyName;
    this.formikInitialValue.companyTypeID = value.companyTypeID;
    this.formikInitialValue.industryTypeId = value.industryTypeId;
    this.formikInitialValue.location = value.location;
    this.formikInitialValue.pinCode = value.pinCode;
  }

  public get dsrValidationSchema(): any {
    const validationSchema = Yup.object().shape({});
    return validationSchema;
  }
}
export default AddCustomerDataHelper;
