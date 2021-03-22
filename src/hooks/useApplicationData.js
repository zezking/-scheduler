import { useEffect, useReducer } from "react";
import axios from "axios";

const URLs = {
  GET_DAYS: "http://localhost:8001/api/days",
  GET_APPOINTMENTS: "http://localhost:8001/api/appointments",
  GET_INTERVIEWERS: "http://localhost:8001/api/interviewers",
};
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const initialState = {
  day: "Monday",
  days: [],
  appointments: [],
  interviewers: [],
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

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    case SET_INTERVIEW: {
      return {
        ...state,
        appointments: action.appoinments,
        days: action.days,
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  //set the current day when use selected
  const setDay = (day) => dispatch({ type: "SET_DAY", day });

  //fetch data from APIs
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(URLs.GET_DAYS)),
      Promise.resolve(axios.get(URLs.GET_APPOINTMENTS)),
      Promise.resolve(axios.get(URLs.GET_INTERVIEWERS)),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      dispatch({
        type: SET_APPLICATION_DATA,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      });
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
        dispatch({ type: "SET_INTERVIEW", appointments, days });
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
      .then(dispatch({ type: "SET_INTERVIEW", appointments, days }));
  };

  return { state, setDay, bookInterview, cancelInterview };
}
