import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewer = props.interviewers
    ? props.interviewers.map((interviewer, index) => {
        return (
          <InterviewerListItem
            key={index}
            name={interviewer.name}
            avatar={interviewer.avatar}
            setInterviewer={props.setInterviewer}
          />
        );
      })
    : "no interview available";

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{interviewer}</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}
