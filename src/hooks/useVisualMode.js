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

  const transition = (newMode) => {
    setMode(newMode);
    let newHistory = [...history];
    newHistory = [...history, newMode];
    setHistory(newHistory);
  };
  const back = () => {
    history.pop();
    setMode(history[history.length - 1]);
  };
  return { mode, transition, back };
}
