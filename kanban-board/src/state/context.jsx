import React, { createContext, useState, useEffect } from "react";
import filter from "../utils/filters";

// Set up initial display state
const initialDisplayState = {
  grouping: "status",
  ordering: "priority",
};

// Create the context for your application
export const AppContext = createContext({
  data: null,
  setData: () => null,
  dataToRender: null,
  setDataToRender: () => null,
  displayState: initialDisplayState,
  setDisplayState: () => null,
});

// AppProvider component to manage state and provide context
const LOCAL_STORAGE_KEY = "displayState";

const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [dataToRender, setDataToRender] = useState(null);
  const [displayState, setDisplayState] = useState(() => {
    const storedDisplayState = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedDisplayState
      ? JSON.parse(storedDisplayState)
      : initialDisplayState;
  });

  const value = {
    data,
    setData,
    dataToRender,
    setDataToRender,
    displayState,
    setDisplayState,
  };

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Store the display state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(displayState));
  }, [displayState]);

  // Filter data when either data or displayState changes
  useEffect(() => {
    setDataToRender(data && filter(data, displayState));
  }, [data, displayState]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
