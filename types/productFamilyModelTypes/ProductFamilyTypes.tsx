export interface ProductFamily {
  id: number;
  sbuId: number;
  productFamilyName: string;
  productFamilyDescription: string;
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
