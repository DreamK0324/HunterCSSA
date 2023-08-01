import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateMember = () => {
  const userID = useGetUserID();
  const [cookies, ] = useCookies(["access_token"]);
  const [member, setMember] = useState({
    membername: "",
    role: "",
    department: "",
    contact: "",
    profilePic: "",
    description: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:5001/about/members",
        { ...member },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Member Created");
      navigate("/about");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate(-1); 
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Convert the selected file to a base64-encoded string
      const base64String = reader.result.split(",")[1];
      setMember({ ...member, profilePic: base64String });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-member">
      <h2>Create Member</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="membername">Member Name</label>
        <textarea
          type="text"
          id="membername"
          name="membername"
          value={member.membername}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="role">Role</label>
        <textarea
          type="role"
          id="role"
          name="role"
          value={member.role}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="department">Department</label>
        <textarea
          id="department"
          name="department"
          value={member.department}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="contact">Contact</label>
        <textarea
          type="text"
          id="contact"
          name="contact"
          value={member.contact}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          value={member.description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="profilePic">Profile Picture</label>
        <input
          type="file"
          id="profilePic"
          name="profilePic"
          accept="image/*"
          onChange={handleFileChange}
        />

        <button type="submit">Create</button>
      </form>

      <button onClick={handleBack}>Back</button>
    </div>
  );
};
