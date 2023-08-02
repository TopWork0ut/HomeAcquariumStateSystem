import React from "react";
import { useNavigate } from "react-router-dom";
import LogOutImg from "./../Img/logout.png";
import { AuthContext } from "../../Authentification";

export default function LogOut() {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    console.log("Logout");

    sessionStorage.clear();

    navigate("/login");
  };
  return (
    <div className="logout_div">
      <img src={LogOutImg} alt="logout-img" onClick={logout} />
    </div>
  );
}
