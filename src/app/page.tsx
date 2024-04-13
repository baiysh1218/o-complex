"use client";

import CartContextProvider from "@/common/context/CartContexProvider";
import { store } from "@/common/redux/store";
import Card from "@/components/features/Card/Card";
import Header from "@/components/features/Header/Header";
import ProductList from "@/components/features/ProductList/ProductList";
import Reviews from "@/components/features/Reviews/Reviews";
import React from "react";
import { Provider } from "react-redux";

const Home = () => {
  return (
    <Provider store={store}>
      <CartContextProvider>
        <Header />
        <Reviews />
        <Card />
        <ProductList />
      </CartContextProvider>
    </Provider>
  );
};

export default Home;
