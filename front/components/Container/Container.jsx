import React from "react";
import st from "./Container.module.css";

const Container = ({ children }) => {
  return <div className={st.container}>{children}</div>;
};

export default Container;
