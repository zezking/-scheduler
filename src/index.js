import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
ReactDOM.render(
  <div>
    <Application />
    <DayListItem />
  </div>,
  document.getElementById("root")
);
