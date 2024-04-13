import { ProductT } from "@/components/features/ProductList/module";

export type CartProductT = {
  item: ProductT;
  quantity: number;
  subPrice: number;
};

export type CartProductArrayT = {
  products: CartProductT[];
  totalPrice: 122148;
};

export type ContextT = {
  cart: CartProductArrayT;
  getCart: () => void;
  addProductToCart: (product: ProductT) => void;
  checkProductInCart: (id: number) => boolean;
  changeProductCount: (id: number, count: number) => void;
  deleteProductFromCart: (id: number) => void;
  getProductsCountInCart: () => any;
};
