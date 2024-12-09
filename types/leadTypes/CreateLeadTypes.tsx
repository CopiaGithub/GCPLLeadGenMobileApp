export interface SaveLeadReq {
  orgId: number;
  userId: number;
  sbuId: number;
  campaignId: number;
  industryTypeId: number;
  companyType: number;
  companyName: string;
  address: string;
  pincode: number;
  stateId: number;
  districtId: number;
  productsInterested: Array<ProductsInterested>;
  noOfMachines: number;
  planningTimeline: string;
  financingReuired: boolean;
  noOfPeopleAccompanied: number;
  noOfGiftsNeeded: string;
  attachmentId: number;
  giftVoucher: string;
  gvDisbursement: string;
  visitorDetails: Array<VisitorDetails>;
  status: true;
}
export interface ProductsInterested {
  productFamilyId: number;
  productId: number;
  modelId: number;
  sbuId: number;
  noOfMachines: number;
  userId: number;
}
export interface VisitorDetails {
  visitorName: string;
  email: string;
  mobileNo: string;
  sbuId: number;
  userId: number;
}
export interface SaveLeadMessage {
  id: number;
  orgId: number;
  sbuId: number;
  campaignId: number;
  industryTypeId: number;
  companyType: number;
  companyName: string;
  address: string;
  stateId: number;
  districtId: number;
  pincode: number;
  attachmentId: number;
  giftVoucher: string;
  gvDisbursement: string;
}
export interface SaveLeadResp {
  message: SaveLeadMessage;
  statusCode: number;
}
