import React, { useState } from "react";

export default function Select({ options, onChange, className }) {
  const [selectedValue, setSelectedValue] = useState(options[0]?.value || "");

  function handleChange(e) {
    setSelectedValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <select value={selectedValue} onChange={handleChange} className={className}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
