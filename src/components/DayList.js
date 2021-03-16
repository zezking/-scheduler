import React from "react";
import DayListItem from "components/DayListItem";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function DayList(props) {
  const day = props.days
    ? props.days.map((day, index) => {
        return (
          <DayListItem
            key={index}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={props.setDay}
          />
        );
      })
    : "no days available";

  return <ul>{day}</ul>;
}
// return (
//   <ul>
//     {days.map((day, index) => {
//       <DayListItem
//         key={index}
//         name={day.name}
//         spots={day.spots}
//         selected={day.name === props.day}
//         setDay={props.setDay}
//       />;
//     })}
//   </ul>
// );
