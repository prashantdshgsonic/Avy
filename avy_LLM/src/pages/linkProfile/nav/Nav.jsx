import React from 'react'
import s from './Nav.module.css'
import { useNavigate } from 'react-router-dom';
import { PiUsersThreeFill } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa6";
import { ImHome } from "react-icons/im";

const Nav = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {  
        navigate('/search')
    };
    
    const handleBackTo = () => {  
        navigate('/dashboard')
    };  

  return (
   <>
    <nav className={s.navbar}> 
      <div className={s.navbar__container}>        
      {/* <img className={s.navbar__logo}
          src={logo}
          alt="Логотип"
          id="logo"   
        />         */}
        <div className={s.navbar__icon}  onClick={()=>handleNavigate()}> 
          <PiUsersThreeFill className={s.icon} size={20} />
          <h5>Find Users</h5>
                  
        
        </div>

        <div className={s.navbar__icon} onClick={()=>handleBackTo()}>
          <FaArrowLeft className={s.icon} size={20} />
          <h5>Dashboard</h5>
        </div>

        <div className={s.navbar__icon} onClick={()=>handleBackTo()}>
          <ImHome className={s.icon} size={20} />
          <h5>Icon</h5>
        </div>

      </div>
    </nav>
   </>
  )
}

export default Nav