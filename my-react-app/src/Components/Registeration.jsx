import React, { useState, useEffect } from "react";
import "./../CSSfiles/Registeration.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllUsers,
  getAllUltrasonics,
  getAllDcMotors,
  getAllStepperMotors,
  //   getUserById,
  //   getUltrasonicById,
  //   getDcMotorById,
  //   getStepperMotorById,
} from "./../Api";

function Registration() {
  const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [filterDCMotorsID, setFilterDCMotorsID] = useState("");
  const [stepperMotorsID, setStepperMotorsID] = useState("");
  const [ultrasonicSensorsID, setUltrasonicSensorsID] = useState("");

  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  // const [ultrasonics, setUltrasonics] = useState([]);
  // const [dcMotors, setDcMotors] = useState([]);
  // const [stepperMotors, setStepperMotors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await getAllUsers();
        // const responseUltrasonics = await getAllUltrasonics();
        // const responseDcMotors = await getAllDcMotors();
        // const responseStepperMotors = await getAllStepperMotors();

        setUsers(responseUsers.data);
        // setUltrasonics(responseUltrasonics.data);
        // setDcMotors(responseDcMotors.data);
        // setStepperMotors(responseStepperMotors.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  async function handleAdd() {
    try {
      const newData = {
        username: name,
        password: password,
        // filter_dc_motors_id: filterDCMotorsID,
        // stepper_motors_id: stepperMotorsID,
        // ultrasonic_sensors_id: ultrasonicSensorsID,
      };

      await fetch("http://192.168.31.123:8080/user/", {
        // await fetch("http://192.168.220.98:8080/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      //   fetchData();
      setLogin(!login);
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Connection is lost with server!");
    }
  }

  // const [isThere, setIsThere] = useState();

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!name || !password || !retypePassword) {
      alert("Please, fill in all fields!");
    } else {
      if (password == retypePassword) {
        localStorage.setItem("name", JSON.stringify(name));
        localStorage.setItem("password", JSON.stringify(password));

        // console.log(name);
        // console.log(filterDCMotorsID);
        // console.log(stepperMotorsID);
        // console.log(ultrasonicSensorsID);
        // console.log(users.map((user) => user.name));
        // console.log(stepperMotors.map((stepperMotor) => stepperMotor.id));
        // console.log(dcMotors.map((dcMotor) => dcMotor.id));
        // console.log(
        //   "Names of all users:",
        //   ultrasonics.map((ultrasonic) => ultrasonic.id)
        // );

        // check if it is totally exist in db (devices)

        // if (
        //   ultrasonics.every(
        //     (ultrasonic) => ultrasonic.id != ultrasonicSensorsID
        //   )
        // ) {
        //   setIsThere(false);
        //   alert(
        //     "There is no such ultrasonic with id " +
        //       ultrasonicSensorsID +
        //       " in db"
        //   );
        // } else if (
        //   dcMotors.every((dcMotor) => dcMotor.id != filterDCMotorsID)
        // ) {
        //   setIsThere(false);
        //   alert(
        //     "There is no such Dc motor with id " + filterDCMotorsID + " in db"
        //   );
        // } else if (
        //   stepperMotors.every(
        //     (stepperMotor) => stepperMotor.id != stepperMotorsID
        //   )
        // ) {
        //   setIsThere(false);
        //   alert(
        //     "There is no such Stepper motor with id " +
        //       stepperMotorsID +
        //       " in db"
        //   );
        // } else {
        //   setIsThere(true);
        // }

        // check if there is already in db one of these as loggined
        // users.every((user) => user.filter_dc_motors_id != filterDCMotorsID) &&
        //   users.every((user) => user.stepper_motors_id != stepperMotorsID) &&
        //   users.every(
        //     (user) => user.ultrasonic_sensors_id != ultrasonicSensorsID
        // )
        console.log(users[0].username);
        console.log(name);
        if (users.every((user) => user.username != name)) {
          // if (isThere) {
          handleAdd();
          // }
        } else {
          alert("There is already such name, or device in use");
        }
      } else {
        alert("Passwords don't match.");
      }
    }
  }

  function handleClick() {
    setLogin(!login);
  }

  return (
    <div className="register_div">
      <div className="register_container">
        <form onSubmit={handleFormSubmit}>
          <h2>Sign Up</h2>
          <p>
            <input
              type="text"
              id="name"
              placeholder="Enter Full Name"
              name="name"
              onChange={(event) => setName(event.target.value)}
            />
          </p>

          <p>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </p>

          <p>
            <input
              type="password"
              id="password_retype"
              placeholder="Retype password"
              onChange={(event) => setRetypePassword(event.target.value)}
            />
          </p>

          {/* <p>
            <input
              type="number"
              id="filterDCMotorsID"
              placeholder="Enter DC motor ID"
              onChange={(event) => setFilterDCMotorsID(event.target.value)}
            />
          </p>

          <p>
            <input
              type="number"
              id="stepperMotorsID"
              placeholder="Enter Stepper motor ID"
              onChange={(event) => setStepperMotorsID(event.target.value)}
            />
          </p>

          <p>
            <input
              type="number"
              id="ultrasonicSensorsID"
              placeholder="Enter Ultrasonic ID"
              onChange={(event) => setUltrasonicSensorsID(event.target.value)}
            />
          </p> */}

          <div className="submit_div">
            <button type="submit">
              <p>Register</p>
            </button>
            <div>
              <p onClick={handleClick} className="submit_text">
                <Link to="/login">Sign in</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Registration;
