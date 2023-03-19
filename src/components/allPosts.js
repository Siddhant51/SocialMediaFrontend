import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URI = "http://localhost:3000";

const AllPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .post(`${BASE_URI}/posts`, { userId })
      .then((res) => {
        setPosts(res.data.posts.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="body">
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <div className="user">
            <div className="icon">
              <img src={post.user.profilePic}></img>
            </div>
            <div className="username">{post.user.name}</div>
          </div>

          {post.media ? (
            <div className="media">
              <div className="media-container">
                <img src={post.media}></img>
              </div>
            </div>
          ) : null}

          <div className="content">
            <p>{post.content}</p>
          </div>

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
  );
};

export default AllPosts;
