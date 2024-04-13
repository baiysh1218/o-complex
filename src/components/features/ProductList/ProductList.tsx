"use client";

import { useGetProductsQuery } from "@/common/redux/productsApi";
import ProductCart from "@/components/shared/ProductCart/ProductCart";
import React, { useEffect, useState } from "react";
import { ProductT } from "./module";

import styles from "./ProductList.module.css";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const { data, isError, isLoading } = useGetProductsQuery({ page, pageSize });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading reviews.</div>;
  }

  return (
    <div className={styles.list}>
      {data.products.map((item: ProductT) => (
        <ProductCart key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductList;
