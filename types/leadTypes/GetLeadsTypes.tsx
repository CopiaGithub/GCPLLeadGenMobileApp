export interface GetProductsIntersted {
  id: number;
  visitorMasterId: number;
  productFamilyId: number;
  productId: number;
  modelId: number;
  noOfMachines: number;
  planningTimeline: string;
  financingReuired: boolean;
  noOfPeopleAccompanied: number;
  noOfGiftsNeeded: number;
}
export interface GetVisitorDetails {
  id: number;
  visitorName: string;
  email: string;
  mobileNo: string;
  visitorMasterId: number;
}
export interface GetLeadRespMessage {
  id: string;
  orgId: string;
  sbuId: string;
  campaignId: string;
  industryTypeId: string;
  companyType: string;
  companyName: string;
  address: string;
  noOfGifts: string;
  giftDetails: string;
  stateId: number;
  districtId: number;
  pincode: number;
  attachmentId: number;
  giftVoucher: string;
  gvDisbursement: string;
  createdBy: string;
  createdOn: string;
  status: boolean;
  productsInterested: Array<GetProductsIntersted>;
  visitorDetails: Array<GetVisitorDetails>;
  productCollapseState: boolean;
  visitorCollapseState: boolean;
}

export interface GetLeadResp {
  message: Array<GetLeadRespMessage>;
  statusCode: number;
}

export interface GetLeadDataState {
  leadDetails: GetLeadResp | null;
  error: string | null | undefined;
  isLeadDetailsFetched: boolean;
}
