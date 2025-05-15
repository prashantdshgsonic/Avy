import React from 'react'
import s from './LabelText.module.css'

export default function LabelText({ text }) {
  return (
    <p className={s.labelText}>{ text }</p>
  )
}
