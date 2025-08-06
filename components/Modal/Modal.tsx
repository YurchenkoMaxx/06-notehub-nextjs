"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    modalRootRef.current = document.getElementById("modal-root");
    setIsMounted(true);
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isMounted || !modalRootRef.current) return null;

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.content}>{children}</div>
    </div>,
    modalRootRef.current
  );
}
