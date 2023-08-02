import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
// import "./../App.css";
import "./../CSSfiles/DataDiagram.css";
import {
  getUserById,
  getAllDcMotors,
  getAllDcMotorsDataByID,
  //   deleteDCById,
  updateDcMotorById,
  addDcMotorUserIDByDCId,
} from "./../Api";

function DCStatistics() {
  const { loginId } = useParams();

  // console.log(loginId);
  const userID = loginId.slice(1);
  // console.log("useriddata" + userID);
  const [user, setUser] = useState("");
  const [dcMotors, setDcMotors] = useState([]);
  const [dcMotorsOfUser, setDCMotorsOfUser] = useState([]);

  const [dcMotorIDToShow, setDcMotorIDToShow] = useState(3);
  const [dcsToShow, setDcsToShow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById(userID);

        if (dcMotorIDToShow != "") {
          const response = await getAllDcMotorsDataByID(dcMotorIDToShow);
          const dcArray = response.data;
          setDcsToShow(dcArray);
          // console.log(dcArray);
          // console.log(
          //   "getAllDcMotorsDataByID(dcMotorIDToShow).data",
          //   await getAllDcMotorsDataByID(dcMotorIDToShow).data
          // );
          // console.log(
          //   "getAllDcMotorsDataByID(dcMotorIDToShow)",
          //   await getAllDcMotorsDataByID(dcMotorIDToShow)
          // );
          // console.log("dcsToShow", dcsToShow);
        }

        setUser(user);
        // console.log(user);
        const responseDcMotors = await getAllDcMotors();
        setDcMotors(responseDcMotors.data);
        setDCMotorsOfUser(dcMotors.filter((dc) => dc.userId === user.id));
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchData();
  }, [userID, dcMotors, dcMotorsOfUser]);

  //   const [toggle, setToggle] = useState(false);
  //   const [modules, setModules] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [deleteValues, setDeleteValues] = useState({});

  const handleAddDC = async () => {
    addDcMotorUserIDByDCId(dcId, user.id);
  };

  const handleDeleteDcMotor = async (moduleId) => {
    updateDcMotorById(moduleId);
  };

  const [dcId, setDcId] = useState("");

  const handleInputChange = (module, value) => {
    setInputValues({ ...inputValues, [module]: value });
    if (module === "DC") {
      setDcId(value);
    }
  };

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleViewStatistics = (id) => {
    console.log("id to set up " + id);
    setDcMotorIDToShow(id);
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
            placeholder="DC's ID"
            value={inputValues["DC"] || ""}
            onChange={(e) => handleInputChange("DC", e.target.value)}
          />
          <button onClick={() => handleAddDC()}>Add DC</button>
        </div>
      </div>

      <div className="modulesRow">
        <div>
          {dcMotorsOfUser.map((dc) => (
            <div key={dc.id}>
              <span>
                {"DC id "}- {dc.id}
              </span>
              {/* <Link to={`/data/:${userID}`} style={{ textDecoration: "none" }}> */}
              <button onClick={() => handleViewStatistics(dc.id)}>
                View Statistics
              </button>
              {/* </Link> */}
              <button onClick={() => handleDeleteDcMotor(dc.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      {/* {console.log(isOverlayOpen)} */}
      {isOverlayOpen && (
        <div className="overlay">
          <div className="overlay-content">
            {console.log(dcsToShow)}
            {dcsToShow.map((dc) => (
              <div key={dc.id}>
                <p>ID: {dc.id}</p>
                <p>StartTime: {dc.startTimeOfFiltering}</p>
                <p>EndTime: {dc.endTimeOfFiltering}</p>
                {/* Render other properties here */}
              </div>
            ))}

            {/* {dcsToShow.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
            {dcsToShow.id} {dcsToShow.startTimeOfFiltering}{" "}
            {dcsToShow.endTimeOfFiltering} */}
            <button onClick={() => setIsOverlayOpen(!isOverlayOpen)}>
              Close Overlay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DCStatistics;
