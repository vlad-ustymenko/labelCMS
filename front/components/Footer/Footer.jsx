"use client";
import React from "react";
import st from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { useModalContext } from "@/context/ModalContext";
import Container from "../Container/Container";
import Button from "../Button/Button";

const Footer = ({ data }) => {
  const { setActiveModal } = useModalContext();

  const { title, address, phone, email, copyright, ipn, buttonTitle } = data;

  const handleClick = () => {
    setActiveModal(true);
  };

  return (
    <Container className={st.grid}>
      <div className={st.wrapper}>
        <div>
          <address>
            <h2 className={st.title}>{title}</h2>
            <a
              href="https://maps.app.goo.gl/MSd2sphvoWWAEeDd7"
              target="_blank"
              className={st.address}
            >
              {address}
            </a>
          </address>
          {ipn}
          <a href="tel:+380953195758" className={st.contentPhone}>
            {phone}
          </a>
          <a href="mailto:label.studio@gmail.com" className={st.contentEmail}>
            {email}
          </a>
        </div>
        <Button className={st.order} primary title={buttonTitle} />

        <div></div>
        <div className={st.copyright}>© 2022 Label studio</div>
        <a className={st.phone} href="tel:+380953195758">
          {phone}
        </a>
        <div className={st.social}>
          <a
            href="https://www.facebook.com/label.studio"
            target="_blank"
            className={st.iconWrapper}
            aria-label="Facebook"
          >
            <FaFacebookF className={st.icon} />
          </a>
          <a
            href="https://www.instagram.com/label.studio/"
            target="_blank"
            className={st.iconWrapper}
            aria-label="Instagram"
          >
            <FaInstagram className={st.icon} />
          </a>
          <a
            href="https://t.me/label_studio"
            target="_blank"
            className={st.iconWrapper}
            aria-label="Telegram"
          >
            <FaTelegramPlane className={st.icon} />
          </a>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
