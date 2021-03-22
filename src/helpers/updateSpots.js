const getAvailableInterviewsForDay = (dayObj, appointments) => {
  let count = 0;

  dayObj[0].appointments.map((appoinmentID) => {
    const appointment = appointments[appoinmentID];

    if (!appointment.interview) {
      count++;
    }
  });
  return count;
};
export default function updateSpots(dayName, days, appointments) {
  const day = days.filter((dayID) => dayID.name === dayName);

  const availableInterviews = getAvailableInterviewsForDay(day, appointments);

  const result = days.map((index) => {
    if (index.name === dayName) {
      return { ...index, spots: availableInterviews };
    }
    return index;
  });
  return result;
}