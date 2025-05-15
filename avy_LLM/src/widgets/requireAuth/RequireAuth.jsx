// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useGetUserDetailsQuery } from "../../services/authService";
// import { setCredentials } from "../../store/slice/userSlice";

// export default function RequireAuth({ children, roles }) {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   let currentUserRole;
 
//   const { userLoaded, userInfo} = useSelector(
//     (state) => state.user
//   );

//   const { data, isFetching } = useGetUserDetailsQuery("userDetails");

//   useEffect(() => {
//     if (data) dispatch(setCredentials(data));
//   }, [data, dispatch]);

//   useEffect(() => {
//     if (userInfo && userInfo.roles && userInfo.roles.length > 0) {
//       currentUserRole = userInfo.roles[0];
//     }
//   }, [userInfo]);

//   if (isFetching) {
//     return <p>Loading</p>;
//   } else if (userLoaded) {
//     currentUserRole = userInfo.roles[0];
//     if (currentUserRole) {
//       if (roles) {
//         if (roles.includes(currentUserRole)) {
//           return children;
//         } else {
//           console.log("Acces Denied");
//           return <Navigate to={location.pathname} />;
//         }
//       } else {
//         return children;
//       }
//     } else {
//       return <Navigate to="/" state={{ path: location.pathname }} />;
//     }
//   }
// }

