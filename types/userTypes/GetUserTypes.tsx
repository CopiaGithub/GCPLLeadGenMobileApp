export interface GetUserRespMessage {
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
export interface GetUserResp {
  message: Array<GetUserRespMessage>;
  statusCode: number;
}

export interface GetUserDataState {
  getUsers: GetUserResp | null;
  error: string | null | undefined;
  isUserDetailsFetched: boolean;
}
