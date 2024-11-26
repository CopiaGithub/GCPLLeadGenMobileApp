export interface GetCampaignMessage {
  id: number;
  orgId: number;
  campaignName: string;
  campaignTypeId: number;
  description: string;
  fromDate: string;
  toDate: string;
  status: boolean;
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
