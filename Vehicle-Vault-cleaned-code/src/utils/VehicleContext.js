import React, { createContext, useContext, useState } from "react";

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        setVehicles,
        selectedVehicleId,
        setSelectedVehicleId,
        selectedVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicleContext = () => useContext(VehicleContext);
