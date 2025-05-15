import React, { useEffect, useState } from "react";
import s from "./GamePage.module.css";
import { Canvas} from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

// Scene elements
import SkyBox from "../../gameElements/SkyBox";
import SceneLights from "../../gameElements/SceneLight";
import Game from "../../gameElements/Game";
import VideoPlayer from "../../widgets/videoPlayer/VideoPlayer";
import GamePdf from "../../widgets/gamePDF/GamePdf";
import ProgressCard from "../../widgets/progressCard/ProgressCard";
import { useDispatch, useSelector } from "react-redux";
import { renderModalWindow } from "../../helpers/renderModal";
import GameQuiz from "../../widgets/gameQuiz/GameQuiz";
import SortGame from "../../widgets/sortGame/SortGame";
import ConstructaWord from "../../widgets/gameFindWord/ConstructaWord";
import { TextLoad } from "../../helpers/textLoad";
import CourseSelector from "../../widgets/courseSelector/CourseSelector";
import { getUserProgressingCourses } from "../../store/slice/courseActions";
import { setCredentials, setLessonWindow } from "../../store/slice/userSlice";
import { useGetUserDetailsQuery } from "../../services/authService";

import CloseButton from "../../ui/customCloseButton/CloseButton";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../widgets/confirmationModal/ConfirmationModal";


const exitLessonUrl = process.env.REACT_APP_BACKEND_URL

const POLLING_INTERVAL = 1800000;

export default function GamePage() {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isAnimationActive, setIsAnimationActive] = useState(true);
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: POLLING_INTERVAL,
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false); // for confirm modal
  const navigate = useNavigate();
 
  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch]);

  const handleCloseModal = () => {
    dispatch(setLessonWindow(false));
    setIsModalOpen(false);
  };

  let [content, setContent] = useState(null);

  const { lessonWindow, currentLesson, currentProgress } = useSelector(
    (state) => state.user  
  );

  const { courseList } = useSelector((state) => state.course);
  if (!courseList) {
    dispatch(getUserProgressingCourses(userToken));
  }

  const [frameloop, setFrameloop] = useState('always');

  useEffect(() => {
    let newContent = null;
    if (lessonWindow && currentLesson) {
      switch (currentLesson.itemType) {
        case "quiz":
          newContent =
            currentLesson.quizType === 1 ? (
              <GameQuiz quizData={currentLesson.quizData} />
            ) : currentLesson.quizType === 2 ? (
              <SortGame quizData={currentLesson.quizData} />
            ) : (
              <ConstructaWord quizData={currentLesson.quizData} />
            );
          break;
        
        case "pdf":
          newContent = (
            <GamePdf 
              src={
                process.env.REACT_APP_MEDIA_SERVER_URL + currentLesson.pdfFileLink
              }             
            /> 
          );               
        break; 

        default:
          newContent = (
            <VideoPlayer
              src={
                process.env.REACT_APP_MEDIA_SERVER_URL +
                currentLesson.linkToVideo
              }
            />
          );
      }
      setContent(newContent);
      setFrameloop("never");
    }
  }, [lessonWindow, currentLesson]);

  useEffect(() => {
    if (lessonWindow && content !== null) {
      setIsAnimationActive(false);
    } else {
      setContent(null);
      setIsAnimationActive(true);
    }
  }, [lessonWindow, content]);

  const [playerApproach, setPlayerApproach] = useState(0);
  const [helpButton, setHelpButton] = useState(false);

  //exit functionality :
  const courseId = courseList?.length > 0 ? courseList[0].id : null;

  const confirmExitGame = async () => {
    if (!courseId) {
      alert("Empty course list");
      return;
    }
    try {
      const response = await fetch(`${exitLessonUrl}/api/user/exit-lesson/${courseId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        dispatch(setLessonWindow(false));
        setShowConfirmModal(false);
        navigate("/dashboard");
      } else {
        alert("Failed exit");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error, try again");
    }
  };

  // confirmational window:
  const handleExitGame = () => {
    setShowConfirmModal(true);
  };

  return (
    <>
      {currentProgress ? (
        <div>
          <div className="gameContaner">
            <CloseButton onClick={handleExitGame} />

            <ConfirmationModal
              isOpen={showConfirmModal}
              onClose={() => setShowConfirmModal(false)}
              onConfirm={confirmExitGame}
            />

            <Loader />

            <Canvas
              id="mainCanvas"
              shadows
              style={{
                width: "77vw",
                height: "80vh",
                display: "flex",
                justifyContent: "center",
              }}
              frameloop={frameloop}
              onClick={() => setFrameloop("always")}
              onPointerOut={() => setFrameloop("never")}
              onPointerDown={(e) =>
                lessonWindow ? null : e.target.requestPointerLock()
              }
            >
              <Suspense fallback={null}>
                <SceneLights />
                <SkyBox />
                <Physics>
                  <Game
                    playerApproach={playerApproach}
                    setPlayerApproach={setPlayerApproach}
                    setHelpButton={setHelpButton}
                  />
                </Physics>
              </Suspense>
            </Canvas>

            {<TextLoad playerApproach={playerApproach} helpButton={helpButton} />}
          </div>

          {currentProgress &&
            renderModalWindow(<ProgressCard />, isModalOpen, handleCloseModal)}

          {content !== null
            ? renderModalWindow(content, lessonWindow, handleCloseModal)
            : null}
        </div>
      ) : (
        <CourseSelector />
      )}

   
    </>
  );
}