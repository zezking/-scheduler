import cx from "classnames";

export default function InterviewerListItem(props) {
  const InterviewerListItem = cx({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });
  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      props.name
    </li>
  );
}
