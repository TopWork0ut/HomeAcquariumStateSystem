import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { useSpring } from "react-spring";
import "./../App.css";
import Acquarium from "./../Components/Acquarium";
import { useParams } from "react-router-dom";

function Home({ id }) {
  const [data, setData] = useState([]);

  // user from login
  const loginId = id;
  // const { id } = useParams();
  // const loginId = id.slice(1);
  //   console.log(loginId);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://192.168.31.123:8080/ultrasonic/data/"
      );
      // const response = await fetch("http://192.168.220.98:8080/ultrasonic/");
      const data = await response.json();
      setData(data);
      //   console.log("Data");
      //   console.log(data[data.length - 1].distance);
    } catch (error) {
      console.error(error);
    }
    return data;
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  // `http://192.168.220.98/filter?value=${value}`,
  // `http://192.168.31.233/filter?value=${value}`,
  const [filtering, setFiltering] = useState(0);
  const handleClickFilter = async (value) => {
    try {
      const response = await axios.post(
        `http://192.168.31.233/filter?value=${value}`,
        { value: value },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Data sent successfully!");
      console.log(value);
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }

    if (value == 1 && filtering != 1) {
      try {
        const response = await axios.post(
          `http://192.168.31.123:8080/dc_motor/data/`,
          { dcMotorId: 3 },
          { headers: { "Content-Type": "application/json" } }
        );
        setFiltering(1);
        console.log("Data sent successfully!");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    } else if (value == 0 && filtering != 0) {
      try {
        const response = await axios.put(
          `http://192.168.31.123:8080/dc_motor/data/endDate/`,
          // { dcMotorId: 3 },
          { headers: { "Content-Type": "application/json" } }
        );
        setFiltering(0);
        console.log("Data sent successfully!");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  // const response = await axios.post(`http://192.168.31.233/feeder`, {
  // const response = await axios.post(`http://192.168.220.98/feeder`, {
  const handleClickFeeder = async () => {
    try {
      const response = await axios.post(`http://192.168.31.233/feeder`, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }

    try {
      const response = await axios.post(
        `http://192.168.31.123:8080/stepper_motor/data/`,
        { motorId: 1 },
        { headers: { "Content-Type": "application/json" } }
      );
      setFiltering(1);
      console.log("Data sent successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  return (
    <Container className="main">
      <Acquarium data={data} />
      <Container className="buttonContainer">
        <Button
          style={{ "--content": "'Filter me'" }}
          id="buttonTurnON"
          className="filteringButtons"
          onClick={() => handleClickFilter("1")}>
          <div class="left"></div>
          Filter me
          <div class="right"></div>
        </Button>
        <Button
          style={{ "--content": "'Stop Filtering!'" }}
          id="buttonTurnOFF"
          className="filteringButtons"
          onClick={() => handleClickFilter("0")}>
          <div class="left"></div>
          Stop Filtering!
          <div class="right"></div>
        </Button>
        <Button
          className="btnWithoutBubbles"
          style={{ "--content": "'Feed my pet" }}
          onClick={handleClickFeeder}>
          <div class="left"></div>
          Feed my pet
          <div class="right"></div>
        </Button>
      </Container>
      {/* <Container id="dataContainer">
        <Button
          id="dataDiagramBTN"
          className="btnWithoutBubbles"
          style={{ "--content": "'Data diagrams" }}>
          <Link to={`/data/:${loginId}`} style={{ textDecoration: "none" }}>
            <div class="left"></div>
            <p id="dataDiagram">Data diagrams</p>
            <div class="right"></div>
          </Link>
        </Button>
      </Container> */}
    </Container>
  );
}

export default Home;
