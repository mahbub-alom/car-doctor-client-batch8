import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import axios from "axios";
import useServices from "../../../hooks/useServices";

const Services = () => {
  // const [services, setServices] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://car-doctor-server-batch8.onrender.com/services")
  //     .then((data) => {
  //       setServices(data.data);
  //     });
  //   // fetch("https://car-doctor-server-batch8.onrender.com/services")
  //   //   .then((res) => res.json())
  //   //   .then((data) => setServices(data));
  // }, []);

  const services=useServices();

  return (
    <div className="mt-4">
      <div className="text-center space-y-3">
        <h1 className="text-xl text-orange-400">Service</h1>
        <h1 className="text-4xl">Our Service Area</h1>
        <p>
          the majority have suffered alteration in some form, by injected
          humour, or randomised <br /> words which don't look even slightly
          believable.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
