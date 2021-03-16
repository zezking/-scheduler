import React from "react";
import cx from "classnames";
import "components/InterviewerListItem.scss";
export default function InterviewerListItem(props) {
  const InterviewerListItemClasses = cx({
    interviewers__item: true,
    "interviewers__item--selected": props.selected,
  });
  return (
    <li
      className={InterviewerListItemClasses}
      onClick={() => props.setInterviewer(props.name)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  );
}
