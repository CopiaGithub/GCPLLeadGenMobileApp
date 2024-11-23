export interface CapmpaignType {
  camapignType: string;
  campaignTypeDescription: string;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  status: boolean;
}
export interface CapmpaignTypeResponse {
  message: CapmpaignType;
  statusCode: number;
  error: string;
}
export interface CapmpaignTypeState {
  capmpaignTypes: CapmpaignTypeResponse | null;
  error: string | null | undefined;
  isCapmpaignTypesFetched: boolean;
}
