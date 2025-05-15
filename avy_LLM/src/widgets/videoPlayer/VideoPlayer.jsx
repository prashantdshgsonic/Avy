import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useState } from "react";
import { completeLesson } from "../../store/slice/userActions";
import { setLessonWindow } from "../../store/slice/userSlice";
import ChatBot from "../chatBot/ChatBot";
import { ColorRing } from 'react-loader-spinner';
import styles from "./VideoPlayer.module.css";
import axios from "axios";
import ReactPlayer from "react-player";

// const mockData ={
//   "id": 10,
//   "title": "firstCourse",
//   "itemType": "video",
//   "itemOrder": 8,
//   "moduleId": 1,
//   "fileName": "funny small video",
//   "fileType": "mpg4",
//   "linkToVideo": "/video/9b3196b7-e7c0-44c4-af8f-26963f41edc9.mp4"
// }

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function VideoPlayer({ src }) {
  const dispatch = useDispatch();
  const { currentProgress } = useSelector((state) => state.user);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const { userToken } = useSelector((state) => state.auth); //dont pass it to chatBot
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [summary, setSummary]= useState(null);
  const [isLoadingSummary, setIsLoadingSummary]= useState(true);

  const currentLesson = useSelector((state) => state.user.currentLesson);
  const { id: lessonId, title: lessonTitle } = currentLesson || {};

  // console.log("VideoPlayer: lessonId", lessonId);
  // console.log("VideoPlayer: lessonTitle", lessonTitle);

  useEffect( () => {
    const getSummary = async () => {
      try {
        // console.log("chatBot: lessonId", lessonId);
      
        const response = await axios.get(
          `${backendUrl}/api/user/get-summary/${lessonId}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        // console.log("chatBot Summary Response data: ", response.data);
        setSummary(response.data || "No summary available for this lesson");
      } catch (error) {
        // console.error("Error fetching VIDEO summary:", error);
        setSummary("No summary found");
      } finally {
        setIsLoadingSummary(false);
      }
    };

      if (lessonId && userToken) {
          getSummary();
      }
  }, [lessonId, userToken]);

  const playerConfig = {
    file: {
      attributes: {
        controlsList: "nodownload",
      },
    },
  };

  const handleVideoReady = () => {
    setIsLoadingVideo(false);
  };

  const showVideoEndedMessage = () => {
    setIsVideoEnded(true);
  };

  const handleLessonFinish = () => {
    dispatch(
      completeLesson({
        lessonId: currentProgress.nextLessonId,
        userToken: userToken,
      })
    ); //lesson completed
    dispatch(setLessonWindow(false)); // video window disapperies
  };

  

  return (
    <div className={styles.videoContainer}>
      {/* Loader  */}
      {isLoadingVideo && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#003153", "#ABCDEF", "#42AAFF", "#4285B4", "#1560BD"]}
        />
      )}

      {/* div with video element inside */}
      <ReactPlayer
        url={src}
        controls={true}
        width="100%"
        height="500px"
        config={playerConfig}
        onEnded={showVideoEndedMessage}
        onReady={handleVideoReady} // to stop loader
        style={isLoadingVideo ? { display: "none" } : {}} // hide video when isLoading
      ></ReactPlayer>

      {/*  display summary */}
      {!isLoadingVideo &&
        (isLoadingSummary ? (
          <p>Loading summary...</p>
        ) : (
          isVideoEnded && summary && (
            <div className={styles.summary}>
              <p>Video Content: {summary}</p>
            </div>
          )
        ))}

      {isVideoEnded && !chatBotOpen && (
        <div className={styles.videoEndedMessage}>
          <p className={styles.compliteLesson} onClick={handleLessonFinish}>
            Complete Lesson Now
          </p>
          <p>Any questions? Press the button</p>
        </div>
      )}

      {!isLoadingVideo && isVideoEnded && (
        <ChatBot
          lessonTitle={lessonTitle}
          lessonId={lessonId}
          // token={userToken} //dont pass it to next component
          onChatToggle={(isOpen) => setChatBotOpen(isOpen)} // Pass it for chat state
        />
      )}
    </div>
  )
}

export default VideoPlayer;
