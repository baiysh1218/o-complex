"use client";

import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";
import {
  calcTotalPrice,
  getLocalStorage,
  calcSubPrice,
  getProductsCountInCart,
} from "./functions";
import { CartProductArrayT, CartProductT, ContextT } from "./module";
import { ProductT } from "@/components/features/ProductList/module";

export const cartContext = createContext<ContextT | null>(null);
export const useCart = () => useContext(cartContext);

const INIT_STATE = {
  cart: JSON.parse(localStorage.getItem("cart") as string),
};

const reducer = (
  state = INIT_STATE,
  action: { type: string; payload: CartProductArrayT }
) => {
  switch (action.type) {
    case "GET_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

const CartContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getCart = () => {
    let cart = getLocalStorage();

    if (!cart) {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          products: [],
          totalPrice: 0,
        })
      );
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    dispatch({ type: "GET_CART", payload: cart });
  };
  const addProductToCart = (product: ProductT) => {
    let cart = getLocalStorage();

    if (!cart) {
      cart = { products: [], totalPrice: 0 };
    }

    let newProduct = {
      item: product,
      quantity: 1,
      subPrice: +product.price,
    };

    let productToFind = cart.products.filter(
      (elem: CartProductT) => elem.item.id === product.id
    );

    if (productToFind.length === 0) {
      cart.products.push(newProduct);
    } else {
      cart.products = cart.products.filter(
        (elem: CartProductT) => elem.item.id !== product.id
      );
    }

    cart.totalPrice = calcTotalPrice(cart.products);

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: "GET_CART", payload: cart });
  };

  const checkProductInCart = (id: number): boolean => {
    const cart = getLocalStorage()?.products; // Получаем корзину или undefined
    return !!cart && cart.some((elem: CartProductT) => elem.item.id === id);
  };
  const changeProductCount = (id: number, quantity: number) => {
    let cart = getLocalStorage();
    cart.products = cart.products.map((product: CartProductT) => {
      if (product.item.id === id) {
        product.quantity = quantity;
        product.subPrice = calcSubPrice(product);
      }
      return product;
    });
    cart.totalPrice = calcTotalPrice(cart.products);

    localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const deleteProductFromCart = (id: number) => {
    let cart = getLocalStorage();
    cart.products = cart.products.filter(
      (elem: CartProductT) => elem.item.id !== id
    );
    cart.totalPrice = calcTotalPrice(cart.products);

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const values = {
    getCart,
    cart: state.cart,
    addProductToCart,
    checkProductInCart,
    changeProductCount,
    deleteProductFromCart,
    getProductsCountInCart,
  };
  return <cartContext.Provider value={values}>{children}</cartContext.Provider>;
};

export default CartContextProvider;
