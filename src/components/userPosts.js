import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URI = "http://localhost:3000";

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
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
      .post(`${BASE_URI}/userposts`, { userId })
      .then((res) => {
        setPosts(res.data.posts.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Create]);
  return (
    <>
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

      <div className="body">
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <div className="user">
              <div className="icon">
                <img src={post.user.profilePic}></img>
              </div>
              <div className="username">{post.user.name}</div>
            </div>

            <div className="content">
              <p>{post.content}</p>
            </div>

            {post.media ? (
              <div className="media">
                <div className="media-container">
                  <img src={post.media}></img>
                </div>
              </div>
            ) : null}

            <div className="time">
              <p>
                {new Date(post.createdAt).toLocaleString("default", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPosts;
