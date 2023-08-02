import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "./../CSSfiles/DataDiagram.css";
import {
  getUserById,
  getAllStepperMotors,
  getAllSteppersDataByID,
  //   getStepperMotorById,
  //   deleteStepperMotorById,
  updateStepperMotorById,
  addStepperMotorUserIDByStepperId,
} from "./../Api";

function StepperStatistics() {
  //   const [userData, setUserdata] = useState([]);
  const { loginId } = useParams();

  // console.log(loginId);
  const userID = loginId.slice(1);
  //   console.log("useridUltrasonic" + userID);
  const [user, setUser] = useState("");

  const [stepperMotors, setStepperMotors] = useState([]);
  const [stepperMotorsOfUser, setStepperMotorsOfUser] = useState([]);

  const [stepperIDToShow, setStepperIDToShow] = useState(1);
  const [steppersToShow, setSteppersToShow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById(userID);
        setUser(user);

        const responseSteppers = await getAllStepperMotors();
        setStepperMotors(responseSteppers.data);
        setStepperMotorsOfUser(
          stepperMotors.filter((stepper) => stepper.userId === user.id)
        );

        if (stepperIDToShow != "") {
          const response = await getAllSteppersDataByID(stepperIDToShow);
          const dcArray = response.data;
          setSteppersToShow(dcArray);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchData();
  }, [userID, stepperMotors, stepperMotorsOfUser]);

  const [inputValues, setInputValues] = useState({});
  const [deleteValues, setDeleteValues] = useState({});

  const handleAddStepperMotor = async () => {
    console.log(user.id);
    addStepperMotorUserIDByStepperId(stepperId, user.id);
  };

  const handleDeleteStepperMotor = async (moduleId) => {
    updateStepperMotorById(moduleId);
  };

  const [stepperId, setStepperId] = useState("");

  const handleInputChange = (module, value) => {
    setInputValues({ ...inputValues, [module]: value });
    if (module === "Stepper") {
      setStepperId(value);
    }
  };

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleViewStatistics = (id) => {
    console.log("id to set up " + id);
    setStepperIDToShow(id);
    setIsOverlayOpen(!isOverlayOpen);
  };

  return (
    <div className="data_container">
      <Link to={`/data/:${userID}`} style={{ textDecoration: "none" }}>
        <p>BACK</p>
      </Link>
      <div className="add_modules">
        <div>
          <input
            type="text"
            placeholder="Stepper's ID"
            value={inputValues["Stepper"] || ""}
            onChange={(e) => handleInputChange("Stepper", e.target.value)}
          />
          <button onClick={() => handleAddStepperMotor()}>Add Stepper</button>
        </div>
      </div>
      <div className="modulesRow">
        <div>
          {stepperMotorsOfUser.map((stepper) => (
            <div key={stepper.id}>
              <span>
                {"Stepper id "}- {stepper.id}
              </span>
              <button onClick={() => handleViewStatistics(stepper.id)}>
                View Statistics
              </button>
              <button onClick={() => handleDeleteStepperMotor(stepper.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            {/* {console.log(dcsToShow)} */}
            {steppersToShow.map((stepper) => (
              <div key={stepper.id}>
                <p>ID: {stepper.id}</p>
                <p>Time: {stepper.timeOfFeeding}</p>
                <p>MotorID: {stepper.motorId}</p>
                {/* Render other properties here */}
              </div>
            ))}
            <button onClick={() => setIsOverlayOpen(!isOverlayOpen)}>
              Close Overlay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default StepperStatistics;
