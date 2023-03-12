import React from "react";

const Posts = ({ posts }) => {
  return (
    <div>
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
  );
};

export default Posts;
