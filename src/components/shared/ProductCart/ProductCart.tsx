import React, { FC, useEffect, useState } from "react";
import { ProductCartProp } from "./module";

import styles from "./ProductCart.module.css";
import { useCart } from "@/common/context/CartContexProvider";
import { ContextT } from "@/common/context/module";
import { getLocalStorage } from "@/common/context/functions";

const ProductCart: FC<ProductCartProp> = ({ item }) => {
  const countLS: any = getLocalStorage() as any;

  const [switchState, setSwitchState] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(1);

  const { addProductToCart, changeProductCount, getCart, checkProductInCart } =
    useCart() as ContextT;

  // Устанавливаем начальное значение value из localStorage при монтировании
  useEffect(() => {
    const existingProduct = countLS?.products.find(
      (product: any) => product.item.id === item.id
    );
    if (existingProduct) {
      setValue(existingProduct.count);
      setProductCount(existingProduct.count);
    }
  }, []);

  const increment = () => {
    setValue(value + 1);
    changeProductCount(item.id, value + 1);
    setProductCount(productCount + 1);
  };

  const decrement = () => {
    if (value > 1) {
      setValue(value - 1);
      changeProductCount(item.id, value - 1);
      setProductCount(productCount - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setValue(newValue);
      changeProductCount(item.id, newValue);
      setProductCount(newValue);
    }
  };

  useEffect(() => {
    getCart();
  }, [switchState, value]);

  return (
    <div className={styles.cart}>
      <img src={item.image_url} alt={item.title} />
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>{item.price} ₽</p>
      {!switchState && !checkProductInCart(item.id) ? (
        <button
          onClick={() => {
            setSwitchState(true);
            addProductToCart(item);
          }}
        >
          Купить
        </button>
      ) : (
        <div>
          <button onClick={decrement}>-</button>
          <input
            value={value}
            onChange={handleInputChange}
            className={styles.input}
            type="number"
          />
          <button onClick={increment}>+</button>
        </div>
      )}
    </div>
  );
};

export default ProductCart;
