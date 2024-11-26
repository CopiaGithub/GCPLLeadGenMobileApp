export interface Models {
  id: number;
  modelName: string;
  productMasterId: number;
}

export interface ProductModel {
  model: Array<Models>;
}
export interface ProductModelResponse {
  message: ProductModel;
  statusCode: number;
  error: string;
}
export interface ProductModelState {
  ProductModel: ProductModelResponse | null;
  error: string | null | undefined;
  isProductModelsFetched: boolean;
}
