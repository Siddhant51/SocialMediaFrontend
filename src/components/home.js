import React from "react";
import { useState } from "react";
import "./home.css";
import AllPosts from "./allPosts";
import UserPosts from "./userPosts";

const Home = ({ user, userId, setLoginUser }) => {
  const [switcher, setSwitcher] = useState("posts");

  return (
    <div className="display">
      <div className="sidebar">
        <div className="profile">
          <div className="img-container">
            <img src={user.profilePic}></img>
          </div>
          <h2>{user.name}</h2>
        </div>

        {switcher.includes("userposts") ? (
          <div className="option" onClick={() => setSwitcher("posts")}>
            <p>Home</p>
          </div>
        ) : (
          <div className="option" onClick={() => setSwitcher("userposts")}>
            <p>Dashboard</p>
          </div>
        )}

        <div
          className="option"
          onClick={() => {
            localStorage.removeItem("userData");
            setLoginUser("");
            console.log("Logged-out successfully");
          }}
        >
          Logout
        </div>
      </div>

      <div className="main">
        {switcher === "userposts" ? (
          <UserPosts userId={userId} />
        ) : (
          <AllPosts userId={userId} />
        )}
      </div>
    </div>
  );
};

export default Home;
