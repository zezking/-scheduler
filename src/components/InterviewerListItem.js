import React from "react";
import cx from "classnames";
import "components/InterviewerListItem.scss";
export default function InterviewerListItem(props) {
  console.log(props);
  const InterviewerListItemClasses = cx({
    interviewers__item: true,
    "interviewers__item--selected": props.selected,
  });
  return (
    <li className={InterviewerListItemClasses} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
