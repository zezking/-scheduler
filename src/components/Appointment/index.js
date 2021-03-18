import useVisualMode from "hooks/useVisualMode";
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);
export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview &&
        useVisualMode(
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
          />
        ) &&
        useVisualMode(<Empty />)}
    </article>
  );
}
