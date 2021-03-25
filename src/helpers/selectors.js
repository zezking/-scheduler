//Get the appointments for a specific day
export function getAppointmentsForDay(state, day) {
  let appointmentForDay = [];

  if (!state.days) {
    return appointmentForDay;
  }
  const filteredDay = state.days.filter((index) => index.name === day);
  if (!filteredDay) {
    return appointmentForDay;
  }

  if (filteredDay.length > 0) {
    filteredDay[0].appointments.map((id) => {
      return appointmentForDay.push(state.appointments[id]);
    });
  }

  return appointmentForDay;
}
//Get the inerviewer and student for a specific appointment
export function getInterview(state, interview) {
  const interviewersList = { ...state.interviewers };
  let studentAndInterviewer = {};
  if (!interview) {
    return null;
  }

  if (!studentAndInterviewer.student) {
    studentAndInterviewer.student = interview.student;
    studentAndInterviewer.interviewer = interviewersList[interview.interviewer];
  }
  return studentAndInterviewer;
}
//get all the interviewers for the day
export function getInterviewersForDay(state, day) {
  let interviewersForDay = [];
  const filteredDay = state.days.filter((index) => index.name === day);
  if (!filteredDay) {
    return interviewersForDay;
  }
  if (filteredDay.length > 0) {
    filteredDay[0].interviewers.map((interviewer) => {
      return interviewersForDay.push(state.interviewers[interviewer]);
    });
  }

  return interviewersForDay;
}
