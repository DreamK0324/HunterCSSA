import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/facts">Events</Link>
      {/* <Link to="/createFact">Create</Link> */}
      <Link to="/about">About</Link>
      <Link to="/contectUs">Contect</Link>
      {!cookies.access_token ? (
        <button onClick={() => window.location.href = "/auth"}>Login</button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};