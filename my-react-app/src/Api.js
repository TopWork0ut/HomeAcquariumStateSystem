import axios from "axios";

export const getAllUsers = async () => {
  return await axios.get("http://192.168.88.8:8080/user/");
  // return await axios.get("http://192.168.220.98:8080/user/");
};

export const getAllUltrasonics = async () => {
  return await axios.get("http://192.168.88.8:8080/ultrasonic/");
  // return await axios.get("http://192.168.220.98:8080/ultrasonic/");
};

export const getAllDcMotors = async () => {
  return await axios.get("http://192.168.88.8:8080/dc_motor/");
  // return await axios.get("http://192.168.220.98:8080/filter_dc_motor/");
};

export const getAllStepperMotors = async () => {
  return await axios.get("http://192.168.88.8:8080/stepper_motor/");
  // return await axios.get("http://192.168.220.98:8080/stepper_motor/");
};

// export const getSortedHotels = async (typeOfSorting, typeOfDirection) => {
//   return (
//     await axios.get("http://localhost:8080/hotels/sort/", {
//       params: {
//         typeOfSorting: typeOfSorting,
//         typeOfDirection: typeOfDirection,
//       },
//     })
//   ).data;
// };

// export const getHotelsByPlace = async (place) => {
//   return (
//     await axios.get("http://localhost:8080/hotels/sort-by-place/", {
//       params: { place: place },
//     })
//   ).data;
// };

export const getAllDcMotorsDataByID = async (id) => {
  return await axios.get(
    "http://192.168.88.8:8080/dc_motor/data/connected/" + id
  );
};

export const getAllSteppersDataByID = async (id) => {
  return await axios.get(
    "http://192.168.88.8:8080/stepper_motor/data/connected/" + id
  );
};

export const getAllUltrasonicsDataByID = async (id) => {
  return await axios.get(
    "http://192.168.88.8:8080/ultrasonic/data/connected/" + id
  );
};

export const getUserById = async (id) => {
  return (await axios.get("http://192.168.88.8:8080/user/" + id)).data;
  // return (await axios.get("http://192.168.220.98:8080/user/" + id)).data;
};

export const getUltrasonicById = async (id) => {
  return (await axios.get("http://192.168.88.8:8080/ultrasonic/" + id)).data;
  // return (await axios.get("http://192.168.220.98:8080/ultrasonic/" + id)).data;
};

export const getDcMotorById = async (id) => {
  return (await axios.get("http://192.168.88.8:8080/dc_motor/" + id)).data;
  // return (await axios.get("http://192.168.220.98:8080/filter_dc_motor/" + id))
  // .data;
};

export const getStepperMotorById = async (id) => {
  return (await axios.get("http://192.168.88.8:8080/stepper_motor/" + id)).data;
  // return (await axios.get("http://192.168.220.98:8080/stepper_motor/" + id))
  // .data;
};

export const updateDcMotorById = async (moduleId) => {
  try {
    let newData = {
      userId: null,
    };
    // await deleteDCById(moduleId); // Call the API function to delete the module by ID
    await fetch(`http://192.168.88.8:8080/dc_motor/${moduleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    // setDCMotorsOfUser(dcMotorsOfUser.filter((dc) => dc.id !== moduleId));
  } catch (error) {
    console.error("Error deleting module:", error);
  }
};

export const updateStepperMotorById = async (moduleId) => {
  try {
    let newData = {
      userId: null,
    };

    await fetch(`http://192.168.88.8:8080/stepper_motor/${moduleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
  } catch (error) {
    console.error("Error deleting module:", error);
  }
};

export const updateUltrasonicById = async (moduleId) => {
  try {
    let newData = {
      userId: null,
    };

    await fetch(`http://192.168.88.8:8080/ultrasonic/${moduleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
  } catch (error) {
    console.error("Error deleting module:", error);
  }
};

export const addDcMotorUserIDByDCId = async (moduleId, userId) => {
  try {
    let newData = {
      userId: userId,
    };
    console.log(moduleId);
    // await deleteDCById(moduleId); // Call the API function to delete the module by ID
    await fetch(`http://192.168.88.8:8080/dc_motor/${moduleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    // setDCMotorsOfUser(dcMotorsOfUser.filter((dc) => dc.id !== moduleId));
  } catch (error) {
    console.error("Error deleting module:", error);
  }
};

export const addStepperMotorUserIDByStepperId = async (moduleId, userId) => {
  try {
    let newData = {
      userId: userId,
    };

    await fetch(`http://192.168.88.8:8080/stepper_motor/${moduleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
  } catch (error) {
    console.error("Error deleting module:", error);
  }
};

export const addUltrasonicUserIDByDCId = async (moduleId, userId) => {
  try {
    let newData = {
      userId: userId,
    };
    // await deleteDCById(moduleId); // Call the API function to delete the module by ID
    await fetch(`http://192.168.88.8:8080/ultrasonic/${moduleId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    // setDCMotorsOfUser(dcMotorsOfUser.filter((dc) => dc.id !== moduleId));
  } catch (error) {
    console.error("Error deleting module:", error);
  }
};

//admin

export const deleteDCById = async (id) => {
  return (await axios.delete("http://192.168.88.8:8080/dc_motor/" + id)).data;
  // return (await axios.get("http://192.168.220.98:8080/user/" + id)).data;
};
