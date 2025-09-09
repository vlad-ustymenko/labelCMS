"use client";
import { useModalContext } from "@/context/ModalContext";
import { useEffect, useRef, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import useClickOutside from "@/hooks/useClickOutside";
import { getHighlightedText } from "@/lib/utils";
import IMask from "imask";
import Image from "next/image";
import Loader from "../Loader/Loader";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ data }) => {
  const { activeModal, setActiveModal, status, setStatus } = useModalContext();

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
    button,
  } = data;

  const [mounted, setMounted] = useState(false);
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const previouslyFocusedElRef = useRef(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // --- helpers ---
  const handleClose = useCallback(() => {
    setActiveModal(false);
    setStatus("idle"); // скидаємо статус
    reset();
    // повертаємо фокус туди, де був
    if (previouslyFocusedElRef.current) {
      previouslyFocusedElRef.current.focus?.();
    }
  }, [reset, setActiveModal, setStatus]);

  const onSubmit = async (formData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        reset();
        setStatus("success");
      } else {
        alert("Помилка при відправці");
        setStatus("idle");
      }
    } catch (e) {
      alert("Щось пішло не так. Спробуйте пізніше.");
      setStatus("idle");
    }
  };

  // --- effects ---
  useEffect(() => setMounted(true), []);

  // Блокування скролу + cleanup
  useEffect(() => {
    if (!activeModal) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [activeModal]);

  // Маска телефону (ініт при відкритті)
  useEffect(() => {
    if (!activeModal || !phoneInputRef.current) return;
    const mask = IMask(phoneInputRef.current, { mask: "+38 (000) 000-00-00" });
    mask.on("accept", () =>
      setValue("phone", mask.value, { shouldValidate: true })
    );
    return () => mask.destroy();
  }, [activeModal, setValue]);

  // Фокус: запам'ятати, куди повернути; сфокусувати перший інпут при відкритті
  useEffect(() => {
    if (!activeModal) return;
    previouslyFocusedElRef.current = document.activeElement;
    // даємо рендеру завершитися
    requestAnimationFrame(() => {
      nameInputRef.current?.focus?.();
      nameInputRef.current?.select?.();
    });
  }, [activeModal]);

  // Escape для закриття
  useEffect(() => {
    if (!activeModal) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeModal, handleClose]);

  const modalRef = useClickOutside(() => {
    if (!activeModal) return;
    handleClose();
  });

  // --- UI chunks ---
  const renderForm = () => (
    <div className={styles.content}>
      <h2 id="modal-title" className={styles.title}>
        {getHighlightedText(title, highlightTitle, styles.highlight)}
      </h2>
      <p id="modal-desc" className={styles.text}>
        {text}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        noValidate
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        {/* Ім’я */}
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
              message: mainError,
            },
          }}
          render={({ field }) => {
            const hasErr = Boolean(errors.name);
            const errId = hasErr ? "name-error" : undefined;
            return (
              <>
                <input
                  {...field}
                  id="name"
                  className={styles.input}
                  ref={(el) => {
                    field.ref(el);
                    if (!nameInputRef.current) nameInputRef.current = el;
                  }}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.replace(
                        /[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]/g,
                        ""
                      )
                    )
                  }
                  aria-invalid={hasErr ? "true" : "false"}
                  aria-describedby={errId}
                />
                {hasErr && (
                  <span
                    id="name-error"
                    className={styles.requiredSpan}
                    role="alert"
                  >
                    {errors.name.message}
                  </span>
                )}
              </>
            );
          }}
        />

        {/* Телефон */}
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
          render={({ field }) => {
            const hasErr = Boolean(errors.phone);
            const errId = hasErr ? "phone-error" : undefined;
            return (
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
                  aria-invalid={hasErr ? "true" : "false"}
                  aria-describedby={errId}
                />
                {hasErr && (
                  <span
                    id="phone-error"
                    className={styles.requiredSpan}
                    role="alert"
                  >
                    {errors.phone.message}
                  </span>
                )}
              </>
            );
          }}
        />

        <button
          type="submit"
          className={styles.button}
          disabled={status === "loading"}
          aria-busy={status === "loading" ? "true" : "false"}
        >
          {button}
        </button>
      </form>
    </div>
  );

  const renderSuccess = () => (
    <div className={styles.content}>
      <div id="modal-title" className={styles.title}>
        {sendingTitle}
      </div>
      <p id="modal-desc" className={styles.text}>
        {sendingText}
      </p>
    </div>
  );

  // --- render ---
  if (!mounted) return null;

  return createPortal(
    status === "loading" ? (
      <Loader />
    ) : (
      <div
        className={`${styles.container} ${activeModal ? styles.active : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <div className={styles.contentWrapper} ref={modalRef}>
          <div className={styles.imageWrapper}>
            <Image
              src="/modalImage.jpeg"
              alt=""
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1023px) 50vw, 30vw"
              className={styles.image}
            />
          </div>

          {status === "success" ? renderSuccess() : renderForm()}

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
            role="button"
            tabIndex={0}
            aria-label="Закрити модальне вікно"
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClose();
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
