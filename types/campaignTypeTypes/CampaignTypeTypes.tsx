export interface CapmpaignType {
  id: number;
  camapignType: string;
  campaignTypeDescription: string;
}
export interface CapmpaignTypeResponse {
  message: Array<CapmpaignType>;
  statusCode: number;
  error: string;
}
export interface CapmpaignTypeState {
  capmpaignTypes: CapmpaignTypeResponse | null;
  error: string | null | undefined;
  isCapmpaignTypesFetched: boolean;
}
