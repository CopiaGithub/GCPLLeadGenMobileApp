export interface RoleMaster {
  id: number;
  orgId: number;
  roleName: string;
  roleDescription: string;
  createdBy: string;
  status: boolean;
}
export interface RoleMasterResponse {
  message: Array<RoleMaster>;
  statusCode: number;
  error: string;
}
export interface RoleMasterState {
  roleMaster: RoleMasterResponse | null;
  error: string | null | undefined;
  isRoleMastersFetched: boolean;
}
