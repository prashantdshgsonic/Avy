import React from 'react'
import errorImage from '../../assets/icons/errorPage.svg'
import OutlinedButton from '../../ui/outlinedButton/OutlinedButton';
import s from './ErrorPage.module.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function ErrorPage() {
  const navigation = useNavigate()
  const { userToken } = useSelector((state) => state.auth);
  return (
    <div className={s.errorPage}>
      <img src={errorImage} alt="errorPage" />
      <div className={s.content}>
        <h2>Page is not found</h2>
        <OutlinedButton
          label={"Go to the main page"}
          onClick={() => userToken ? navigation("/dashboard"):navigation("/")}
        ></OutlinedButton>
      </div>
    </div>
  );
}
