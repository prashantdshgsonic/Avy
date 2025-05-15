import React, { useEffect, useState } from "react";
import styles from "./ModalWindow.module.css";


const ModalWindow = ({ title, onClose, children, isOpen }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
    document.exitPointerLock();
  }, [isOpen]);

  const handleClose = () => {
    setModalOpen(false);
    if (onClose) onClose();

  };

  return (
    <div className={`${styles.modal} ${modalOpen ? styles.open : ""}`}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalClose} onClick={handleClose}>
          &times;
        </p>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default ModalWindow;
