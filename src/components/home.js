import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import Posts from "./posts";

const BASE_URI = "http://localhost:3000";

const Home = ({ user, userId, setLoginUser }) => {
  const [posts, setPosts] = useState([]);
  const [extension, setExtension] = useState("posts");

  useEffect(() => {
    axios
      .post(`${BASE_URI}/${extension}`, { userId })
      .then((res) => {
        setPosts(res.data.posts.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [extension]);

  return (
    <div className="display">
      <div className="sidebar">
        <div className="profile">
          <div className="img-container">
            <img src={user.profilePic}></img>
          </div>
          <h2>{user.name}</h2>
        </div>

        {extension.includes("userposts") ? (
          <div className="option" onClick={() => setExtension("posts")}>
            <p>Home</p>
          </div>
        ) : (
          <div className="option" onClick={() => setExtension("userposts")}>
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
        {extension.includes("userposts") ? (
          <div className="topbar">
            <div className="form">
              <textarea
                type="text"
                placeholder="Enter text content here..."
              ></textarea>
              <input
                type="text"
                placeholder="Paste the image url here..."
              ></input>
              <button>Create</button>
            </div>
          </div>
        ) : null}

        <div className="body">
          <Posts posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
