"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initialState = { from: null, to: null };

function ReservationProvider({ children }) {
  let [range, setRange] = useState(initialState);
  function resetRange() {
    setRange(initialState);
  }
  range = range || { from: null, to: null };

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
