export interface OrganizationDataResponse {
  message: Array<OrgnizationDataItems>;
  statusCode: number;
  error: string;
}
export interface OrgnizationDataItems {
  id: number;
  orgName: string;
  orgDescription: string;
  address: string;
  pincode: number;
  contactPerson: string;
  contactMobile: string;
  contactEmail: string;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  status: boolean;
}
export interface OrganizationDataState {
  orgData: OrganizationDataResponse | null;
  error: string | null | undefined;
  isOrgDataFetched: boolean;
}
