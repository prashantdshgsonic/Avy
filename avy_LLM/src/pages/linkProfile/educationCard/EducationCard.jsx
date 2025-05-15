import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./EducationCard.module.css";
import { BsPlusLg } from "react-icons/bs";
import { GrEdit } from "react-icons/gr";
import AddEducationCard from "../addEducationCard/AddEducationCard";
import { deleteEducation, getUserData } from "../../../store/slice/userActions";
import { ImBin } from "react-icons/im";
import EditEducation from "../editEducation/EditEducation";

const EducationCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [editEducationId, setEditEducationId] = useState(null);

  const educationHistory = useSelector(
    (state) => state.user.linkProfileEdu || []
  );
  //лежит в userSlice linkProfileEdu: []

  // console.log("Rendering educationHistory:", educationHistory);

  // Загружаем userToken из localStorage при монтировании компонента
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // при загрузке страницы данные должны приходить с бэка  getUserData
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

  // закрыть AddEducationCard
  const handleCloseAddEducation = () => {
    setShowAddEducation(false);
  };

  const handleDeleteEducation = (id) => {
    dispatch(deleteEducation(id))
      .unwrap()
      .catch((err) => {
        console.log("Failed to delete experience");
      });
  };

  const handleEditEducation = (id) => {
    setEditEducationId(id);
  };

  return (
    <div className={s.section__content}>
      <div className={s.section__topwrapper}>
        <h3>Education</h3>

        <div className={s.section__iconwrapper}>
          <BsPlusLg
            className={s.section__icon}
            onClick={() => setShowAddEducation(!showAddEducation)}
          />
          {/* showAddEducation = true */}
        </div>
      </div>

      {/* Показываем компонент AddEducationCard, если showAddEducation = true , а если = false то handleClose*/}
      {showAddEducation && (
        <AddEducationCard onClose={handleCloseAddEducation} />
      )}

      {/*id есть при клике,то показать компонент*/}
      {editEducationId && (
        <EditEducation
            onClose={() => setEditEducationId(null)}
            educationId={editEducationId}
        />
        )}

      {educationHistory && educationHistory.length > 0 ? (
        <div className={`${s.section__text} ${isExpanded ? s.expanded : ""}`}>
          {educationHistory.map((edu, index) => (
            <div key={index} className={s.section__position}>
              <div className={s.section__headerwrapper}>
                <h4>{edu.institutionTitle}</h4>
                <div className={s.section__icon}>
                  <ImBin
                    className={s.section__iconItem}
                    onClick={() => handleDeleteEducation(edu.id)}
                  />

                  <GrEdit
                    className={s.section__iconItem}
                    onClick={() => handleEditEducation(edu.id)}
                  />
                </div>
              </div>

              <p>{edu.degree}</p>
              <p>{edu.specialization}</p>

              <div className={s.section__time}>
                <span>{edu.startDate}</span>
                <span> - </span>
                <span>{edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No education added yet</p>
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

export default EducationCard;
