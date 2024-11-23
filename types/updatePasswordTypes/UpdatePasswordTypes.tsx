export interface UpdatePasswordReq {
  password: string;
  id: number;
}
export interface UpdatePasswordResp {
  statusCode: number;
  message: UpdatePasswordMessage;
  status: boolean;
}
export interface UpdatePasswordMessage {
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
