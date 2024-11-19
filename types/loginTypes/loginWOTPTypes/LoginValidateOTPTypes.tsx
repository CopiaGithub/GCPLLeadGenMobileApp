export interface LoginValidOTPReq {
  email: string;
  otp: string;
}

export interface LoginValidOTPResp {
  message: boolean;
  statusCode: number;
}
