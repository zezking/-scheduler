import useVisualMode from "hooks/useVisualMode";
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "Sorry Error Saving";
const ERROR_DELETE = "Sorry Error Deleting";

const deleteMsg = "Are you sure you want to delete?";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //save appointment
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((err) => {
        console.log(err);
        transition(ERROR_SAVE);
      });
  };

  //delete appointment
  const cancel = () => {
    transition(CONFIRM, true);
    transition(DELETING);
    props
      .onDelete(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        console.log(err);
        transition(ERROR_DELETE);
      });
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {
            transition(CONFIRM);
          }}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === ERROR_SAVE && <Error message={ERROR_SAVE} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={ERROR_DELETE} onClose={back} />}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={cancel} message={deleteMsg} />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
}
