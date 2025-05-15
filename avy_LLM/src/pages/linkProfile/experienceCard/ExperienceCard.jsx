import React, { useEffect, useRef, useState } from "react";
import { GrEdit } from "react-icons/gr";
import { BsPlusLg } from "react-icons/bs";
import s from "./ExperienceCard.module.css";
import AddExperienceCard from "../addExperienceCard/AddExperienceCard";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExperience,
  getUserData,
  updateLinkProfileEdu,
} from "../../../store/slice/userActions";
import { ImBin } from "react-icons/im";
import EditExperience from "../editExperience/EditExperience";

const ExperienceCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [token, setToken] = useState(null);
  const [editExperienceId, setEditExperienceId] = useState(null);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const workExperience = useSelector(
    (state) => state.user.linkProfileExper || []
  );
  //лежит в userSlice linkProfileExper: []

  // console.log("Rendering workExperience:", workExperience);

   // Загружаем userToken из localStorage при монтировании компонента
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // при загрузке страницы данные должны приходить с бэка getUserData
  useEffect(() => {
    if (token) {
      // console.log("Fetching user data with token:", token);
      dispatch(getUserData(token))
        .unwrap()
        .catch((err) => {
          console.error("Error fetching experience:", err);
        });
    }
  }, [dispatch, token]);

  // закрыть AddExperienceCard
  const handleCloseAddExperience = () => {
    setShowAddExperience(false);
  };

  const handleDeleteExperience = (id) => {
    dispatch(deleteExperience(id))
      .unwrap()
      .catch((err) => {
        console.log("Failed to delete experience");
      });
  };

  const handleEditExperience = (id) => {    
    setEditExperienceId(id);
  };


  return (
    <div className={s.section__content}>
      <div className={s.section__topwrapper}>
        <h3>Experience</h3>

        <div className={s.section__iconwrapper}>
          <BsPlusLg
            className={s.section__icon}
            onClick={() => setShowAddExperience(!showAddExperience)}
          />
          {/* showAddExperience = true */}
        </div>
      </div>

      {/* Показываем компонент AddExperienceCard, если showAddExperience = true , а если = false то handleClose*/}
      {showAddExperience && (
        <AddExperienceCard onClose={handleCloseAddExperience} />
      )}

      {editExperienceId && (
        <EditExperience
          onClose={() => setEditExperienceId(null)}
          experienceId={editExperienceId}
        />
      )}

      
      {/* берем из состояния workExperience если вернулись данные */}
      {workExperience && workExperience.length > 0 ? (
        <div className={`${s.section__text} ${isExpanded ? s.expanded : ""}`}>
          {workExperience.map((experience, index) => (
            <div key={index} className={s.section__position}>
              <div className={s.section__headerwrapper}>
                <h4>{experience.companyTitle}</h4>
                <div className={s.section__icon}>
                  <ImBin
                    className={s.section__iconItem}
                    onClick={() => handleDeleteExperience(experience.id)}
                  />
                  <GrEdit
                    className={s.section__iconItem}
                    onClick={() => handleEditExperience(experience.id)}
                  />
                </div>
              </div>
              <p>{experience.position?.toUpperCase()}</p>

              <p>{experience.description}</p>

              <div className={s.section__time}>
                <span>{experience.startDate}</span>
                <span> - </span>
                <span>{experience.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No experience added yet</p>
      )}
      
      <span
        className={s.section__bottomElem}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less ⬅" : "Show more ➟ "}
      </span>
    </div>
  );
};

export default ExperienceCard;
