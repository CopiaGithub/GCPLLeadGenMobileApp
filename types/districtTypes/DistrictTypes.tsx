export interface District {
  id: number;
  stateId: number;
  name: string;
}
export interface DistrictResponse {
  message: District;
  statusCode: number;
  error: string;
}
export interface DistrictState {
  districts: DistrictResponse | null;
  error: string | null | undefined;
  isDistrictsFetched: boolean;
}
