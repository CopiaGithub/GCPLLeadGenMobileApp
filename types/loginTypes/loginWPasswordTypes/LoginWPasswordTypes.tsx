export interface LoginWPasswordReq {
  email: string;
  password: string;
}

export interface LoginWPasswordResp {
  message: LoginWPasswordRespMessage;
  error: string;
  statusCode: number;
}
export enum LoginMethod {
  Password = "Password",
  OTP = "OTP",
}
export interface LoginWPasswordRespMessage {
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
