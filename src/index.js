import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";
import DayListItem from "components/DayListItem";
import InterviewerListItem from "components/InterviewerListItem";

ReactDOM.render(
  <div>
    <Application />
    <DayListItem />
    <InterviewerListItem />
  </div>,
  document.getElementById("root")
);
