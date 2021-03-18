export function getAppointmentsForDay(state, day) {
  //   const appointmentList = { ...state.appointments };

  //this is the refactored code
  let appointmentForDay = [];
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

  //This is my ugly ass original code
  //   let appointmentForDay = [];
  //   let dayAndAppointments = {};
  //   for (const dayID of daysbyAppintment) {
  //     if (!dayAndAppointments[dayID.name]) {
  //       dayAndAppointments[dayID.name] = dayID.appointments;
  //     }
  //   }
  //   for (const dayOfWeek in dayAndAppointments) {
  //     if (dayOfWeek === day) {
  //       for (const appointmentID of dayAndAppointments[day]) {
  //         appointmentForDay.push(appointmentList[appointmentID]);
  //       }
  //     }
  //   }

  //needs refactored!
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
