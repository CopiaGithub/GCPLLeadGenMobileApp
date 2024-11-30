export interface GetCampaignMessage {
  id: number;
  orgId: number;
  campaignName: string;
  campaignTypeId: number;
  description: string;
  fromDate: string;
  toDate: string;
  stateId: number;
  districtId: number;
  location: string;
  campaignObjective: string;
  status: true;
}
export interface GetCampaignDataResp {
  message: Array<GetCampaignMessage>;
  statusCode: number;
}

export interface GetCampaignDataState {
  getCampaignData: GetCampaignDataResp | null;
  error: string | null | undefined;
  isFetched: boolean;
}
