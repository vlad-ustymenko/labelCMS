"use client";
import { createContext, useContext, useMemo, useState } from "react";

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(false);
  // "idle" | "loading" | "success"
  const [status, setStatus] = useState("idle");

  const value = useMemo(
    () => ({ activeModal, setActiveModal, status, setStatus }),
    [activeModal, status]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error("useModalContext must be used within ModalProvider");
  return ctx;
};
