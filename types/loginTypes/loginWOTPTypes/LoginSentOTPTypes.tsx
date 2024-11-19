export interface LoginSendOTPReq {
  email: string;
}

export interface LoginSendOTPResp {
  message: string;
  statusCode: number;
}
