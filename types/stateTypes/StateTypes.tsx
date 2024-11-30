export interface States {
  id: number;
  name: string;
}
export interface StateResponse {
  message: Array<States>;
  statusCode: number;
  error: string;
}
export interface StateState {
  states: StateResponse | null;
  error: string | null | undefined;
  isStatesFetched: boolean;
}
