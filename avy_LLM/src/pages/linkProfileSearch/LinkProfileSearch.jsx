import React, { useEffect, useState } from "react";
import s from "./LinkProfileSearch.module.css";
import Header from "../../widgets/header/Header";
import Nav from "../linkProfile/nav/Nav";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const backendMedia = process.env.REACT_APP_MEDIA_SERVER_URL;

const LinkProfileSearch = () => {
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    state: "",
    city: "",
    country: "",
    // pageOrdinal: "",
  });

  const [users, setUsers] = useState([]);
  // console.log("users", users)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const userToken = localStorage.getItem("userToken") || null;
  // console.log("userToken", userToken);

  const isEmptySearch = Object.values(searchParams).every(
    (value) => value === ""
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUsers = async (params) => {
    // console.log("my searching:", params);
    setLoading(true);
    setError("");

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.post(
        `${backendUrl}/api/user/info/search`,
        params,
        config
      );

      console.log("Users found:", response.data.content);
      setUsers(response.data.content);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  //  debounce , чтобы не отправлять запрос на каждое нажатие клавиши (ждёт  мс)

  // searchParams
  useEffect(() => {
    if (!isEmptySearch) {
      fetchUsers(searchParams);
    } else {
      setUsers([]);
    }
  }, [searchParams]);

  return (
    <>
      <Header />
      <Nav />

      <main className={s.main}>
        <div className={s.section__contentContainer}>
          <div className={s.section__header}>
            <IoSearchOutline className={s.section__search} />

            <input
              className={s.customInput}
              type="text"
              name="keyword"
              placeholder="Search Avy users"
              value={searchParams.keyword}
              onChange={handleInputChange}
            />
          </div>

          <div className={s.section__params}>
            <input
              className={s.customInput}
              type="text"
              name="city"
              placeholder="Enter city"
              value={searchParams.city}
              onChange={handleInputChange}
            />
            <input
              className={s.customInput}
              type="text"
              name="state"
              placeholder="Enter state"
              value={searchParams.state}
              onChange={handleInputChange}
            />
            <input
              className={s.customInput}
              type="text"
              name="country"
              placeholder="Enter country"
              value={searchParams.country}
              onChange={handleInputChange}
            />
          </div>

          {isEmptySearch && (
            <p className={s.message}> Please enter at least one parametr</p>
          )}

          {loading && <p className={s.message}>Loading users...</p>}
          {error && <p className={s.message}>{error}</p>}

          <div className={s.section__content}>
            {users.length > 0
              ? users.map((user) => (
                  <div key={user.id} className={s.section__userCard}>
                    <img
                      className={s.userPhoto}
                      src={
                        user.linkToImage
                          ? `${backendMedia}/images/${user.linkToImage
                              .split("\\")
                              .pop()}`
                              // in demo - local path needs to be split and pop
                              // in production -`${backendMedia}/images/${user.linkToImage}`
                          :  "/images/avatar.png"
                      }
                      alt="user photo"
                    />
                    <div className={s.userInfo}>
                      <h5 className={s.firstText}>
                        {user.firstName} {user.lastName}
                      </h5>
                      <span className={s.secondText}>
                        {user.location ? 
                         `${user.location.city || ""} 
                          ${user.location.state || ""} 
                          ${user.location.country || ""}`
                          : "Location not available"}
                      </span>
                    </div>
                  </div>
                ))
              : !loading &&
                !error && <p className={s.message}>Users not found</p>}
          </div>
        </div>
      </main>
    </>
  );
};

export default LinkProfileSearch;
