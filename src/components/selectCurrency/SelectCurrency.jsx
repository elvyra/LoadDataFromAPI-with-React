import React from "react";

export default function SelectCurrency({ currencies, active, handleChange }) {
  let Options = currencies
    ? Object.keys(currencies).map(key => (
        <option key={key} value={key}>
          {currencies[key]} ({key})
        </option>
      ))
    : null;

  return (
    <select defaultValue="none" onChange={e => handleChange(e.target.value)}>
      <option key="none" value="none" disabled>
        Select currency convert to
      </option>
      {Options}
    </select>
  );
}
