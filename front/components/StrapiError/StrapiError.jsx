import React from "react";
import st from "./StrapiError.module.css";

const StrapiError = ({ locale }) => {
  return (
    <main className={st.main}>
      <h1 className={st.title}>
        {locale === "en"
          ? "Oops, something went wrong"
          : "Ой, щось пішло не так"}
      </h1>
      <p className={st.text}>
        {locale === "en"
          ? "The site is currently unavailable, please try again later"
          : "Сайт наразі недоступний, спробуйте ще раз пізніше"}
      </p>
    </main>
  );
};

export default StrapiError;
