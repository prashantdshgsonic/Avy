import React, { useEffect, useState } from "react";
import s from "./UploadCV.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCV, uploadCV, deleteCV } from "../../../store/slice/userActions";
import { ImBin } from "react-icons/im";

const UploadCV = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userInfo.id);
  const { cvUrl, loading } = useSelector((state) => state.user); //blob from state
  const [isOpening, setIsOpening] = useState(false); // for openCV only
  const [errorMessage, setErrorMessage] = useState(""); // for error message


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    dispatch(uploadCV(file))
    .unwrap()
    .then(() => {
      setErrorMessage(""); // Очистить ошибку при успешной загрузке
    })
    .catch((error) => {
      setErrorMessage(error); // Записываем ошибку в state
    });
    
    event.target.value = ""; // clear file name
  };

  const openCV = () => {
    setIsOpening(true); // if CV opening
    dispatch(fetchCV(userId));
  };

 useEffect(() => {
  if (!loading && cvUrl && isOpening) {
    window.open(cvUrl, "_blank");
    setIsOpening(false);
  }
}, [cvUrl, loading, isOpening]);

const handleDeleteCv = (() => {
  dispatch(deleteCV(userId));
  console.log("CV deleted from component");
});


  return (
    <div className={s.section__contentContainer}>
      <div className={s.container}>
        <h3>CV</h3>  
        <div className={s.upload}>          
          <h5>Here you can add your CV file</h5>
          <input
            className= {s.addCV}
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
          />
        </div>

        {/* display error */}
        {errorMessage && <p className={s.errorMessage}>{errorMessage}</p>}

        {/* if fileCV loaded - display iconPDF */}
        {cvUrl && (
          <div className={s.previewContainer}>
            <img
              src="/images/cv-icon.png"
              alt="Preview of uploaded CV"
              className={s.pdfPreview}
              onClick={openCV}               
            />
            <ImBin
              className={s.section__iconBin}
              onClick={() => handleDeleteCv()}
            />
          </div>
        )}
      </div>
    </div>
  );
};


export default UploadCV;
