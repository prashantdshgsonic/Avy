import React, { useEffect, useState } from 'react'
import image from '../../assets/icons/succsessIcon.svg'
import s from './SuccessPayment.module.css'
import { useNavigate } from 'react-router-dom';
export default function SuccessPayment() {
  const navigation = useNavigate();
  const [time,setTime]=useState(5)
  useEffect(() => {
   const interval = setInterval(() => {
     if (time > 0) {
       setTime(time - 1);
     } else {
       navigation("/profile")
     }
   }, 1000);
    return () => clearInterval(interval);
  },[time])
  return (
    <div className={s.success}>
      <img src={image} alt="successIcon" />
      <div className={s.content}>
        <h2>Purchase success. Please wait</h2>
        <h2>{time}</h2>
      </div>
    </div>
  );
}
