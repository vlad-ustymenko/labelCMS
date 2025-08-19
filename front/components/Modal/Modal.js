"use client";
import { useModalContext } from "@/context/ModalContext";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller, set } from "react-hook-form";
// import { X } from "lucide-react";
import useClickOutside from "@/hooks/useClickOutside";
import IMask from "imask";
// import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./Modal.module.css";
import Loader from "../Loader/Loader";

const Modal = () => {
  const {
    activeModal,
    setActiveModal,
    loading,
    setLoading,
    isSend,
    setIsSend,
  } = useModalContext();
  const phoneInputRef = useRef(null);

  useEffect(() => {
    const isModalOpen = activeModal;
    document.documentElement.style.overflow = isModalOpen ? "hidden" : "";
  }, [activeModal]);

  const modalRef = useClickOutside(() => {
    setActiveModal(false);
    setTimeout(() => {
      setIsSend(false);
    }, 1000);
    reset();
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        reset();
        setIsSend(true);
        setLoading(false);
        alert("ok");
      } else {
        setSending(false);
        setLoading(false);
      }
    } catch (error) {
      alert("Щось пішло не так. Спробуйте пізніше.");
    } finally {
      setLoading(false);
      setIsSend(true);
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
            {isSend ? (
              <div className={styles.content}>
                <div className={styles.title}>
                  Заявку надіслано. Дякуємо Вам!
                </div>
                <p className={styles.text}>
                  Найближчим часом наш менеджер зв'яжеться з Вами.
                </p>
              </div>
            ) : (
              <div className={styles.content}>
                <h2 className={styles.title}>
                  Дізнайтеся умови реалізації Вашого проєкту вже зараз!
                </h2>
                <p className={styles.text}>
                  Вкажіть номер телефону і ми Вам зателефонуємо.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                  <label htmlFor="name" className={styles.label}>
                    Ваше ім'я
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Це поле є обов'язковим",
                      pattern: {
                        value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]+$/,
                        message: "Допускаються лише літери",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          id="name"
                          className={`${styles.input} `}
                          onChange={(e) => {
                            const onlyLetters = e.target.value.replace(
                              /[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]/g,
                              ""
                            );
                            field.onChange(onlyLetters);
                          }}
                        />
                        {errors.name && (
                          <span className={styles.requiredSpan}>
                            {errors.name.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                  <label htmlFor="phone" className={styles.label}>
                    Номер телефону
                  </label>

                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Це поле є обов'язковим",
                      pattern: {
                        value: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                        message: "Некоректний номер",
                      },
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          placeholder="+38 (___) ___-__-__"
                          id="phone"
                          type="tel"
                          ref={(el) => {
                            field.ref(el);
                            phoneInputRef.current = el; // зберігаємо у свій ref для IMask
                          }}
                          className={`${styles.input} `}
                        />
                        {errors.phone && (
                          <span className={styles.requiredSpan}>
                            {errors.phone.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                  <button type="submit" className={styles.button}>
                    Замовити консультацію
                  </button>
                </form>
              </div>
            )}
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
              className={styles.closeIcon}
              onClick={() => {
                setActiveModal(false);
                setTimeout(() => {
                  setIsSend(false);
                }, 1000);
                reset();
              }}
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
