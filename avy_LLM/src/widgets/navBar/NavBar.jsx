import React, { useEffect, useState } from 'react';
import s from './NavBar.module.css';
import CustomNavLink from '../../ui/customNavLink/CustomNavLink';
import layers from '../../assets/images/layers.svg';
import simulate from "../../assets/images/simulate.svg";
import marketplace from "../../assets/images/marketplace.svg";
import profile from "../../assets/images/profile.svg";
import { useSelector } from 'react-redux';
import CustomButton from '../../ui/customButton/CustomButton';
import { useNavigate } from 'react-router-dom';

const sideMenuAdminData = [
  { title: "Dashboard", link: "/dashboard-admin", icon: layers },
];

const sideMenuUserData = [
  { title: "Dashboard", link: "/dashboard", icon: layers },
  { title: "Simulate", link: "/simulate", icon: simulate },
  { title: "Marketplace", link: "/marketplace", icon: marketplace },
  { title: "My profile", link: "/profile", icon: profile },
  { title: "LinkProfile Page", link: "/linkprofile", icon: profile }, //temporary link
];

export default function NavBar() {
  const { loading, userInfo } = useSelector(state => state.user);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const navigation = useNavigate()
  useEffect(() => {
    if (userInfo && userInfo.roles) {
      setCurrentUserRole(userInfo.roles[0]);
    }
  }, [userInfo]);

  const renderAdminNavBar = () => (
    <div className={s.navbar}>
      {sideMenuAdminData.map((item) => (<CustomNavLink key={item.title} {...item} />))}
    </div>
  );

  const renderUserNavBar = () => (
    <div className={s.navbar}>
      {sideMenuUserData.map((item) => (
        <CustomNavLink key={item.title} {...item} />
      ))}
      <CustomButton
        text={"Become an Admin"}
        onClick={() => navigation("/price-list")}
      ></CustomButton>
    </div>
  );

  // Check if userInfo is not yet available
  if (!userInfo) {
    return null; // or return a loading indicator
  } else if (currentUserRole === "ROLE_USER" ) {
    return renderUserNavBar();
  } else if (currentUserRole === "ROLE_ADMIN") {
    return renderAdminNavBar();
  }

  
}
