export function getAppointmentsForDay(state, day) {
  const daysbyAppintment = [...state.days];
  const appointmentList = { ...state.appointments };

  let appointmentForDay = [];
  let dayAndAppointments = {};
  for (const dayID of daysbyAppintment) {
    if (!dayAndAppointments[dayID.name]) {
      dayAndAppointments[dayID.name] = dayID.appointments;
    }
  }
  for (const dayOfWeek in dayAndAppointments) {
    if (dayOfWeek === day) {
      for (const appointmentID of dayAndAppointments[day]) {
        appointmentForDay.push(appointmentList[appointmentID]);
      }
    }
  }

  return appointmentForDay;
}
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
