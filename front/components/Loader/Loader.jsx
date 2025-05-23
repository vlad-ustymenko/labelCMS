import st from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={st.wrapper}>
      <div className={st.circle}>
        <div className={st.wave}></div>
      </div>
      <span className={st.text}>Loading...</span>
    </div>
  );
}
