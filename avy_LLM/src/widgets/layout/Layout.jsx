import React, { useState } from "react";
import Header from "../header/Header";
import NavBar from "../navBar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import s from "./Layout.module.css";


export default function Layout() {
  const location = useLocation();
  const { pathname } = location;
  const isAuthorized = !["/", "/login", "/register"].includes(pathname);


  return (
    <>
      <div>
        {isAuthorized && <Header />}
        {isAuthorized && <NavBar />}
      </div>
      <div className={isAuthorized ? s.pages : s.full}>
        <Outlet />
      </div>

    </>
  );
}
