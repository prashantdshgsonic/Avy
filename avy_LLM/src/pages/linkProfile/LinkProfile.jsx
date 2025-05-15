import React, { useState, useRef, useEffect } from 'react'
import s from './LinkProfile.module.css'
// import logo from "../../assets/images/logo.svg";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ExperienceCard from './experienceCard/ExperienceCard';
import EducationCard from './educationCard/EducationCard';
import UploadCV from './uploadCV/UploadCV';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCV, getUserData, updateUserImage } from '../../store/slice/userActions';
import ProfileGeneral from '../../widgets/profileGeneral/ProfileGeneral';
import Header from '../../widgets/header/Header';
// import ProfileBanner from '../../widgets/profileBaner/ProfileBanner';
import Nav from './nav/Nav';
// icons:
import { IoBulb, IoSearchOutline } from "react-icons/io5";
import { BiSolidNotepad } from "react-icons/bi";
import { FaUniversity } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { FaAngleDoubleUp } from "react-icons/fa";
import reward from "../../assets/icons/rewardsIcon.svg"
import coin from '../../assets/icons/coinIcon.svg';




const LinkProfile = () => {

  // Рефы для ссылок АвтоСкролл
  // на елемент: ref={nameRef}, на ссылку: onClick={() => scrollToSection(nameRef)} 
  const experienceRef = useRef(null); 
  const educationRef = useRef(null);
  const certificatesRef = useRef(null);
  const cvRef = useRef(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.id);
  const avatarUrl = useSelector((state) => state.user.userInfo.linkToImage);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null); //for input 
  const { userToken } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  // scroll Up
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }; 
 
  // autoscroll
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView(
      { behavior: "smooth", 
        block: "start" 
      });
  };

  // avatar upload
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Предпросмотр
     
      const newImage = new FormData();
      newImage.append("userImage", file);
      
      const userToken = localStorage.getItem("userToken");
      
      dispatch(updateUserImage({newImage, userToken }));
    }
  };

  // render CV при монтировании
  useEffect(() => {
    if (userId) {
      dispatch(fetchCV(userId)); 
    }
  }, [userId, dispatch]);

   // Загружаем данные пользователя при монтировании
   useEffect(() => {
    if (userToken) {
      dispatch(getUserData(userToken));
    }
    }, [userToken, dispatch]);

  
  // Функция для открытия модального окна
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };




  return (
    <>
    <div>
    <Header/>
    <Nav/>

    <main  className={s.main}>

    <FaAngleDoubleUp 
      className={s.main__icon}
      onClick={scrollToTop}
    />
      
{/* top SEction of Link Profile */}
      <section className={s.section__card}>
        
        <div className={s.section__bgContainer}>           
          <img className={s.section__bg}
                src= "/images/bg-class.png" alt="Background"
          />
          < GrEdit className={s.section__iconBg}/>
         
        </div>

        <div className={s.section__contentContainer}>
          <div className={s.section__photo}>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef}
                onChange={handleAvatarUpload} 
                hidden 
              />

              <img 
                className={s.section__img}               
                src={userInfo.linkToImage 
                  ? process.env.REACT_APP_MEDIA_SERVER_URL + userInfo.linkToImage 
                  : "/images/avatar.png"} 
                alt="Avatar"
                onClick={() => fileInputRef.current.click()}
              >
              </img>

              {/* <GrEdit 
                className={s.section__icon} 
                onClick={() => fileInputRef.current.click()}
              /> */}

              <div className={s.userAchievements}>
              <div className={s.awardsInfo}>
                <div>
                  <p className={s.firstText}>{userInfo.coins ? userInfo.coins : 0} coins</p> {/* !!! userCoins*/}
                  <p className={s.secondText}>Total balance</p>
                </div>
                <img src={coin} alt="" />
              </div>
              <div className={s.awardsInfo}>
                <div>
                  <p className={s.firstText}>{userInfo.awards ? userInfo.awards.length : 0}</p> {/* !!! useRewards*/}
                  <p className={s.secondText}>Rewards</p>
                </div>
                <img src={reward} alt="" />
              </div>
              </div>

          </div>

          <div className={s.section__content}>
              {/*General Information*/}
              <div className={s.content__header}>
                <h2>{userInfo.firstName} {userInfo.lastName}</h2>                
                < GrEdit className={s.section__icon}
                  onClick={handleEditClick}  //  modal window
                />
              </div>

              <h2>{userInfo.userName}</h2>

              {isModalOpen && (
                <div className={s.modal}>          
                  <ProfileGeneral closeModal={closeModal} /> 
                  <span className={s.close} onClick={closeModal}>
                    ✖
                  </span>          
                </div>
              )}

              <p className={s.secondText}>{userInfo.state}, {userInfo.city}, {userInfo.country}</p>
              <p className={s.secondText}>{userInfo.email}</p>
              <p className={s.secondText}>{userInfo.userLinkedIn}</p>

              <div className={s.section__links}>
                <Link onClick={() => scrollToSection(experienceRef)}><IoBulb /> Experience</Link>
                <Link onClick={() => scrollToSection(educationRef)}> <FaBook /> Education</Link>
                <Link onClick={() => scrollToSection(certificatesRef)}><BiSolidNotepad /> Certificates</Link>
                <Link onClick={() => scrollToSection(cvRef)}><FaUniversity /> CV</Link>
              </div>
              
          </div>

          
        </div>
      </section>

{/* Section2 Experience */}
      <section ref={experienceRef} className={s.section__card}>
        <div className={s.section__contentContainer}> 
          <ExperienceCard/>   
        </div>
      </section>
 
{/* Section3 Education */}
      <section ref={educationRef} className={s.section__card}>
        <div className={s.section__contentContainer}>
          <EducationCard/>
        </div>
      </section>

{/* Section4 Certificates */}
      <section ref={certificatesRef} className={s.section__card}>
      <div className={s.section__contentContainer}>
          <h3>Certificates</h3>
      </div>
      </section>

{/* Section5 CV */}
      <section ref={cvRef} className={s.section__card}>
        <div className={s.section__contentContainer}>
            <UploadCV/>
        </div>
      </section>


    </main>

    </div>
    </>
    
  )
}

export default LinkProfile

// function ProfilePage() {
//   const dispatch = useDispatch();
//   const { userInfo } = useSelector((state) => state.user);
//   const { userToken } = useSelector((state) => state.auth);
//   const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
//     pollingInterval: 1800000, //30 min
//   });
//   const [activeLink, setActiveLink] = useState("General");
//   // not nessecary for now
//   useEffect(() => {
//     if (data) dispatch(setCredentials(data));
//   }, [data, dispatch]);

//   const links = [
//     { name: "General" },
//     { name: "Activity" },
//     { name: "Character" },
//     { name: "Subscription" },
//   ];

//   useEffect(() => {
//     dispatch(getUserData(userToken));
//   }, [userToken]);


//   const navBtn = (text) => {
//     const isActive = text === activeLink;
//     return (
//       <button
//         key={text}
//         onClick={() => setActiveLink(text)}
//         className={isActive ? s.activeButton : s.defaultButton}
//       >
//         {text}
//       </button>
//     );
//   };

//   if (isFetching) {
//     return <span>Fetching your profile...</span>;
//   } else if (userInfo === null) {
//     return <span>You're not logged in</span>;
//   }

//   let activeComponent;
//   switch (activeLink) {
//     case "General":
//       activeComponent = <ProfileGeneral />;
//       break;
//     case "Activity":
//       activeComponent = <ProfileActivity></ProfileActivity>;
//       break;
//     case "Character":
//       activeComponent = <GamePersonage></GamePersonage>;
//       break;
//     default:
//       activeComponent = <div>No matching component</div>;
//   }
//   return (
    
//     <div className={s.profileWrapper}>
//       <ProfileBanner
//         userName={userInfo.firstName}
//         userBg={userBgBanner}
//         userCoins={userInfo.coins}
//         useRewards={userInfo.awards}
//       ></ProfileBanner>
//       <div className={s.profileNav}>{links.map((btn) => navBtn(btn.name))}</div>
//       {activeComponent}
//     </div>
//   );
// }

// export default ProfilePage;
