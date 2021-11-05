import React from "react";
import "./styles.scss";

const Button = ({
  href,
  color,
  outline,
  reversed,
  classes,
  style,
  target,
  type,
  onclick,
  disabled,
  icon,
  value,
}) => {
  const Tag = href ? "a" : "button";

  return (
    <Tag
      className={`button ${color ? `button-${color}` : ""} ${
        outline ? `button-${color}-outline` : ""
      } ${reversed ? `button-reversed` : ""} ${classes ? classes : ""}`.trim()}
      href={href}
      style={style}
      target={target}
      type={type}
      onClick={(e) => onclick && onclick(e)}
      disabled={disabled}>
      {icon && <ButtonIcon children={icon} />}
      {value}
    </Tag>
  );
};

const ButtonIcon = ({ children }) => (
  <span className="button-icon">{children}</span>
);

export default Button;
