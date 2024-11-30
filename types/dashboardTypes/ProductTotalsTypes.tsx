export interface ProductTotals {
  productId: number;
  productName: string;
  totalQuantity: number;
}
export interface ProductTotalsResponse {
  message: Array<ProductTotals>;
  statusCode: number;
  error: string;
}
export interface ProductTotalsState {
  productTotals: ProductTotalsResponse | null;
  error: string | null | undefined;
  isProductTotalssFetched: boolean;
}
