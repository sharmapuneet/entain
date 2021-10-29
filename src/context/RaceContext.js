import React, { useState, createContext, useEffect, useMemo } from "react";

// Function to fetch data, sort it and filter out items that are already passed the time.
const fetchData = (setRaceDetails) => {
  fetch("https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10")
    .then((res) => res.json())
    .then((data) => { 
      setRaceDetails(Object.keys(data.data.race_summaries).map(key => {
        return data.data.race_summaries[key];
      }).sort((x, y) => x.advertised_start.seconds - y.advertised_start.seconds).filter((item) => {
        return Math.floor(new Date().getTime()/1000) < item.advertised_start.seconds + 60
      }))
    }).catch((err) => console.log(err));
}

// Race Context.
export const RaceContext = createContext([]);

// Context Provider for Race data.
export const RaceProvider = ({ children }) => {
  const [raceDetails, setRaceDetails] = useState([]);

  // Memoized race data.
  const value = useMemo(() => raceDetails, [raceDetails]);

  useEffect(() => {
    // Initial sorted fetch of data from API.
    fetchData(setRaceDetails);

    // Removal of race items which are already passed 1 minute of their start time.
    const intervalId = setInterval(() => { 
      fetchData(setRaceDetails);
    }, 10000);

    return () => clearInterval(intervalId); //This is important

  }, []);

  return <RaceContext.Provider value={value}>{children}</RaceContext.Provider>;
};
