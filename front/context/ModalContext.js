"use client";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSend, setIsSend] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        setActiveModal,
        loading,
        setLoading,
        isSend,
        setIsSend,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
