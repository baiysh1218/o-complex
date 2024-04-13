"use client";

import React, { FormEvent, useEffect, useState } from "react";

import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

import styles from "./AddProductToCard.module.css";
import { useCart } from "@/common/context/CartContexProvider";
import { CartProductT, ContextT } from "@/common/context/module";
import { usePostOrderMutation } from "@/common/redux/orderApi";

const AddProductToCard = () => {
  const { cart } = useCart() as ContextT;

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);
  const [success, setSuccess] = useState<null | string>(null);

  const [addOrder, { isLoading }] = usePostOrderMutation();

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (phoneNumber !== "79163452487") {
        setInputError(true);
        setTimeout(() => {
          setInputError(false);
        }, 500);
        return;
      }
      const dataCart = cart.products.map((item) => ({
        id: item.item.id,
        quantity: item.quantity,
      }));

      const order = {
        phone: phoneNumber,
        cart: dataCart,
      };
      await addOrder(order);
      setSuccess("Вы успешно закупились!");
      setTimeout(() => {
        setSuccess(null);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.product_to_card}>
      <h2>Добавленные товары: {cart?.products.length} </h2>
      <table>
        <thead>
          <tr>
            <th className={styles.title}>Имя</th>
            <th>Количество</th>
            <th>цена</th>
          </tr>
        </thead>
        <tbody>
          {cart?.products.map((item: CartProductT) => (
            <tr key={item.item.id}>
              <td>{item.item.title}</td>
              <td className={styles.count}>{item.quantity}</td>
              <td>{item.subPrice}₽</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSend}>
        {inputError && (
          <label className={styles.label}>
            Пожалуиста введите номер правильно!
          </label>
        )}
        {success && <label className={styles.label_white}>{success}</label>}

        <input
          className={styles.input}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
          placeholder="+7 (___) ___ __-__"
          max="18"
          min="18"
        />
        <button type="submit">{!isLoading ? "Заказать" : "Загрузка"}</button>
      </form>
    </div>
  );
};

export default AddProductToCard;
