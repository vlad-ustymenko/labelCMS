"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <ModalContext.Provider
      value={{ activeModal, setActiveModal, loading, setLoading }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
