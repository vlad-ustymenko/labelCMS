"use client";
import { useModalContext } from "@/context/ModalContext";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
// import { X } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import IMask from "imask";
// import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Modal.module.css";
import Loader from "../Loader/Loader";

const Modal = () => {
  const { activeModal, setActiveModal, loading, setLoading } =
    useModalContext();
  const [sending, setSending] = useState(false);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    const isModalOpen = activeModal;
    document.documentElement.style.overflow = isModalOpen ? "hidden" : "";
  }, [activeModal]);

  const modalRef = useClickOutside(() => setActiveModal(false));

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setSending(true);

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setActiveModal(false);
        reset();
        setLoading(false);
        alert("ok");
      } else {
        setSending(false);
        setLoading(false);
      }
    } catch (error) {
      alert("Щось пішло не так. Спробуйте пізніше.");
    } finally {
      setSending(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phoneInputRef.current) {
      const mask = IMask(phoneInputRef.current, {
        mask: "+38 (000) 000-00-00",
      });

      mask.on("accept", () => {
        setValue("phone", mask.value, { shouldValidate: true });
      });

      return () => mask.destroy();
    }
  }, [setValue]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={
            activeModal
              ? `${styles.container} ${styles.active}`
              : `${styles.container}`
          }
        >
          <div className={styles.contentWrapper} ref={modalRef}>
            <div className={styles.imageWrapper}>
              <Image
                src="/modalImage.jpeg"
                alt="logo"
                fill
                sizes="(max-width: 768px) 90vw, (min-width: 768px) and (max-width: 1023px) 50vw, 30vw"
                className={styles.image}
              ></Image>
            </div>
            <div>
              <h2 className={styles.title}>
                Дізнайтеся умови реалізації Вашого проєкту вже зараз!
              </h2>
              <p className={styles.content}>
                Вкажіть номер телефону і ми Вам зателефонуємо.
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">Ваше ім'я</label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Це поле є обов'язковим" }}
                  render={({ field }) => (
                    <>
                      <input
                        placeholder="Ваше ім'я"
                        id="name"
                        className={`${styles.input} `}
                        onChange={field.onChange}
                      />
                      {/* {errors[name] && (
                      <span className={styles.requiredSpan}>
                        {errors[name].message}
                      </span>
                    )} */}
                    </>
                  )}
                />
                <label htmlFor="phone">Номер телефону*</label>

                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Це поле є обов'язковим" }}
                  render={({ field }) => (
                    <>
                      <input
                        placeholder="+38 (___) ___-__-__"
                        id="phone"
                        type="tel"
                        ref={phoneInputRef}
                        className={`${styles.input} `}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                      {/* {errors[name] && (
                      <span className={styles.requiredSpan}>
                        {errors[name].message}
                      </span>
                    )} */}
                    </>
                  )}
                />
                <button type="submit" disabled={sending}>
                  Замовити консультацію
                </button>
              </form>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`${styles.closeIcon} ${styles.closeIconActive}`}
              onClick={() => setActiveModal(false)}
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
