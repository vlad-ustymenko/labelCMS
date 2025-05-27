import React from "react";
import st from "./Container.module.css";

const Container = ({ children, className }) => {
  return <div className={`${st.container} ${className}`}>{children}</div>;
};

export default Container;
