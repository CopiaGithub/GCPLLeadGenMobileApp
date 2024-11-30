export interface LoginValidOTPReq {
  email: string;
  otp: string;
}

export interface LoginValidOTPResp {
  message: LoginValidOTPMessage;
  statusCode: number;
  error: string;
}
export interface LoginValidOTPMessage {
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
}
