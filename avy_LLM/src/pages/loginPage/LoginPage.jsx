import React from "react";
import LoginForm from "../../widgets/loginForm/LoginForm";
import { useLocation } from "react-router-dom";
import RegisterForm from "../../widgets/registerForm/RegisterForm";

function LoginPage() {
  const location = useLocation();
  const { pathname } = location;

  return <div>{pathname === "/login" ? <LoginForm /> : <RegisterForm />}</div>;
}

export default LoginPage;
