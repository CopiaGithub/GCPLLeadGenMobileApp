export interface IndustryType {
  id: number;
  industryType: string;
  industryTypeDescription: string;
  status: boolean;
}
export interface IndustryTypeResponse {
  message: Array<IndustryType>;
  statusCode: number;
  error: string;
}
export interface IndustryTypeState {
  IndustryType: IndustryTypeResponse | null;
  error: string | null | undefined;
  isIndustryTypesFetched: boolean;
}
