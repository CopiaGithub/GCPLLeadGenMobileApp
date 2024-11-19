export interface LoginWPasswordReq {
  email: string;
  password: string;
}

export interface LoginWPasswordResp {
  id: number;
  email: string;
  mobileNo: string;
  roleId: number;
  message: string;
  error: string;
  statusCode: number;
}
