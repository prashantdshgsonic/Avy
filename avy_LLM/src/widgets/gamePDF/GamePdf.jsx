// variant using fetch. with library -error. with iframe - error in headers in backend
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeLesson } from "../../store/slice/userActions";
import { setLessonWindow } from "../../store/slice/userSlice";
import ChatBot from "../chatBot/ChatBot";
import styles from "../gamePDF/GamePdf.module.css";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const GamePdf = ({ src }) => {
  // console.log("src", src)
  const dispatch = useDispatch();
  const { currentProgress } = useSelector((state) => state.user);
  const { userToken } = useSelector((state) => state.auth);

  const [chatBotOpen, setChatBotOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);

  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  const currentLesson = useSelector((state) => state.user.currentLesson);
  const { id: lessonId, title: lessonTitle, pdfFileLink } = currentLesson || {};

  const handleLessonFinish = () => {
    dispatch(
      completeLesson({
        lessonId: currentProgress.nextLessonId,
        userToken: userToken,
      })
    ); // Lesson completed
    dispatch(setLessonWindow(false));
  };

  //get pdf
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error("Failed to fetch PDF file");
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setPdfBlobUrl(blobUrl);
      } catch (error) {
        console.error("Failed to load PDF", error);
      }
    };

    if (src) {
      fetchPdf();
    }
  }, [src]);

  //get summary
  useEffect(() => {
    const getSummary = async () => {
      try {
          // console.log("try pdfSummary: lessonId", lessonId);
       
        const response = await axios.get(
          `${backendUrl}/api/user/get-summary/${lessonId}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
          // console.log("PDF Summary Response data: ", response.data);
        setSummary(response.data || "No summary available for this lesson");
      } catch (error) {
        // console.error("Error fetching PDF summary:", error);
        setSummary("No summary found");
      } finally {
        setIsLoadingSummary(false);
      }
    };

    if (lessonId && userToken) {
      getSummary();
    }
  }, [lessonId, userToken]);

//add functionality to switch between NUmPages Next-Previos. For this in backend delete headers  X-Frame-Options wich are set by iFrame 

  return (
    <div className={styles.pdfContainer}>
      
        {pdfBlobUrl ? (
          <iframe
            src={pdfBlobUrl}
            title={lessonTitle || "PDF Viewer"}
            className={styles.pdfIframe}
            width="100%"
            height="500px"
            frameBorder="0"
            scrolling="auto"
          ></iframe>
        ) : (
          <p>Loading PDF...</p>
        )}
      

      {isLoadingSummary ? (
        <p>Loading Summary...</p>
      ) : (
        summary && (
          <div className={styles.summary}>
            <p>Lesson Summary: {summary}</p>
          </div>
        )
      )}

      <div className={styles.actions}>
        {!chatBotOpen && (
          <>
            <p className={styles.compliteLesson} onClick={handleLessonFinish}>
              Complete Lesson Now
            </p>
            <p>Any questions? Press the button</p>
          </>
        )}
      </div>

      <ChatBot
        lessonTitle={lessonTitle}
        lessonId={lessonId}
        onChatToggle={(isOpen) => setChatBotOpen(isOpen)}
      />
    </div>
  );
};

export default GamePdf;











//2

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { completeLesson } from "../../store/slice/userActions";
// import { setLessonWindow } from "../../store/slice/userSlice";
// import ChatBot from "../chatBot/ChatBot";
// import styles from "../gamePDF/GamePdf.module.css";

// const GamePdf = ({ src }) => {
//   const dispatch = useDispatch();
//   const { currentProgress } = useSelector((state) => state.user);
//   const { userToken } = useSelector((state) => state.auth);

//   const [chatBotOpen, setChatBotOpen] = useState(false);

//   const currentLesson = useSelector((state) => state.user.currentLesson);
//   const { id: lessonId, title: lessonTitle, pdfFileLink } = currentLesson || {};

//   const handleLessonFinish = () => {
//     dispatch(
//       completeLesson({
//         lessonId: currentProgress.nextLessonId,
//         userToken: userToken,
//       })
//     ); // lesson completed
//     dispatch(setLessonWindow(false));
//   };

//   return (
//     <div className={styles.pdfContainer}>
//       <div className={styles.pdfViewer}>
//         {pdfFileLink ? (
//           <iframe
//             src={src} // URL PDF файла, переданный через props
//             title={lessonTitle || "PDF Viewer"}
//             className={styles.pdfIframe}
//             frameBorder="0"
//             scrolling="auto"
//           ></iframe>
//         ) : (
//           <p>No PDF available for this lesson</p>
//         )}
//       </div>

//       <div className={styles.actions}>
//         {!chatBotOpen && (
//           <>
//             <p className={styles.completeLesson} onClick={handleLessonFinish}>
//               Complete Lesson Now
//             </p>
//             <p>Any questions? Press the button</p>
//           </>
//         )}
//       </div>

//       <ChatBot
//         lessonTitle={lessonTitle}
//         lessonId={lessonId}
//         onChatToggle={(isOpen) => setChatBotOpen(isOpen)}
//       />
//     </div>
//   );
// };

// export default GamePdf;

//4
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { completeLesson } from "../../store/slice/userActions";
// import { setLessonWindow } from "../../store/slice/userSlice";
// import ChatBot from "../chatBot/ChatBot";
// import styles from "../gamePDF/GamePdf.module.css";

// const GamePdf = ({ src }) => {
//   const dispatch = useDispatch();
//   const { currentProgress } = useSelector((state) => state.user);
//   const { userToken } = useSelector((state) => state.auth);

//   const [chatBotOpen, setChatBotOpen] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const currentLesson = useSelector((state) => state.user.currentLesson);
//   const { id: lessonId, title: lessonTitle } = currentLesson || {};

//   const handleLessonFinish = () => {
//     dispatch(
//       completeLesson({
//         lessonId: currentProgress.nextLessonId,
//         userToken: userToken,
//       })
//     );
//     dispatch(setLessonWindow(false));
//   };

//   useEffect(() => {
//     if (src) {
//       setPdfUrl(`${src}#page=${pageNumber}`);
//     }
//   }, [src, pageNumber]);

//   const goToPrevPage = () => {
//     setPageNumber((prev) => Math.max(prev - 1, 1));
//   };

//   const goToNextPage = () => {
//     setPageNumber((prev) => prev + 1); // Задайте лимит страниц, если известно.
//   };

//   return (
//     <div className={styles.pdfContainer}>
//       <div className={styles.pdfViewer}>
//         {pdfUrl ? (
//           <iframe
//             src={pdfUrl}
//             title={lessonTitle || "PDF Viewer"}
//             className={styles.pdfIframe}
//             frameBorder="0"
//             scrolling="auto"
//           ></iframe>
//         ) : (
//           <p>Loading PDF...</p>
//         )}
//       </div>

//       <div className={styles.pagination}>
//         <button onClick={goToPrevPage} disabled={pageNumber === 1}>
//           Previous
//         </button>
//         <p>Page {pageNumber}</p>
//         <button onClick={goToNextPage}>Next</button>
//       </div>

//       <div className={styles.actions}>
//         {!chatBotOpen && (
//           <>
//             <p className={styles.completeLesson} onClick={handleLessonFinish}>
//               Complete Lesson Now
//             </p>
//             <p>Any questions? Press the button</p>
//           </>
//         )}
//       </div>

//       <ChatBot
//         lessonTitle={lessonTitle}
//         lessonId={lessonId}
//         onChatToggle={(isOpen) => setChatBotOpen(isOpen)}
//       />
//     </div>
//   );
// };

// export default GamePdf;