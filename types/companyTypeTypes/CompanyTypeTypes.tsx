export interface CompanyType {
  id: number;
  companyType: string;
  companyTypeDescription: string;
  status: boolean;
}
export interface CompanyTypeResponse {
  message: Array<CompanyType>;
  statusCode: number;
  error: string;
}
export interface CompanyTypeState {
  CompanyType: CompanyTypeResponse | null;
  error: string | null | undefined;
  isCompanyTypesFetched: boolean;
}
