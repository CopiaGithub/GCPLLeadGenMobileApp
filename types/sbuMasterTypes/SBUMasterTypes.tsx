export interface SBUMasterMessage {
  id: number;
  orgId: number;
  sbuName: string;
  sbuDescription: string;
  Status: boolean;
}

export interface SBUMasterResp {
  message: Array<SBUMasterMessage>;
  statusCode: number;
}

export interface SBUMasterState {
  sbuMaster: SBUMasterResp | null;
  error: string | null | undefined;
  isSBUMasterDataFetched: boolean;
}
