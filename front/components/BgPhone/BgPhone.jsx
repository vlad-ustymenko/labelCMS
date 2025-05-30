import React from "react";
import st from "./BgPhone.module.css";

const BgPhone = () => {
  return (
    <div>
      <video
        className={st.video}
        autoPlay
        muted
        playsInline
        src="/video/phone.webm"
      ></video>
      <video
        className={st.video2}
        autoPlay
        muted
        playsInline
        src="/video/phones.webm"
      ></video>
    </div>
  );
};

export default BgPhone;
