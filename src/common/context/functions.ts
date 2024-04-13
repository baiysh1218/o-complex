import { ProductT } from "@/components/features/ProductList/module";
import { CartProductT } from "./module";

export const getLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem("cart") as string);

  return cart;
};

export const calcTotalPrice = (products: any) => {
  const totalPrice = products.reduce(
    (acc: number, curr: CartProductT) => (acc += curr.subPrice),
    0
  );

  return totalPrice;
};

export const calcSubPrice = (product: CartProductT) => {
  return +product.item.price * product.count;
};

export const getProductsCountInCart = () => {
  let cart = getLocalStorage();
  return cart ? cart.products.length : 0;
};
