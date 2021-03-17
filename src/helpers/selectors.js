export function getAppointmentsForDay(state, day) {
  let appointmentForDay = [];

  //   appointmentsNumbersByTheDay={state.days}
  let daysbyAppintment = [...state.days];
  let appointmentDetails = { ...state.appointments };
  let dayAndAppointments = {};
  for (const dayID of daysbyAppintment) {
    if (!dayAndAppointments[dayID.name]) {
      dayAndAppointments[dayID.name] = dayID.appointments;
    }
  }
  for (const dayOfWeek in dayAndAppointments) {
    if (dayOfWeek === day) {
      for (const appointmentID of dayAndAppointments[day]) {
        appointmentForDay.push(appointmentDetails[appointmentID]);
      }
    }
  }

  return appointmentForDay;
}
