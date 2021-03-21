import { useEffect, useState } from "react";
import axios from "axios";

const URLs = {
  GET_DAYS: "http://localhost:8001/api/days",
  GET_APPOINTMENTS: "http://localhost:8001/api/appointments",
  GET_INTERVIEWERS: "http://localhost:8001/api/interviewers",
};
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {};
      case SET_APPLICATION_DATA:
        return {};
      case SET_INTERVIEW: {
        return;
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const setDay = (day) => setState({ ...state, day });
  //fetch data from APIs
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(URLs.GET_DAYS)),
      Promise.resolve(axios.get(URLs.GET_APPOINTMENTS)),
      Promise.resolve(axios.get(URLs.GET_INTERVIEWERS)),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  //get appoinments and interviewers by day
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state.day, state.days, appointments);
    return axios
      .put(`${URLs.GET_APPOINTMENTS}/${id}`, appointment)
      .then((res) => {
        console.log("book interview", days);
        setState((prev) => ({
          ...prev,
          days,
          appointments,
        }));
      });
  };

  //delete the appointment
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = updateSpots(state.day, state.days, appointments);
    return axios
      .delete(`${URLs.GET_APPOINTMENTS}/${id}`, appointment)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          days,
          appointments,
        }));
      });
  };

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

  const updateSpots = function (dayName, days, appointments) {
    const day = days.filter((dayID) => dayID.name === dayName);

    const availableInterviews = getAvailableInterviewsForDay(day, appointments);

    const result = days.map((index) => {
      if (index.name === dayName) {
        return { ...index, spots: availableInterviews };
      }
      return index;
    });
    return result;
  };

  return { state, setDay, bookInterview, cancelInterview };
}
