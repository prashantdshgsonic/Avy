import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, registerUserWithVoice } from "../../store/slice/authActions";
import CustomInput from "../../ui/customInput/CustomInput";
import s from "./RegisterForm.module.css";
import RadioBtn from "../../ui/customRadioButton/RadioBtn";
import logo from "../../assets/images/logo.svg";


const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const schema = object().shape({
  firstName: string()
    .required("Name is a required field")
    .min(2, "At least 2 characters"),
  email: string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirmPassword: string()
    .required("Please re-type your password")
    .oneOf([ref("password")], "Passwords do not match"),
  roleName: string().required("Please select your role"),
  // voice not requared
});

export default function RegisterForm() {
  const { success, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [touchedFields, setTouchedFields] = useState({});
  const [isVoiceActive, setIsVoiceActive] = useState(false); //for microphone styles
  const [isRegistered, setIsRegistered] = useState(false); //for display 'Sign Up With Voice'
  const [recordedMessage, setRecordedMessage] = useState(false); //for record success
  const [isVoiceRecording, setIsVoiceRecording] = useState(false); // if microphone clicked

  // Навигация на /login  только после успешной регистрации и получения ответа от сервера.
  // После успешного ответа от сервера сообщение "Successful...".
  // Через 3 секунды переход на страницу /login

  // if registration success => renew userInfo and start voice
  useEffect(() => {
    if (success && isVoiceRecording && userInfo?.id) {
      signUpWithVoice();
    }
  }, [success, userInfo, isVoiceRecording]); // isVoiceRecording true-starts signUpWithVoice

  // show success message and navigate
  useEffect(() => {
    if (success && recordedMessage) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [success, recordedMessage]);

  //when click button 'Register'
  const submitForm = (data) => {
    const newUser = {
      firstName: data.firstName,
      email: data.email,
      password: data.password,
      roleName: data.roleName,
    };
    console.log("submitForm newUser", newUser);
    dispatch(registerUser(newUser));
    setIsRegistered(true);
  };

  //when 'Click to record voice'
  const handleVoiceSignUp = () => {
    setIsVoiceRecording(true); // useEffect expect true

    setIsVoiceActive(true) //styles microphone
    console.log("Voice recording started");
    setTimeout(() => {
      setIsVoiceActive(false);
      console.log("Voice recording ended");
    }, 5500);

  };

  const signUpWithVoice = () => {
    // console.log("userInfo", userInfo)
    const userId = userInfo?.id; // in state auth userInfo id

    if (!userId) {
      console.error("Error: userId Not Found!");
      return;
    }
      console.log("Sending userId from Component:", userId);

    dispatch(registerUserWithVoice(userId))
    .then( (response) => {
      if (response?.error) {
        console.error("Voice Record Error:", response.error)
        return;
      }
      setRecordedMessage(true); // record success      
    })
    .catch( (error) => {
      console.log("Server Error:", error)
    })
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
        roleName: "",
      }}
      onSubmit={(values) => {
        submitForm(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue, // for update Formik
      }) => (
        <div className={s.loginWrapper}>
          <div className={s.form}>
            <form onSubmit={handleSubmit}>
              <img className={s.logo} src={logo} alt="logo" />
              <h2>Hi! Create your account</h2>

              <div className={s.inputs}>
                <div>
                  <p className={s.names}>Name</p>
                  <CustomInput
                    type="text"
                    name="firstName"
                    onChange={(e) => {
                      handleChange(e);
                      setTouchedFields({ ...touchedFields, firstName: true });
                    }}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="Enter your name"
                    id="firstName"
                  />
                  {touched.firstName && errors.firstName && (
                    <p className={s.error}>{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <p className={s.names}>Email</p>
                  <CustomInput
                    type="email"
                    name="email"
                    onChange={(e) => {
                      handleChange(e);
                      setTouchedFields({ ...touchedFields, email: true });
                    }}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Enter your email"
                    id="email"
                  />
                  {touched.email && errors.email && (
                    <p className={s.error}>{errors.email}</p>
                  )}
                </div>

                <div>
                  <p className={s.names}>Create password</p>
                  <CustomInput
                    type="password"
                    name="password"
                    onChange={(e) => {
                      handleChange(e);
                      setTouchedFields({ ...touchedFields, password: true });
                    }}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    id="password"
                  />
                  {touched.password && errors.password && (
                    <p className={s.error}>{errors.password}</p>
                  )}
                </div>

                <div>
                  <p className={s.names}>Repeat password</p>
                  <CustomInput
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => {
                      handleChange(e);
                      setTouchedFields({
                        ...touchedFields,
                        confirmPassword: true,
                      });
                    }}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    placeholder="Confirm password"
                    id="confirmPassword"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className={s.error}>{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Choose Role */}
              <div className={s.checkboxWrapper}>
                <p className={s.names}>Sign up as:</p>
                <RadioBtn
                  name="roleName"
                  label="Student"
                  value="ROLE_USER"
                  checked={values.roleName === "ROLE_USER"}
                  onChange={() => {
                    // console.log("Selected role: ROLE_USER");
                    setFieldValue("roleName", "ROLE_USER");
                  }}
                />

                <RadioBtn
                  name="roleName"
                  label="Instructor"
                  value="ROLE_ADMIN"
                  checked={values.roleName === "ROLE_ADMIN"}
                  onChange={() => {
                    // console.log("Selected role: ROLE_ADMIN")
                    setFieldValue("roleName", "ROLE_ADMIN");
                  }}
                />
              </div>

              <p className={s.redirect}>
                Already have an account?
                <span className={s.login} onClick={() => navigate("/login")}>
                  {" "}
                  Login here
                </span>
              </p>

              {/* Registration button */}
              <button type="submit">Register</button>

              {/* VOICE option */}
              {isRegistered && (
              <>
                <h3>Sign up with voice (optional)</h3>
                <div className={s.voiceContainer}>
                  <p className={`${s.voice} ${isVoiceActive ? s.voiceActive : ""}`}
                    onClick={() => {
                      setIsVoiceActive(true); // for microphone styles
                      console.log("Voice recording started");
                      handleVoiceSignUp(); // start voice recording
                    }}
                  >
                    {isVoiceActive ? "🎙️ Say something 5 sec" : "🎙️ Click to record voice"}
                  </p>

                  <p className={s.voice}
                    onClick={() => {
                      setIsVoiceActive(false);
                      console.log("Voice recording skipped");
                      navigate("/login");
                    }}
                  >
                    ✖ No, thank you
                  </p>
                </div>

                {recordedMessage && (<p className={s.successMessage}>Record Successfull</p>)}
              </>
              )}
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}


//old code
// export default function RegisterForm() {
//   const { success } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [role, setRole] = useState(); 
//   const [touchedFields, setTouchedFields] = useState({});

//   // redirect authorized user to login screen
//   useEffect(() => {
//     if (success) navigate("/login");
//   }, [navigate, success]);

//   const submitForm = (data) => {
//     const newUser = {
//       firstName: data.firstName,
//       email: data.email,
//       password: data.password,
//       // roleName: "ROLE_ADMIN",
//       // roleName: "ROLE_USER",
//       roleName: data.roleName,
//     };

//     console.log("submitForm newUser", newUser)
//     dispatch(registerUser(newUser));
//   };

//   return (
//     <Formik
//       validationSchema={schema}
//       initialValues={{
//         firstName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         roleName: "",
//         // voice: "", //new field for voice+new button
//       }}
//       onSubmit={(values) => {
//         submitForm(values);
//       }}
//     >
//       {({
//         values,
//         errors,
//         touched,
//         handleChange,
//         handleBlur,
//         handleSubmit,
//         setFieldValue, // for update Formik
//       }) => (
//         <div className={s.loginWrapper}>
//           <div className={s.form}>
//             <form onSubmit={handleSubmit}>
//               <img className={s.logo} src={logo} alt="logo" />
//               <h2>Hi! Create your account.</h2>
//               <div className={s.inputs}>
//                 <div>
//                   <p className={s.names}>Name</p>
//                   <CustomInput
//                     type="text"
//                     name="firstName"
//                     onChange={(e) => {
//                       handleChange(e);
//                       setTouchedFields({ ...touchedFields, firstName: true });
//                     }}
//                     onBlur={handleBlur}
//                     value={values.firstName}
//                     placeholder="Enter your name"
//                     id="firstName"
//                   />
//                 </div>
//                 <div>
//                   <p className={s.names}>Email</p>
//                   <CustomInput
//                     type="email"
//                     name="email"
//                     onChange={(e) => {
//                       handleChange(e);
//                       setTouchedFields({ ...touchedFields, email: true });
//                     }}
//                     onBlur={handleBlur}
//                     value={values.email}
//                     placeholder="Enter your email"
//                     id="email"
//                   />
//                 </div>
//                 <div>
//                   <p className={s.names}>Create password</p>
//                   <CustomInput
//                     type="password"
//                     name="password"
//                     onChange={(e) => {
//                       handleChange(e);
//                       setTouchedFields({ ...touchedFields, password: true });
//                     }}
//                     onBlur={handleBlur}
//                     value={values.password}
//                     placeholder="Enter password"
//                     id="password"
//                   />
//                 </div>
//                 <div>
//                   <p className={s.names}>Repeat password</p>
//                   <CustomInput
//                     type="password"
//                     name="confirmPassword"
//                     onChange={(e) => {
//                       handleChange(e);
//                       setTouchedFields({
//                         ...touchedFields,
//                         confirmPassword: true,
//                       });
//                     }}
//                     onBlur={handleBlur}
//                     value={values.confirmPassword}
//                     placeholder="Confirm password"
//                     id="confirmPassword"
//                   />
//                 </div>
//               </div>

//               {/* Display errors */}
//               <p className={s.error}>
//                 {(touchedFields.firstName || touched.firstName) &&
//                   errors.firstName &&
//                   touched.firstName &&
//                   errors.firstName}
//               </p>
//               <p className={s.error}>
//                 {(touchedFields.email || touched.email) &&
//                   errors.email &&
//                   touched.email &&
//                   errors.email}
//               </p>
//               <p className={s.error}>
//                 {(touchedFields.password || touched.password) &&
//                   errors.password &&
//                   touched.password &&
//                   errors.password}
//               </p>
//               <p className={s.error}>
//                 {(touchedFields.confirmPassword || touched.confirmPassword) &&
//                   errors.confirmPassword &&
//                   touched.confirmPassword &&
//                   errors.confirmPassword}
//               </p>
//               <p className={s.error}>
//                 {touched.roleName && errors.roleName}
//               </p>
              
//               {/* Choose Role */}
//               <div className={s.checkboxWrapper}>
//               <p className={s.names}>Sign up as:</p>
//                 <RadioBtn
//                   name="roleName"
//                   label="Student"
//                   value="ROLE_USER"
//                   checked={values.roleName === "ROLE_USER"} 
//                   onChange={() => {
//                     // console.log("Selected role: ROLE_USER");
//                     setFieldValue("roleName", "ROLE_USER")}
//                   }
//                 />
//                 <RadioBtn
//                   name="roleName"
//                   label="Instructor"
//                   value="ROLE_ADMIN"
//                   checked={values.roleName === "ROLE_ADMIN"}
//                   onChange={() => {
//                     // console.log("Selected role: ROLE_ADMIN")
//                     setFieldValue("roleName", "ROLE_ADMIN")}
//                   }
//                 />
//               </div>

//               <p className={s.redirect}>
//                 Already have an account? 
//                 <span onClick={() => navigate("/login")}> Login</span>
//               </p>
//               <button type="submit"> Register</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </Formik>
//   );
// }




//RegisterForm with Voice
// voice не обязательное поле
