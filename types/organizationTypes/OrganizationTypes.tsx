export interface OrgnizationData {
  id: string;
  orgName: string;
  orgDescription: string;
  address: string;
  pincode: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  status: string;
}
export interface OrganizationDataResponse {
  id: string;
  orgName: string;
  orgDescription: string;
  address: string;
  pincode: string;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  status: string;
}
export interface OrganizationDataState {
  orgData: Array<OrganizationDataResponse> | null;
  error: string | null | undefined;
  isOrgDataFetched: boolean;
}
