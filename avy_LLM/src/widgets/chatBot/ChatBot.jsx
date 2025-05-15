import { useState } from "react";
import axios from "axios";
import styles from "./ChatBot.module.css"; 
import { useDispatch, useSelector } from "react-redux";
import { processUserQuestion, processVoiceQuestion } from "../../store/slice/adminCourseActions";
import { CiMicrophoneOn } from "react-icons/ci";
import { BsChatDots } from "react-icons/bs";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ChatBot = ({ lessonTitle, lessonId, onChatToggle }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");  
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const { userToken } = useSelector((state) => state.auth); // to get again for current component
  // const userToken = localStorage.getItem('userToken'); // better from LocalStorage?

  const handleMicClick = async () => {   
    setIsMicActive(true); // Меняем состояние кнопки микрофона

    try {
        // console.log("Запускаем голосовую обработку")
      await sendVoiceMessage();
    } catch (error) {
      console.error("Error during voice message handling:", error);
    } finally {
     setTimeout( () => {
      setIsMicActive(false);
     }, 4000 ); //  later- change functionality for  active button
     clearInterval();
    }
  };

  const toggleChat = async () => {
    if (!isOpen) {
      setMessages([
        {
          sender: "bot",
          text: "Hello. I am Chat-Bot. What do you want to ask?",
        },
      ]);
    }  

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onChatToggle(newIsOpen); // to notify videoPlayer about Chat state
  };

  //user send message
  const sendMessage = async () => {
    if (!input.trim()) {
      // console.log("Input is empty, returning");
      return;
    }

    const userMessage = { sender: "user", text: input };
    setMessages( (prev) => [...prev, userMessage]);
    setInput("");
    setLoadingMessage(true); 

   //  endpoint for chunks
    try {
      // console.log("Sending to back question input:", input);
      const response = await dispatch(
        processUserQuestion({ question: input, lessonId, userToken })
      ).unwrap();
      // console.log("response: ", response);
      const botMessage = { 
        sender: "bot", 
        text: response || "No answer"
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error bot response:", error);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I couldn't process your question. Please try again",
      };

      setMessages((prev) => [...prev, errorMessage]);

    } finally {
      setLoadingMessage(false);
    }
  };

  //voice message
  const sendVoiceMessage = async () => {
    setLoadingMessage(true);

    // Добавляем сообщение от пользователя в чат
    const userVoiceMessage = {
      sender: "user",
      text: "🔊 Voice message sent",
    };

    setMessages((prev) => [...prev, userVoiceMessage]);
    
    try {
      // Activation voice input
      const response = await dispatch(
        processVoiceQuestion({ lessonId, userToken })
      ).unwrap();
  
      // server respond
      const botMessage = {
        sender: "bot",
        text: response || "No answer",
      };
  
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error processing voice input:", error);
  
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I couldn't process your voice question. Please try again.",
      };
  
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoadingMessage(false);
    }
  };


  return (
    <div className={styles.chatBotContainer}>
      {!isOpen && (
        <button className={styles.chatButton} onClick={toggleChat}>
          <BsChatDots className={styles.chatIcon}/>
        </button>
      )}

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>Lesson Title " {lessonTitle} "</h3>
            <button className={styles.closeButton} onClick={toggleChat}>
              ✖
            </button>
          </div>

          <div className={styles.chatBody}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user"
                    ? styles.userMessageWrapper
                    : styles.botMessageWrapper
                }
              >
                {message.sender === "bot" && (
                  <div className={styles.botIconContainer}>
                    <img
                      className={styles.botIcon}
                      src="/images/Robot.png"
                      alt="Bot"
                    />
                  </div>
                )}
                <div
                  className={
                    message.sender === "user"
                      ? styles.userMessage
                      : styles.botMessage
                  }
                >
                  <span>{message.text}</span>
                </div>
              </div>
            ))}

            {loadingMessage && <p>Bot is typing...</p>}
          </div>

          <div className={styles.chatFooter}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              className={styles.chatInput}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}              
            />

            <CiMicrophoneOn 
              className={`${styles.mic} ${isMicActive ? styles.micActive : ""}`}
              onClick={handleMicClick}
            />

            <button className={styles.sendButton} onClick={sendMessage}>
              Ask
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default ChatBot;


//previous

// import { useState } from "react";
// import axios from "axios";
// import styles from "./ChatBot.module.css"; 
// import { useDispatch, useSelector } from "react-redux";
// import { processUserQuestion } from "../../store/slice/adminCourseActions";
// import { CiMicrophoneOn } from "react-icons/ci";

// const backendUrl = process.env.REACT_APP_BACKEND_URL;

// const ChatBot = ({ lessonTitle, lessonId, onChatToggle }) => {
//   const dispatch = useDispatch();
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");  
//   const [loadingMessage, setLoadingMessage] = useState(false);
//   const { userToken } = useSelector((state) => state.auth); // to get again for current component
//   // const userToken = localStorage.getItem('userToken'); // better from LocalStorage?

//   const toggleChat = async () => {
//     if (!isOpen) {
//       setMessages([
//         {
//           sender: "bot",
//           text: "Hello. I am Chat-Bot. What do you want to ask?",
//         },
//       ]);
//     }  

//     const newIsOpen = !isOpen;
//     setIsOpen(newIsOpen);
//     onChatToggle(newIsOpen); // to notify videoPlayer about Chat state
//   };

//   //user send message
//   const sendMessage = async () => {
//     if (!input.trim()) {
//       // console.log("Input is empty, returning");
//       return;
//     }

//     const userMessage = { sender: "user", text: input };
//     setMessages( (prev) => [...prev, userMessage]);
//     setInput("");
//     setLoadingMessage(true); 

//    //  endpoint for chunks
//     try {
//       // console.log("Sending to back question inpuut:", input);
//       const response = await dispatch(
//         processUserQuestion({ question: input, lessonId, userToken })
//       ).unwrap();
//       // console.log("response: ", response);
//       const botMessage = { 
//         sender: "bot", 
//         text: response || "No answer"
//       };

//       setMessages((prev) => [...prev, botMessage]);

//     } catch (error) {
//       console.error("Error bot response:", error);
//       const errorMessage = {
//         sender: "bot",
//         text: "Sorry, I couldn't process your question. Please try again",
//       };

//       setMessages((prev) => [...prev, errorMessage]);

//     } finally {
//       setLoadingMessage(false);
//     }
//   };

//   return (
//     <div className={styles.chatBotContainer}>
//       {!isOpen && (
//         <button className={styles.chatButton} onClick={toggleChat}>
//           💬
//         </button>
//       )}

// {isOpen && (
//         <div className={styles.chatWindow}>
//           <div className={styles.chatHeader}>
//             <h3>Lesson Title " {lessonTitle} "</h3>
//             <button className={styles.closeButton} onClick={toggleChat}>
//               ✖
//             </button>
//           </div>

//           <div className={styles.chatBody}>
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={
//                   message.sender === "user"
//                     ? styles.userMessageWrapper
//                     : styles.botMessageWrapper
//                 }
//               >
//                 {message.sender === "bot" && (
//                   <div className={styles.botIconContainer}>
//                     <img
//                       className={styles.botIcon}
//                       src="/images/Robot.png"
//                       alt="Bot"
//                     />
//                   </div>
//                 )}
//                 <div
//                   className={
//                     message.sender === "user"
//                       ? styles.userMessage
//                       : styles.botMessage
//                   }
//                 >
//                   <span>{message.text}</span>
//                 </div>
//               </div>
//             ))}

//             {loadingMessage && <p>Bot is typing...</p>}
//           </div>

//           <div className={styles.chatFooter}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Type your question here..."
//               className={styles.chatInput}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}              
//             />

//             <CiMicrophoneOn className={styles.mic} />

//             <button className={styles.sendButton} onClick={sendMessage}>
//               Ask
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBot;