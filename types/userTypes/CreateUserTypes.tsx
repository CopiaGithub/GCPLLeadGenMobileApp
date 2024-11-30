export interface CreateUserReq {
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
