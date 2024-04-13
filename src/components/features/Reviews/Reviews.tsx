"use client";

import React, { useEffect } from "react";

import styles from "./Reviews.module.css";
import ReviewsCard from "@/components/shared/Reviews/ReviewsCard";
import { useGetReviewsQuery } from "@/common/redux/reviewsApi";
import { Review } from "@/common/redux/model";
import { useCart } from "@/common/context/CartContexProvider";
import { ContextT } from "@/common/context/module";

const Reviews = () => {
  const { data, isError, isLoading } = useGetReviewsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading reviews.</div>;
  }

  return (
    <div className={styles.list}>
      {data.map((review: Review, index: number) => (
        <ReviewsCard key={index}>
          <div dangerouslySetInnerHTML={{ __html: review.text }} />
        </ReviewsCard>
      ))}
    </div>
  );
};

export default Reviews;
