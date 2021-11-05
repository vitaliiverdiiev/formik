import React, { useState } from "react";
import classNames from "classnames";

import "./styles.scss";

const Input = ({
  classes,
  disabled,
  name,
  placeholder,
  required,
  type,
  value,
  label,
  icon,
  onblur,
  onchange,
  reverse,
  warning,
  field,
}) => {
  const [inputValue, setInputValue] = useState("");

  const onChangeHandler = (e) => setInputValue(e.target.value);

  const inputClasses = classNames("fh-input", classes, {
    "fh-input-warning": warning,
    "fh-input-disabled": disabled,
  });

  const iconClasses = classNames({
    "fh-input-icon": icon,
    "fh-input-icon-reverse": reverse,
  });

  return (
    <div className={inputClasses}>
      {label && (
        <label className="fh-input-label">
          {label} {required && <span className="fh-input-required">*</span>}
        </label>
      )}
      <div className="fh-input-container">
        {icon && <span className={iconClasses}>{icon}</span>}
        <input
          className="fh-input-field"
          type={type ? type : "text"}
          name={name}
          placeholder={placeholder}
          value={value ? value : inputValue}
          onChange={(e) => (onchange ? onchange(e) : onChangeHandler(e))}
          onBlur={(e) => onblur && onblur(e)}
          required={required}
          disabled={disabled}
          {...field}
        />
      </div>
      {warning && (
        <span className="fh-input-error-message">
          {warning !== ("" || true) ? warning : "Text error message"}
        </span>
      )}
    </div>
  );
};

export default Input;
