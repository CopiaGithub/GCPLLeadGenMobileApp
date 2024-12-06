export interface LoginValidOTPReq {
  email: string;
  otp: string;
}

export interface LoginValidOTPResp {
  message: LoginValidOTPMessage;
  statusCode: number;
  error: string;
}
export interface LoginValidOTPUser {
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
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  status: boolean;
  campaignId: string;
  campaignName: string;
  menus: Array<string>;
}
export interface LoginValidOTPMessage {
  user: LoginValidOTPUser;
}
