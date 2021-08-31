import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal() {
  return createPortal(
    <div className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src="#" alt="#" />
      </div>
    </div>,
    modalRoot
  );
}
