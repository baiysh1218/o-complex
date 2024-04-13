"use client";

import AddProductToCard from "@/components/shared/AddProductToCard/AddProductToCard";
import React, { useEffect } from "react";

import styles from "./Card.module.css";
import { useCart } from "@/common/context/CartContexProvider";
import { ContextT } from "@/common/context/module";

const Card = () => {
  return (
    <div className={styles.card}>
      <AddProductToCard />
    </div>
  );
};

export default Card;
