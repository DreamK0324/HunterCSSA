import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import useUserData from "../hooks/useUserData";

export const Facts = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [facts, setFacts] = useState([]);

  const userData = useUserData(userID);
  const canCreateFact = userData?.canCreateFact || false;

  const handleCreateFact = () => {
    navigate("/createFact");
  };

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/facts`);
        const factsData = response.data;
        factsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setFacts(factsData);
      } catch (error) {
        console.error("Error fetching facts:", error);
      }
    };
    fetchFacts();
  }, []);


  return (
    <div>
      <h2>Events</h2>
      {/* <button onClick={handleCreateFact} className="create-button">Create Fact</button> */}
      {canCreateFact && (
        <button onClick={handleCreateFact} className="create-button">
          Create Event -Restricted
        </button>
      )}

      <ul>
        {facts.map((fact) => (
          <li key={fact._id}>
            <p>{fact.theme}</p>
            <p>Date: {new Date(fact.date).toLocaleDateString()}</p>
            <p>Location: {fact.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
