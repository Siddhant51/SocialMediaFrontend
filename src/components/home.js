import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import Posts from "./posts";

const BASE_URI = "http://localhost:3000";

const Home = ({ user, userId, setLoginUser }) => {
  const [posts, setPosts] = useState([]);
  const [extension, setExtension] = useState("posts");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");

  const handelImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setMedia(reader.result);
    };
  };

  const Create = () => {
    console.log(userId);

    try {
      if (userId && (content || media)) {
        axios.post("/create", { content, media, userId }).then(() => {
          console.log("Post successful");
          setContent("");
          setMedia("");
        });
      } else {
        alert("Please atleast fill one field");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .post(`${BASE_URI}/${extension}`, { userId })
      .then((res) => {
        setPosts(res.data.posts.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [extension, Create]);

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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter text content here..."
              ></textarea>
              <input type="file" onChange={handelImage}></input>
              <div className="btn" onClick={Create}>
                Create
              </div>
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
