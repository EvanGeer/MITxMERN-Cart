import product from "./product";

export default interface Store {
  productList: product[];
  cart: product[];
  removeFromCart: (index: number) => void;
  addToCart: (item: product) => void;
  formattedTotal: number;
  total: number;
  restockProducts: () => void;
  restockQuery: string;
  setRestockQuery: (newQuery: string) => void;
}
