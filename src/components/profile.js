import React from "react";
import axios from "axios";
import { useState } from "react";
const BASE_URI = "http://localhost:3000";

const NAME_OF_UPLOAD_PRESET = "pafh9buy";
const YOUR_CLOUDINARY_ID = "dsmdga8vs";

const Profile = ({ userId, setLoginUser }) => {
  const [file, setFile] = useState();

  const handelImage = (event) => {
    setFile(event.target.files[0]);
  };

  const Update = async (e) => {
    e.preventDefault();
    try {
      if (userId && file) {
        const data = new FormData();
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
        const profilePic = img.secure_url;

        await axios.post(`${BASE_URI}/picture`, {
          userId,
          profilePic,
        });
        console.log("Update successful");
        setFile();
      } else {
        alert("Please fill all fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="topbar">
      <div className="form">
        <h3>Profile Picture</h3>
        <input type="file" name="file" onChange={handelImage}></input>
        <button className="btn" onClick={Update}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
