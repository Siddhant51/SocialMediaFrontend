import React from "react";

const Sidebar = ({ user, switcher, setSwitcher, setLoginUser }) => {
  return (
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
  );
};

export default Sidebar;
