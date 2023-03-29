import React, { useState, useEffect, useCallback } from "react";

const CourseContext = React.createContext({
  playingPosition: {},
  savePlayingTimePosition: (courseId, chapterId, timeLeft) => {},
  getChapterId: (courseId) => {},
  getTimeStamp: (courseId, chapterId) => {},
});

// const p = {
//   123: {
//     23: 52444,
//   },
//   124: {
//     24: 6666,
//   },
// };

const retrieveStoredPlayingData = () => {
  const playingData = localStorage.getItem("playingPosition");

  return playingData;
};

export const CourseContextProvider = (props) => {
  const playingData = retrieveStoredPlayingData();
  let initialPlayingData = {};
  if (playingData) {
    initialPlayingData = JSON.parse(playingData);
  }
  const [playingPosition, setPlayingPosition] = useState(initialPlayingData);

  // useEffect(() => {}, []);

  const savePlayingTimePosition = (courseId, chapterId, timeLeft) => {
    console.log(playingPosition);
    const newPlayingPosition = {
      ...playingPosition,
      [courseId]: { [chapterId]: timeLeft },
    };
    console.log(newPlayingPosition);

    localStorage.removeItem("playingPosition");
    localStorage.setItem("playingPosition", JSON.stringify(newPlayingPosition));

    setPlayingPosition(newPlayingPosition);
  };

  const getChapterId = (courseId) => {
    console.log(1);
    if (playingPosition && playingPosition[courseId]) {
      return Object.keys(playingPosition[courseId])[0];
    }
    return false;
  };

  const getTimeStamp =(courseId, chapterId, duration) => {
    console.log(2);
    if (playingPosition[courseId]?.[chapterId] >= 0) {
      return duration - playingPosition[courseId][chapterId];
    }
    return false;
  };

  const contextValue = {
    playingPosition,
    savePlayingTimePosition,
    getChapterId,
    getTimeStamp,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
