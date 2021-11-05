import React from "react";

import "./styles.scss";

const CustomInput = ({
  label,
  type,
  name,
  field,
  form,
  placeholder,
  onchange,
  classes,
}) => {
  return (
    <fieldset className={classes}>
      {label && <label>{label}</label>}
      <input
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          form.setFieldValue(field.name, e.target.value);
          onchange();
        }}
      />
    </fieldset>
  );
};

export default CustomInput;
