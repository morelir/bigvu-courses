import React, { useState, useEffect, useCallback } from "react";

const CourseContext = React.createContext({
  playingPosition: {},
  savePlayingTimePosition: (courseId, chapterId, timeLeft) => {},
  getChapterId: (courseId) => {},
  getTimestamp: (courseId, chapterId) => {},
  finishedChapters:{},
  saveFinishedChapters: (courseId, chapterId) => {},
  getFinishedChapters: (courseId) => {},
});

// const p = {
//   123: {
//     23: 52444,
//   },
//   124: {
//     24: 6666,
//   },
// };

// const finishedChapter = {
//   123:{
//        23:true,
//        12:true
//   },
//   124: {
//        23:true,
//        12:true
//   },
// };

const retrieveStoredPlayingPosition = () => {
  const playingData = localStorage.getItem("playingPosition");
  if (playingData) return JSON.parse(playingData);
  else return {};
};

const retrieveStoredCoursesFinishedChapters = () => {
  const coursesFinishedChapters = localStorage.getItem("coursesFinishedChapters");
  if (coursesFinishedChapters) return JSON.parse(coursesFinishedChapters);
  else return {};
};

export const CourseContextProvider = (props) => {
  const [playingPosition, setPlayingPosition] = useState(
    retrieveStoredPlayingPosition()
  );

  const [coursesFinishedChapters, setCoursesFinishedChapters] = useState(
    retrieveStoredCoursesFinishedChapters()
  );

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

  const getTimestamp = (courseId, chapterId, duration) => {
    console.log(2);
    if (playingPosition[courseId]?.[chapterId] >= 0) {
      return duration - playingPosition[courseId][chapterId];
    }
    return false;
  };

  const saveFinishedChapters = (courseId, chapterId) => {
    console.log(coursesFinishedChapters);
    const newCoursesFinishedChapters = {
      ...coursesFinishedChapters,
      [courseId]: { ...coursesFinishedChapters[courseId], [chapterId]: true },
    };
    console.log(newCoursesFinishedChapters);

    localStorage.removeItem("coursesFinishedChapters");
    localStorage.setItem(
      "coursesFinishedChapters",
      JSON.stringify(newCoursesFinishedChapters)
    );

    setCoursesFinishedChapters(newCoursesFinishedChapters);
  };



  const contextValue = {
    playingPosition,
    savePlayingTimePosition,
    getChapterId,
    getTimestamp,
    coursesFinishedChapters,
    saveFinishedChapters,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
