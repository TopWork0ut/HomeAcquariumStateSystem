import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../CSSfiles/Login.css";
import { useEffect, useContext } from "react";
import { AuthContext } from "./../Authentification";
import { getAllUsers } from "./../Api";

function Login() {
  const [namelog, setNamelog] = useState("");
  //   const [emaillog, setEmaillog] = useState("");
  const [passwordlog, setPasswordlog] = useState("");
  const [users, setUsers] = useState("");
  const navigate = useNavigate();

  const { setIsAuthentificated } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await getAllUsers();
        setUsers(responseUsers.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    // console.log(localStorage.getItem("name"));
    // console.log(localStorage.getItem("password"));

    let name;
    let pass;
    if (localStorage.getItem("name") != null) {
      name = localStorage.getItem("name").replace(/"/g, "");
      pass = localStorage.getItem("password").replace(/"/g, "");
    }
    if (!namelog || !passwordlog) {
      alert("Please, fill in all fields!");
    }
    // else if (passwordlog !== pass || namelog !== name) {
    //   console.log(pass);
    //   console.log(name);
    //   alert("Fill correct info about you!");
    // }
    else {
      const user = users.find((user) => user.username === namelog);
      console.log(user);
      setIsAuthentificated(true);
      navigate(`/data/:${user.id}`);

      //   navigate("/home/", { id: user.id });
    }
  }

  return (
    <>
      <div className="login">
        <form onSubmit={handleLogin}>
          <h2>Log In</h2>
          <p>
            <input
              type="text"
              placeholder="Enter username"
              onChange={(event) => setNamelog(event.target.value)}
            />
          </p>

          <p>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(event) => setPasswordlog(event.target.value)}
            />
          </p>
          <button type="submit">
            <p>Login</p>
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
