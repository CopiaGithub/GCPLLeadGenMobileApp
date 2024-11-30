export interface CreateCampaignReq {
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
}
export interface CreateCampaignResp {
  message: Array<CreateCampaignMessage>;
  statusCode: number;
}
export interface CreateCampaignMessage {
  id: number;
  orgId: number;
  campaignName: string;
  campaignTypeId: number;
  description: string;
  fromDate: string;
  toDate: string;
}
