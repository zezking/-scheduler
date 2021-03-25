import React from "react";
import "components/Button.scss";
import cx from "classnames";

export default function Button(props) {
  let buttonClasses = cx({
    button: true,
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClasses}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
