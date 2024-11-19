export interface UpdatePasswordReq {
  password: string;
  id: string;
}
export interface UpdatePasswordResp {
  statusCode: number;
  message: string;
  //   id: 40;
  //   orgId: 1;
  //   orgName: "aa";
  //   sbuId: 1;
  //   username: "Siddhesh Chaure";
  //   password: "123";
  //   email: "siddhesh.chaure@copiacs.com";
  //   mobile: "9373246331";
  //   address: "airoli";
  //   pincode: 1;
  //   roleId: 1;
  //   createdBy: null;
  //   createdOn: "2024-11-18T15:46:28.958Z";
  //   modifiedBy: null;
  //   modifiedOn: "2024-11-19T04:13:58.595Z";
  status: boolean;
}
