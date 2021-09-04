import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape" || e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleKeyDown}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}
