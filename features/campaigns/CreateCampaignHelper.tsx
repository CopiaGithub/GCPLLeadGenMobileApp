import * as Yup from "yup";

export interface ICreateCampaignForm {
  campaignName: string;
  campaignTypeID: number;
  fromDate: Date;
  toDate: Date;
  organizationID: number;
  stateID: number;
  districtID: number;
  location: string;
  campaignObjective: string;
}

interface ICreateCampaignHelper {
  formikInstance: any;
  formikInitialValue: ICreateCampaignForm;
  dsrValidationSchema: any;
}

class CreateCampaignHelper implements ICreateCampaignHelper {
  formikInstance: any;
  constructor() {}

  public get formikInitialValue(): ICreateCampaignForm {
    return {
      campaignName: "",
      campaignObjective: "",
      campaignTypeID: 0,
      districtID: 0,
      fromDate: new Date(),
      location: "",
      organizationID: 0,
      stateID: 0,
      toDate: new Date(),
    };
  }
  public set formikInitialValue(value: ICreateCampaignForm) {
    this.formikInitialValue.campaignName = value.campaignName;
    this.formikInitialValue.campaignObjective = value.campaignObjective;
    this.formikInitialValue.campaignTypeID = value.campaignTypeID;
    this.formikInitialValue.districtID = value.districtID;
    this.formikInitialValue.fromDate = value.fromDate;
    this.formikInitialValue.toDate = value.toDate;
    this.formikInitialValue.stateID = value.stateID;
    this.formikInitialValue.location = value.location;
    this.formikInitialValue.organizationID = value.organizationID;
  }

  public get dsrValidationSchema(): any {
    const validationSchema = Yup.object().shape({});
    return validationSchema;
  }
}
export default CreateCampaignHelper;
