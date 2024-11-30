export interface ApprovalsReq {
  status: boolean;
}
export interface ApprovalsMessage {
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
export interface ApprovalsResp {
  message: ApprovalsMessage;
  statusCode: number;
  error: string;
}
