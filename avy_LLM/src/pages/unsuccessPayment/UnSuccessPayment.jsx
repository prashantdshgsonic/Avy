import React from 'react'
import image from '../../assets/icons/unSuccessIcon.svg'
import OutlinedButton from '../../ui/outlinedButton/OutlinedButton';
import s from './UnSuccessPayment.module.css'
import { useNavigate } from 'react-router-dom';
export default function UnSuccessPayment() {
  const navigation = useNavigate();
  return (
    <div className={s.unsuccess}>
      <img src={image} alt="unSuccessIcon" />
      <div className={s.content}>
        <h2>Something went wrong. Purchase is not completed</h2>
        <OutlinedButton
          label={"Go to the Profile"}
          onClick={() => navigation("/profile")}
        ></OutlinedButton>
      </div>
    </div>
  );
}
