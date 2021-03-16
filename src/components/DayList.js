import React from "react";
import DayListItem from "components/DayListItem";

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
