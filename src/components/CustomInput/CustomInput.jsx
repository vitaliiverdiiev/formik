import React from "react";

import "./styles.scss";

const CustomInput = ({ label, type, name, field, placeholder, onchange }) => {
  const handleChange = (ev) => {
    onchange?.(ev.target.value);
  };

  return (
    <fieldset>
      {label && <label>{label}</label>}
      <input
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        {...field}
      />
    </fieldset>
  );
};

export default CustomInput;
