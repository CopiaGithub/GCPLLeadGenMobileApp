export interface GetCampaignDataState {
  getCampaignData: Array<GetCampaignDataResp> | null;
  error: string | null | undefined;
  isFetched: boolean;
}

export interface GetCampaignDataResp {
  id: number;
  orgId: number;
  campaignName: string;
  description: string;
  fromDate: string;
  toDate: string;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  status: boolean;
}
