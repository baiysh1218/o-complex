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

  // функция для получения продуктов добавленных в корзину из хранилища
  const getCart = () => {
    //получаем данные из localStorage
    let cart = getLocalStorage();

    // проверка на наличие данных под ключом cart  в localstorage
    if (!cart) {
      //помещаем данные в случае, если в cart лежит null
      localStorage.setItem(
        "cart",
        JSON.stringify({
          products: [],
          totalPrice: 0,
        })
      );
      // перезаписываем переменную cart c null на объект
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    // обновляем состояние
    dispatch({ type: "GET_CART", payload: cart });
  };
  // функция для добавления товара в корзину
  const addProductToCart = (product: ProductT) => {
    // получаем содержимое из хранилища под ключом cart
    let cart = getLocalStorage();

    // проверка на существование данных в хранилище под ключом cart
    if (!cart) {
      cart = { products: [], totalPrice: 0 };
    }

    // создаем объект, который добавим в localstorage в массив cart.products
    let newProduct = {
      item: product,
      quantity: 1,
      subPrice: +product.price,
    };

    // проверяем есть ли уже продукт, который хотим добавить в корзину
    let productToFind = cart.products.filter(
      (elem: CartProductT) => elem.item.id === product.id
    );

    // если товар уже добавлен в корзину, то удаляем его из массива cart.products через фильтр, в противном случае добавляем его в cart.products
    if (productToFind.length === 0) {
      cart.products.push(newProduct);
    } else {
      cart.products = cart.products.filter(
        (elem: CartProductT) => elem.item.id !== product.id
      );
    }

    // пересчитываем totalPrice
    cart.totalPrice = calcTotalPrice(cart.products);

    //обновляем данные в localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // обновляем состояние
    dispatch({ type: "GET_CART", payload: cart });
  };

  // функция для проверки на наличие товара в корзине
  const checkProductInCart = (id: number): boolean => {
    const cart = getLocalStorage()?.products; // Получаем корзину или undefined
    return !!cart && cart.some((elem: CartProductT) => elem.item.id === id);
  };
  // функция для изменения кол-ва товаров в корзине
  const changeProductCount = (id: number, quantity: number) => {
    // получаем данные корзины из local storage
    let cart = getLocalStorage();
    //перебираем массив с продуктами из корзины, и у продукта,  у которого id совпадает с тем id, что передали при вызове, перезаписываем кол-во и subPrice
    cart.products = cart.products.map((product: CartProductT) => {
      if (product.item.id === id) {
        product.quantity = quantity;
        product.subPrice = calcSubPrice(product);
      }
      return product;
    });
    // пересчитываем totalPrice, так как кол-во и subprice поменялись
    cart.totalPrice = calcTotalPrice(cart.products);

    // помещаем в localStorage обновленные данные
    localStorage.setItem("cart", JSON.stringify(cart));

    // обновляем состояние корзины
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  };

  const deleteProductFromCart = (id: number) => {
    let cart = getLocalStorage();
    // фильтруем массив products, и оставляем только те продукты, у которых id не совпадает с id переданным при вызове функции
    cart.products = cart.products.filter(
      (elem: CartProductT) => elem.item.id !== id
    );
    // пересчитываем totalPrice
    cart.totalPrice = calcTotalPrice(cart.products);

    // обновляем данные в хранилище
    localStorage.setItem("cart", JSON.stringify(cart));
    // обновляем состояние
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
