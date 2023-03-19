import React from "react";
import { useState } from "react";
import "./home.css";
import AllPosts from "./allPosts";
import UserPosts from "./userPosts";
import Sidebar from "./sidebar";
import Profile from "./profile";

const Home = ({ user, userId, setLoginUser }) => {
  const [switcher, setSwitcher] = useState("posts");

  return (
    <div className="display">
      <div className="side-div">
        <Sidebar
          user={user}
          switcher={switcher}
          setSwitcher={setSwitcher}
          setLoginUser={setLoginUser}
        />
      </div>

      <div className="main">
        {switcher === "profile" ? (
          <Profile user={user} userId={userId} setLoginUser={setLoginUser} />
        ) : switcher === "userposts" ? (
          <UserPosts userId={userId} />
        ) : (
          <AllPosts userId={userId} />
        )}
      </div>
    </div>
  );
};

export default Home;
