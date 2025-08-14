import React from "react";
import st from "./ReviewsCard.module.css";

const ReviewsCard = () => {
  return (
    <div className={st.wrapper}>
      <span className={st.icon}>icon</span>
      <span className={st.title}>Title</span>
      <span className={st.content}>Content</span>
      <span className={st.company}>Company</span>
    </div>
  );
};

export default ReviewsCard;
