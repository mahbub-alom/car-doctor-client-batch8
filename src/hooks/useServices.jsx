import axios from "axios";
import React, { useState } from "react";

const useServices = () => {
  const [services, setServices] = useState([]);

  axios.get("https://car-doctor-server-batch8.onrender.com/services").then((res) => {
    setServices(res.data);
  });
  return services;
};

export default useServices;
