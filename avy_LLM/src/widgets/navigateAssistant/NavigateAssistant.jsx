import React, { useEffect, useState } from 'react'
import s from "./NavigateAssistant.module.css"
import { navigateByVoice } from '../../store/slice/authActions'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, resetResponse } from "../../store/slice/authSlice"; // Добавляем экшен для сброса ответа

const NavigateAssistant = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, response, error } = useSelector((state) => state.auth) //store in AuthSlice
    const [isClicked, setIsClicked] = useState(false);

    // const userToken = useSelector((state) => state.auth.userToken);
    // console.log("Токен из Redux проверка:", userToken);

    const handleClick = () => {
        setIsClicked(true);
        dispatch(navigateByVoice());

         // Через 6 секунд сбрасить активный стиль
        setTimeout(() => {
            setIsClicked(false);
        }, 6000);
    }

    useEffect(() => {
        if (response) {
          switch (response) {
            case "Log Out":
              dispatch(logout());  
              window.location.replace("/"); // Reload and navigate to main
              break;
            case "Simulate":
              navigate("/simulate");
              break;
            case "Dashboard":
              navigate("/dashboard");
              break;
            case "Profile":
              navigate("/profile");
              break;
            case "Market":
              navigate("/marketplace");
              break;
            case "None":
              navigate("/dashboard"); // None если ничего не сказано подходящего
              break;
            default:
              navigate("/dashboard"); // остается на месте
            }

        // Сбрасываем response после обработки
        dispatch(resetResponse());
        setIsClicked(false);
        }    
    }, [response, navigate, dispatch]);
 
    return (
    <>
        <div className={s.navigateContainer}>
            <img className={`${s.navigateIcon} ${isClicked ? s.active : ""}`}
            src='images/compass.svg'
            alt="compass"
            title="Click to Navigate By Voice"
            onClick={handleClick}
            />
            
        {/* <img src='images/compass2.svg'></img>
        <img src='images/compass.svg'></img> */}
        </div>

        {/* {loading && <h3 className={s.navigateText}>Loading...</h3>} */}
        {/* {error && <h3 className={s.error}>{error}</h3>} */}

        {isClicked && 
            <h3 className={`${s.navigateText} ${isClicked ? s.active : ""}`}>
                Where Navigate? Just Say it!
            </h3>
        }
       
    </>
  )
}

export default NavigateAssistant