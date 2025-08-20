"use client";
import { useModalContext } from "@/context/ModalContext";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useClickOutside from "@/hooks/useClickOutside";
import IMask from "imask";
import Image from "next/image";
import styles from "./Modal.module.css";
import Loader from "../Loader/Loader";
import { createPortal } from "react-dom";

const Modal = ({ data }) => {
  const {
    activeModal,
    setActiveModal,
    loading,
    setLoading,
    isSend,
    setIsSend,
  } = useModalContext();

  const {
    title,
    text,
    nameLabel,
    phoneLabel,
    mainError,
    phoneError,
    sendingTitle,
    sendingText,
    highlightTitle,
  } = data;

  const phoneInputRef = useRef(null);
  const [mounted, setMounted] = useState(false); // <-- додали стан

  useEffect(() => {
    setMounted(true); // тепер знаємо, що document існує
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = activeModal ? "hidden" : "";
  }, [activeModal]);

  const modalRef = useClickOutside(() => {
    setActiveModal(false);
    setTimeout(() => setIsSend(false), 1000);
    reset();
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        reset();
        setIsSend(true);
      } else {
        alert("Помилка при відправці");
      }
    } catch (err) {
      alert("Щось пішло не так. Спробуйте пізніше.");
    } finally {
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
  }, [setValue, activeModal]);

  const getHighlightedText = (title, highlight) => {
    if (!highlight || !title.includes(highlight)) return title;

    const parts = title.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Якщо ще не змонтовано → нічого не рендеримо
  if (!mounted) return null;

  return createPortal(
    loading ? (
      <Loader />
    ) : (
      <div
        className={
          activeModal
            ? `${styles.container} ${styles.active}`
            : styles.container
        }
      >
        <div className={styles.contentWrapper} ref={modalRef}>
          <div className={styles.imageWrapper}>
            <Image
              src="/modalImage.jpeg"
              alt="logo"
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1023px) 50vw, 30vw"
              className={styles.image}
            />
          </div>

          {isSend ? (
            <div className={styles.content}>
              <div className={styles.title}>{sendingTitle}</div>
              <p className={styles.text}>{sendingText}</p>
            </div>
          ) : (
            <div className={styles.content}>
              <h2 className={styles.title}>
                {getHighlightedText(title, highlightTitle)}
              </h2>
              <p className={styles.text}>{text}</p>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <label htmlFor="name" className={styles.label}>
                  {nameLabel}
                </label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: mainError,
                    pattern: {
                      value: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]+$/,
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        id="name"
                        className={styles.input}
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
                  {phoneLabel}
                </label>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: mainError,
                    pattern: {
                      value: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                      message: phoneError,
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
                          phoneInputRef.current = el;
                        }}
                        className={styles.input}
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
              setTimeout(() => setIsSend(false), 1000);
              reset();
            }}
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
      </div>
    ),
    document.body
  );
};

export default Modal;
