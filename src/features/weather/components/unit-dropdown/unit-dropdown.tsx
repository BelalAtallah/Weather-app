import React from "react";
import { WeatherUnit } from "../../models";
import "./unit-dropdown.css";

interface UnitDropdownProps {
  unit: WeatherUnit;
  onUnitChange: (unit: WeatherUnit) => void;
}

export const UnitDropdown: React.FC<UnitDropdownProps> = ({
  unit,
  onUnitChange,
}) => {
  const handleSetUnit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onUnitChange(event.target.value as WeatherUnit);
  };

  return (
    <div className="select-container">
      <select value={unit} onChange={handleSetUnit}>
        <option value="metric">Celsius</option>
        <option value="imperial">Fahrenheit</option>
      </select>
    </div>
  );
};
