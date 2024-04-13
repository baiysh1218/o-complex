import React, { FC } from "react";

import styles from "./Reviews.module.css";
import { ReviewProp } from "./model";

const ReviewsCard: FC<ReviewProp> = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

export default ReviewsCard;
