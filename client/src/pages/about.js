import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import useUserData from "../hooks/useUserData";

function convertBase64ToImage(base64String) {
    return `data:image/jpeg;base64,${base64String}`;
}

export const About = () => {
    const userID = useGetUserID();
    const navigate = useNavigate();

    const userData = useUserData(userID);
    const canCreateFact = userData?.canCreateFact || false;

    const handleCreateMember = () => {
        navigate("/createMember");
    };

    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await axios.get("http://localhost:5001/about/members");
            setMembers(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchMembers();
      }, []);


      
      

    return (
        <div>
            <h2>About</h2>
            {canCreateFact && (
                <button onClick={handleCreateMember} className="create-button">
                Create Member -Restricted
                </button>
            )}

            <h3>Members List:</h3>
            <ul>
                {members.map((member) => (
                <li key={member._id}>
                    <p>Member Name: {member.membername}</p>
                    <p>Role: {member.role}</p>
                    <p>Department: {member.department}</p>
                    <p>Contact: {member.contact}</p>
                    <p>Description: {member.description}</p>
                    <img src={convertBase64ToImage(member.profilePic)} alt="Profile Pic" />
                </li>
                ))}
            </ul>

        </div>
    );
}