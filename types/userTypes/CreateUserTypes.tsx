export interface CreateUserReq {
  orgId: number;
  orgName: string;
  sbuId: number;
  username: string;
  password: string;
  email: string;
  mobile: string;
  address: string;
  pincode: string;
  roleId: number;
  campaignId: number;
  campaignName: string;
  status: boolean;
}
export interface CreateUserMessage {
  id: number;
  orgId: number;
  orgName: string;
  sbuId: number;
  username: string;
  password: string;
  email: string;
  mobile: string;
  address: string;
  pincode: number;
  roleId: number;
  status: boolean;
}
export interface CreateUserResp {
  message: CreateUserMessage;
  statusCode: number;
  error: string;
}
