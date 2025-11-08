import React, { createContext, useState } from "react";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [showOil, setShowOil] = useState(true);
  const [showFilter, setShowFilter] = useState(true);
  const [showTires, setShowTires] = useState(true);
  const [showTimingBelt, setShowTimingBelt] = useState(true);
  const [showSparkPlugs, setShowSparkPlugs] = useState(true);
  const [showTransFluid, setShowTransFluid] = useState(true);
  const [showCoolant, setShowCoolant] = useState(true);
  const [showBattery, setShowBattery] = useState(true);
  const [showBrakePads, setShowBrakePads] = useState(true);

  return (
		<FilterContext.Provider
			value={{
				showOil,
				setShowOil,
				showFilter,
				setShowFilter,
				showTires,
				setShowTires,
				showTimingBelt,
				setShowTimingBelt,
				showSparkPlugs,
				setShowSparkPlugs,
				showTransFluid,
				setShowTransFluid,
				showCoolant,
				setShowCoolant,
				showBattery,
				setShowBattery,
				showBrakePads,
				setShowBrakePads,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
}