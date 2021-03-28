import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "index.scss";

import Application from "components/Application";
import DayListItem from "components/DayListItem";
import InterviewerListItem from "components/InterviewerListItem";

//load APIs from database URLs
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

ReactDOM.render(
  <div>
    <Application />
    <DayListItem />
    <InterviewerListItem />
  </div>,
  document.getElementById("root")
);
