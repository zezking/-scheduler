import { useState, useEffect } from "react";

export function useVisualMode(initial) {
  //My attempt-------------------
  //   const [mode, setMode] = useState("FIRST");
  //   return {
  //     mode,
  //   };
  //The actual answer

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, history) => {
    setMode(newMode);
    setHistory(history);
  };
  const back = () => {
    history.pop();
    setMode(history);
  };

  return { mode, transition, back };
}
