import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "./../CSSfiles/DataDiagram.css";
import Home from "./Home";
import {
  getUserById,
  // getAllStepperMotors,
  // getAllDcMotors,
  // getAllUltrasonics,
  // getUltrasonicById,
  // getDcMotorById,
  // getStepperMotorById,
  // deleteDCById,
  // deleteStepperMotorById,
  // deleteUltrasonicById,
  // updateDcMotorById,
  // updateStepperMotorById,
  // updateUltrasonicById,
  // addDcMotorUserIDByDCId,
  // addStepperMotorUserIDByStepperId,
  // addUltrasonicUserIDByDCId,
} from "./../Api";

function DataDiagrams() {
  //   const [userData, setUserdata] = useState([]);
  const { loginId } = useParams();

  // console.log(loginId);
  const userID = loginId.slice(1);

  const [user, setUser] = useState("");
  // const [dcMotors, setDcMotors] = useState([]);
  // const [dcMotorsOfUser, setDCMotorsOfUser] = useState([]);

  // const [stepperMotors, setStepperMotors] = useState([]);
  // const [stepperMotorsOfUser, setStepperMotorsOfUser] = useState([]);

  // const [ultrasonics, setUltrasonics] = useState([]);
  // const [ultrasonicsOfUser, setUltrasonicsOfUser] = useState([]);

  // const [ultrasonic, setUltrasonic] = useState(null);
  // const [dcMotor, setDcMotor] = useState(null);
  // const [stepperMotor, setStepperMotor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById(userID);
        setUser(user);
        // const responseDcMotors = await getAllDcMotors();
        // setDcMotors(responseDcMotors.data);
        // setDCMotorsOfUser(dcMotors.filter((dc) => dc.userId === user.id));

        // const responseUltrasonics = await getAllUltrasonics();
        // setUltrasonics(responseUltrasonics.data);
        // setUltrasonicsOfUser(
        //   ultrasonics.filter((ultrasonic) => ultrasonic.userId === user.id)
        // );

        // const responseSteppers = await getAllStepperMotors();
        // setStepperMotors(responseSteppers.data);
        // setStepperMotorsOfUser(
        //   stepperMotors.filter((stepper) => stepper.userId === user.id)
        // );
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchData();
  }, [
    // userID,
    user,
    // dcMotors,
    // dcMotorsOfUser,
    // stepperMotors,
    // stepperMotorsOfUser,
    // ultrasonics,
    // ultrasonicsOfUser,
  ]);

  const [toggle, setToggle] = useState(false);
  const [modules, setModules] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [deleteValues, setDeleteValues] = useState({});

  // const handleAddDC = async () => {
  //   addDcMotorUserIDByDCId(dcId, user.id);
  // };

  // const handleAddStepperMotor = async () => {
  //   addStepperMotorUserIDByStepperId(stepperId, user.id);
  // };

  // const handleAddUltrasonic = async () => {
  //   addUltrasonicUserIDByDCId(ultrasonicId, user.id);
  // };

  // const handleDeleteDcMotor = async (moduleId) => {
  //   updateDcMotorById(moduleId);
  // };

  // const handleDeleteStepperMotor = async (moduleId) => {
  //   updateStepperMotorById(moduleId);
  // };

  // const handleDeleteUltrasonic = async (moduleId) => {
  //   updateUltrasonicById(moduleId);
  // };

  // const [dcId, setDcId] = useState("");
  // const [stepperId, setStepperId] = useState("");
  // const [ultrasonicId, setUltrasonicId] = useState("");

  // const handleInputChange = (module, value) => {
  //   setInputValues({ ...inputValues, [module]: value });
  //   if (module === "DC") {
  //     setDcId(value);
  //   } else if (module === "Stepper") {
  //     setStepperId(value);
  //   } else if (module === "Ultrasonic") {
  //     setUltrasonicId(value);
  //   }
  // };

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleUserChange = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [previousPassword, setPreviousPassword] = useState("");

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      newUsername !== "" &&
      newPassword !== "" &&
      previousPassword == user.password
    ) {
      fetch(`http://192.168.31.123:8080/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Username updated successfully:", data);
        })
        .catch((error) => {
          console.error("Error updating username:", error);
        });

      setNewUsername("");
    } else {
      alert("You've made a mistake");
    }
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handlePreviousPasswordChange = (event) => {
    setPreviousPassword(event.target.value);
  };

  return (
    <div className="data_container">
      <div className="headers">
        <p>Id</p>
        <p>Username</p>
        <p>Func</p>
      </div>
      <div className="top_menu">
        <p>{user.id}</p>
        <p>{user.username}</p>
        {/* <button onClick={() => setToggle(!toggle)}>
          {!toggle ? "Add module" : "Close"}
        </button> */}
        <button onClick={() => handleUserChange()}>Update user</button>
      </div>

      <div className="modulesRow">
        <Link to={`/data/dc/:${userID}`} style={{ textDecoration: "none" }}>
          <button>
            <p>DC diagrams</p>
          </button>
        </Link>
        <Link
          to={`/data/stepper/:${userID}`}
          style={{ textDecoration: "none" }}>
          <button>
            <p>Stepper diagrams</p>
          </button>
        </Link>
        <Link
          to={`/data/ultrasonic/:${userID}`}
          style={{ textDecoration: "none" }}>
          <button>
            <p>Data diagrams</p>
          </button>
        </Link>
      </div>
      <Home id={userID} />
      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Update user data</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                New Username:
                <input
                  type="text"
                  value={newUsername}
                  onChange={handleUsernameChange}
                />
              </label>
              <label>
                New Password:
                <input
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
              </label>
              <br />
              <label>
                Previous Password:
                <input
                  type="password"
                  value={previousPassword}
                  onChange={handlePreviousPasswordChange}
                />
              </label>
              <button type="submit">Save</button>
            </form>
            <button onClick={handleUserChange}>Close Overlay</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default DataDiagrams;
