import React from "react";
import { useNavigate } from "react-router-dom";

export const Affairs = () => {
  const navigate = useNavigate();

  const handleCreateAffair = () => {
    navigate("/createAffair");
  };

  return (
    <div>
      <h2>Affairs</h2>
      <button onClick={handleCreateAffair} className="create-button">Create Affair</button>
    </div>
  );
};
