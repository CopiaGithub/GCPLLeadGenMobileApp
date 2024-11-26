export interface ProductFamily {
  id: number;
  orgId: number;
  sbuId: number;
  productFamilyId: number;
  productCode: string;
  productName: string;
  productDescription: string;
}
export interface ProductFamilyResponse {
  message: Array<ProductFamily>;
  statusCode: number;
  error: string;
}
export interface ProductFamilyState {
  ProductFamily: ProductFamilyResponse | null;
  error: string | null | undefined;
  isProductFamilysFetched: boolean;
}
