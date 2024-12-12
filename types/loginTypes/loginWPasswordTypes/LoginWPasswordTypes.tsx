export interface LoginWPasswordReq {
  email: string;
  password: string;
  androidVersion: string;
  iosVersion: string;
  platform: string;
}
export interface LoginWPassUser {
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
  user: LoginWPassUser;
}
