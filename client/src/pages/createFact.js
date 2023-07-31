import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateFact = () => {
  const userID = useGetUserID();
  const [cookies, ] = useCookies(["access_token"]);
  const [fact, setFact] = useState({
    theme: "",
    date: "",
    location: "",
    description: "",
    imageUrl: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFact({ ...fact, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:5001/facts",
        { ...fact },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Fact Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate(-1); 
  }

  return (
    <div className="create-fact">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="theme">Theme</label>
        <input
          type="text"
          id="theme"
          name="theme"
          value={fact.theme}
          onChange={handleChange}
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={fact.date}
          onChange={handleChange}
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={fact.location}
          onChange={handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={fact.description}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={fact.imageUrl}
          onChange={handleChange}
        />

        <button type="submit">Create</button>
      </form>

      <button onClick={handleBack}>Back</button>
    </div>
  );
};
