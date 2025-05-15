import React from 'react'
import s from './CustomButton.module.css'

function CustomButton({ text, onClick, type, isDisabled}) {
  return (
    <button type={type} className={isDisabled ? s.disabledButton :s.customButton} onClick={onClick} disabled={isDisabled}>{text}</button>
  )
}

export default CustomButton