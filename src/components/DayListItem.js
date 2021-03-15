import React from "react";

export default function DayListItem(props) {
  return (
    <li>
      <h2 className="text--regular">props.names</h2>
      <h3 className="text--light">props.spots</h3>
    </li>
  );
}
