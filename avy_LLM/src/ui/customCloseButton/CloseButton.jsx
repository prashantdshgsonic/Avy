import React from 'react'
import s from './CloseButton.module.css'



const CloseButton = ( { onClick } ) => {
    return (
      <button className={s.closeButton} onClick={onClick}>
        ✖
      </button>
    );
  };

export default CloseButton