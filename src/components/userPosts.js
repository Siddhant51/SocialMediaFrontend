import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URI = "http://localhost:3000";

const NAME_OF_UPLOAD_PRESET = "pafh9buy";
const YOUR_CLOUDINARY_ID = "dsmdga8vs";

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState();

  const handelImage = (event) => {
    setFile(event.target.files[0]);
  };

  const Create = async (e) => {
    e.preventDefault();
    try {
      if (userId && content && file) {
        const data = new FormData();
        data.append("content", content);
        data.append("file", file);
        data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
        data.append("folder", "Trial");

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const img = res.data;
        const media = img.secure_url;

        await axios.post("/create", { content, media, userId });
        console.log("Post successful");
        setContent("");
        setFile();
      } else {
        alert("Please fill all fields");
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
          <input type="file" name="file" onChange={handelImage}></input>
          <button className="btn" onClick={Create}>
            Create
          </button>
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
    </>
  );
};

export default UserPosts;
