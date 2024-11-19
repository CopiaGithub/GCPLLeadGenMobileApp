export interface RegisterUser {
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
export interface RegisterUserResponse {
  orgId: string;
  orgName: string;
  sbuId: string;
  username: string;
  password: string;
  email: string;
  mobile: string;
  address: string;
  pincode: string;
  roleId: string;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  status: string;
  message: string;
  error: string;
  statusCode: number;
}
