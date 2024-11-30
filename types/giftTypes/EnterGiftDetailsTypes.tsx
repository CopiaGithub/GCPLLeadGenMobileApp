export interface EnterGiftDetailsReq {
  noOfGifts: string;
  giftDetails: string;
}
export interface EnterGiftDetailsMessage {
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
  noOfGifts: string;
  giftDetails: string;
  planningTimeline: string;
  financingReuired: string;
  noOfPeopleAccompanied: string;
  noOfGiftsNeeded: string;
  createdBy: string;
  modifiedBy: string;
  status: true;
}
export interface EnterGiftDetailsResp {
  message: EnterGiftDetailsMessage;
  statusCode: number;
}
