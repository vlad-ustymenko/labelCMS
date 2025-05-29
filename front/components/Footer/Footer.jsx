import React from "react";
import st from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import Container from "../Container/Container";

const Footer = () => {
  return (
    <Container className={st.grid}>
      <div className={st.wrapper}>
        <div>
          <address>
            <h2>Товариство з обмеженою відповідальністю «Label studio»</h2>
            <a href="https://maps.app.goo.gl/MSd2sphvoWWAEeDd7" target="_blank">
              Юридична/фактична адреса: 117418, м.Київ , пр-т Лобановського, 4Ж,
              офіс 198
            </a>
          </address>
          ІПН 7727507928 КПП 772701001 ОГРН 1047796217941
          <a href="tel:+380953195758">+38 (095) 319-57-58</a>
          <a href="mailto:label.studio@gmail.com">label.studio@gmail.com</a>
        </div>
        <div className={st.order}>Замовити проект</div>
        <div></div>
        <div className={st.copyright}>© 2022 Label studio</div>
        <a className={st.phone} href="tel:+380953195758">
          +38 (095) 319-57-58
        </a>
        <div className={st.social}>
          <FaFacebookF />
          <FaInstagram />
          <FaTelegramPlane />
        </div>
      </div>
    </Container>
  );
};

export default Footer;
