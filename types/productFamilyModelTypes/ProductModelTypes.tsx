export interface Models {
  id: number;
  modelName: string;
  productMasterId: number;
}

export interface ProductModel {
  id: number;
  orgId: number;
  sbuId: number;
  productFamilyId: number;
  productCode: string;
  productName: string;
  productDescription: string;
}
export interface ProductModelResponse {
  message: Array<ProductModel>;
}
export interface ProductModelState {
  ProductModel: ProductModelResponse | null;
  error: string | null | undefined;
  isProductModelsFetched: boolean;
}
