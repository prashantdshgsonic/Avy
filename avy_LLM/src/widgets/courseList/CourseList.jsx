import React, { useEffect, useState } from "react";
import styles from "./CourseList.module.css";
import CustomInput from "../../ui/customInput/CustomInput";
import CustomButton from "../../ui/customButton/CustomButton";
import searchIcon from "../../assets/icons/searchIcon.svg";
import arrowUp from "../../assets/icons/arrowUp.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
import {
  sortByModule,
  sortByPrice,
  sortById,
  searchByTitle,
} from "../../store/slice/adminCourseSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCourseData } from "../../store/slice/adminCourseSlice";

function CourseList({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState(false);
  const [priceUpDown, setPriceUpDown] = useState(false);
  const [modulesLowHigh, setModulesLowHigh] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleDate = () => {
    setDateFilter(!dateFilter);
    setPriceUpDown(false);
    setModulesLowHigh(false);
    dispatch(sortById(dateFilter));
  };
  const handlePrice = () => {
    setPriceUpDown(!priceUpDown);
    setDateFilter(false);
    setModulesLowHigh(false);
    dispatch(sortByPrice(priceUpDown));
  };
  const handleModules = () => {
    setModulesLowHigh(!modulesLowHigh);
    setDateFilter(false);
    setPriceUpDown(false);
    dispatch(sortByModule(modulesLowHigh));
  };
  const handleSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    dispatch(searchByTitle(searchText));
  }, [searchText, dispatch]);

  const handleOnAddClick = () => {
    dispatch(setCourseData(null))
    navigate("/course")
  }
  return (
    <div className={styles.courseListWrapper}>
      <div className={styles.courseListHeader}>
        <CustomButton text={"Add course +"} onClick={handleOnAddClick}></CustomButton>
        <div className={styles.filterBar}>
          <button onClick={handleDate}>
            Date added
            <span>
              <img src={dateFilter ? arrowUp : arrowDown} alt="" />
            </span>
          </button>
          <button onClick={handlePrice}>
            Price
            <span>
              <img src={priceUpDown ? arrowUp : arrowDown} alt="" />
            </span>
          </button>
          <button onClick={handleModules}>
            Module
            <span>
              <img src={modulesLowHigh ? arrowUp : arrowDown} alt="" />
            </span>
          </button>
        </div>
        <div className={styles.customInput}>
          <CustomInput
            srcIcon={searchIcon}
            placeholder={"Search"}
            type={"text"}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          ></CustomInput>
        </div>
      </div>
      <div className={styles.courseList}>{children}</div>
    </div>
  );
}

export default CourseList;
