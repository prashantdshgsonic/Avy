import React from 'react'
import s from './ConfirmDelete.module.css'

const ConfirmDelete = ( { isOpen, onClose, onConfirm } ) => {

    if (!isOpen) return null;
      
    return (
        <div className={s.modalConfirm}> 
          <div className={s.modalContent}>
            <h3 className={s.modalTitle}>Delete course?</h3>
            <div className={s.modalButtons}>
              <button onClick={onClose} className={s.btnCancel}>
                ✖ No
              </button>
              <button onClick={onConfirm} className={s.btnConfirm}>
                ✔ Yes
              </button>
            </div>
          </div>
        </div>
    );
}

export default ConfirmDelete