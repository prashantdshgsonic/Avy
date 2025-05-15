import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin, userLoginWithVoice } from "../../store/slice/authActions";
import { getUserData } from "../../store/slice/userActions";
import CustomInput from "../../ui/customInput/CustomInput";
import s from "./LoginForm.module.css";
import logo from "../../assets/images/logo.svg";
import { LuUser } from "react-icons/lu";
import { LuUserCog } from "react-icons/lu";
import { CiMicrophoneOn } from "react-icons/ci";


const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const [loginError, setLoginError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("ROLE_USER");
  const { userToken } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken || localStorage.getItem("userToken")) {
      dispatch(getUserData(userToken));
    }
  }, [userToken, dispatch]);

  useEffect(() => {
    if (userInfo && userInfo.roles) {
      if (
        selectedRole === "ROLE_ADMIN" &&
        userInfo.roles.includes("ROLE_ADMIN")
      ) {
        navigate("/dashboard-admin");
      } else if (
        selectedRole === "ROLE_USER" &&
        userInfo.roles.includes("ROLE_USER")
      ) {
        navigate("/dashboard");
      } else {
        setLoginError("Access denied for this role.");
      }
    }
    // console.log("userInfo", userInfo);
  }, [userInfo, selectedRole, navigate]);

  const handleRoleSelection = (role, resetForm) => {
    setSelectedRole(role);
    setLoginError(null); // Clear login error when switching roles
    dispatch({ type: "user/clearUserInfo" }); // Ensure userInfo is reset
    resetForm(); // Reset form needs to be to stop  failed login
    console.log("form reset");
  };

  //login with button 'login'
  const submitForm = async (data) => {
    try {
      setLoginError(null);
      await dispatch(userLogin(data));
    } catch (error) {
      console.error("Login failed:", error.message);

      if (error.message === "Incorrect credentials") {
        setLoginError("Incorrect email or password. Please try again");
      } else {
        setLoginError("Something went wrong. Please try again later");
      }

      // Explicitly clear user info on failed login
      dispatch({ type: "user/clearUserInfo" });
    }
    console.log("userInfo", userInfo);
  };

  //login with Microphone
  const logInWithVoice = async () => {
    try {
      const response = await dispatch(userLoginWithVoice()).unwrap();
      dispatch(getUserData(response.accessToken));
      // navigate("/dashboard");

      if (response.roleName?.includes("ROLE_ADMIN")) {
        navigate("/dashboard-admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => submitForm(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
      }) => (
        <div className={s.loginWrapper}>
          <div className={s.form}>
            <form onSubmit={handleSubmit}>
              <img className={s.logo} src={logo} alt="logo" />

              <h2>Hi! Log in to your account</h2>

              <div className={s.loginContainer}>
                <p
                  className={`${s.login} ${
                    selectedRole === "ROLE_USER" ? s.active : ""
                  }`}
                  onClick={() => handleRoleSelection("ROLE_USER", resetForm)}
                >
                  <LuUser /> as User
                </p>
                <p
                  className={`${s.login} ${
                    selectedRole === "ROLE_ADMIN" ? s.active : ""
                  }`}
                  onClick={() => handleRoleSelection("ROLE_ADMIN", resetForm)}
                >
                  <LuUserCog /> as Admin
                </p>
              </div>

              <div>
                <p className={s.names}>Email</p>
                <CustomInput
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter your email"
                  id="email"
                />
              </div>

              {touched.email && errors.email && (
                <p className={s.error}>{errors.email}</p>
              )}

              <div>
                <p className={s.names}>Password</p>
                <CustomInput
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  id="password"
                />
              </div>

              {touched.password && errors.password && (
                <p className={s.error}>{errors.password}</p>
              )}

              {/* <p className={s.error}>{loginError && loginError}</p> */}

              {loginError && <p className={s.error}>{loginError}</p>}

              <p className={s.redirect}>
                Don't have an account?
                <span onClick={() => navigate("/register")}> Register now</span>
              </p>

              <div className={s.loginbtns}>
                <button className={s.loginmain} type="submit">
                  Log In
                </button>
                <CiMicrophoneOn
                  className={s.loginmic}
                  onClick={logInWithVoice}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}



//old code
// import React, { useEffect, useState } from "react";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { userLogin } from "../../store/slice/authActions";
// import { getUserData } from "../../store/slice/userActions";
// import CustomInput from "../../ui/customInput/CustomInput";
// import s from "./LoginForm.module.css";
// import logo from "../../assets/images/logo.svg";

// const schema = Yup.object().shape({
//   email: Yup.string()
//     .required("Email is a required field")
//     .email("Invalid email format"),
//   password: Yup.string()
//     .required("Password is a required field")
//     .min(8, "Password must be at least 8 characters"),
// });

// export default function LoginForm() {
//   const [loginError, setLoginError] = useState(null);
//   const { userToken } = useSelector((state) => state.auth);
//   const { userInfo } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userToken) {
//       dispatch(getUserData(userToken));
//     }
//         console.log("userInfo.roles", userInfo.roles) //
        
//     if (userInfo && userInfo.roles) {
//       if (userInfo.roles[0] === "ROLE_ADMIN") {
//         navigate("/dashboard-admin");
//       } else if (userInfo.roles[0] === "ROLE_USER") {
//         navigate("/dashboard");
//       }
//     }
//   }, [userToken, userInfo, dispatch, navigate]);

//   const submitForm = async (data) => {
//     try {
//       await dispatch(userLogin(data));
//     } catch (error) {
//       console.error("Login failed:", error.message);

//       if (error.message === "Incorrect credentials") {
//         setLoginError("Incorrect email or password. Please try again.");
//       } else {
//         setLoginError("Something went wrong. Please try again later.");
//       }

//       return;
//     }

//     if (userInfo && userInfo.roles) {
//       if (userInfo.roles[0] === "ROLE_ADMIN") {
//         navigate("/dashboard-admin");
//       } else if (userInfo.roles[0] === "ROLE_USER") {
//         navigate("/dashboard");
//       } else {
//         setLoginError("Password or email incorrect");
//       }
//     } else {
//       setLoginError("Password or email incorrect");
//     }
//   };

//   return (
//     <Formik
//       validationSchema={schema}
//       initialValues={{ email: "", password: "" }}
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
//       }) => (
//         <div className={s.loginWrapper}>
//           <div className={s.form}>
//             <form onSubmit={handleSubmit}>
//               <img className={s.logo} src={logo} alt="logo" />
//               <h2>Hi! Log in to your account</h2>
             
//               <p className={s.names}>Email</p>
//               <CustomInput
//                 type="email"
//                 name="email"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.email}
//                 placeholder="Enter your email"
//                 id="email"
//               />
//               <p className={s.error}>
//                 {errors.email && touched.email && errors.email}
//               </p>
//               <p className={s.names}>Password</p>
//               <CustomInput
//                 type="password"
//                 name="password"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.password}
//                 placeholder="Enter password"
//                 id="password"
//               />
//               <p className={s.error}>
//                 {errors.password && touched.password && errors.password}
//               </p>
//               <p className={s.error}>
//                 {loginError && loginError}
//               </p>
//               {/* <p>
//                 Don't have an account ?
//                 <span onClick={() => navigate("/register")}> Registration</span>
//               </p> */}
//               <button type="submit">Login</button>
//               <p className={s.login}>Log in as Admin</p>
//             </form>
//           </div>
//         </div>
//       )}
//     </Formik>
//   );
// }
