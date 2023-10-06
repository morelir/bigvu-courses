import React, { useState } from "react";

const CourseContext = React.createContext({
  courses: [],
  playingPosition: {},
  savePlayingTimePosition: (courseId, chapterId, timeLeft) => {},
  getChapterId: (courseId) => {},
  getTimestamp: (courseId, chapterId) => {},
  coursesFinishedChapters: {},
  saveFinishedChapters: (courseId, chapterId) => {},
  finishedCourses: {},
  saveFinishedCourses: (courseId) => {},
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

// const finishedAllChapters = {
//   123:true,
//   124: false,
// };

const retrieveStoredPlayingPosition = () => {
  const playingData = localStorage.getItem("playingPosition");
  if (playingData) return JSON.parse(playingData);
  else return {};
};

const retrieveStoredCoursesFinishedChapters = () => {
  const coursesFinishedChapters = localStorage.getItem(
    "coursesFinishedChapters"
  );
  if (coursesFinishedChapters) return JSON.parse(coursesFinishedChapters);
  else return {};
};

const retrieveStoredFinishedCourses = () => {
  const finishedCourses = localStorage.getItem("finishedCourses");
  if (finishedCourses) return JSON.parse(finishedCourses);
  else return {};
};

export const CourseContextProvider = (props) => {
  const [playingPosition, setPlayingPosition] = useState(
    retrieveStoredPlayingPosition()
  );

  const [coursesFinishedChapters, setCoursesFinishedChapters] = useState(
    retrieveStoredCoursesFinishedChapters()
  );

  const [finishedCourses, setFinishedCourses] = useState(
    retrieveStoredFinishedCourses()
  );

  const [courses,setCourses] = useState([]);

  const saveCourse = (course) => {
    setCourses((prev)=> [...prev,course])
  };

  // Function get 3 params: chapterId, chapterId, timeLeft
  // Creating a new playing position object with new courseId key that inside it a chapterId key set to TIME LEFT of the chapter.
  // Saving the new playing position object on the local storage.
  const savePlayingTimePosition = (courseId, chapterId, timeLeft) => {
    const newPlayingPosition = {
      ...playingPosition,
      [courseId]: { [chapterId]: timeLeft },
    };

    localStorage.removeItem("playingPosition");
    localStorage.setItem("playingPosition", JSON.stringify(newPlayingPosition));
    setPlayingPosition(newPlayingPosition);
  };

  // Function get chapterId param
  // IF there is in playingPosition object a course ID key, return course ID
  // ELSE return false.
  const getChapterId = (courseId) => {
    if (playingPosition && playingPosition[courseId]) {
      return Object.keys(playingPosition[courseId])[0];
    }
    return false;
  };

  // Function get 3 params: courseId, chapterId, duration
  // IF there is in playingPosition object a chapter ID, return duration-playingPosition
  // ELSE return false.
  const getTimestamp = (courseId, chapterId, duration) => {
    if (playingPosition[courseId]?.[chapterId] >= 0) {
      return duration - playingPosition[courseId][chapterId];
    }
    return false;
  };

  // Function get 2 params: chapterId, chapterId
  // Creating a new Courses finished chapters object with new courseId key that inside it a chapterId key set to TRUE.
  // Saving the new Courses finished chapters object on the local storage.
  const saveFinishedChapters = (courseId, chapterId) => {
    const newCoursesFinishedChapters = {
      ...coursesFinishedChapters,
      [courseId]: { ...coursesFinishedChapters[courseId], [chapterId]: true },
    };

    localStorage.removeItem("coursesFinishedChapters");
    localStorage.setItem(
      "coursesFinishedChapters",
      JSON.stringify(newCoursesFinishedChapters)
    );
    setCoursesFinishedChapters(newCoursesFinishedChapters);
  };

  // Function get courseId param.
  // Creating a new finished courses object with new courseId key set to TRUE.
  // Saving the new Courses finished chapters object on the local storage.
  const saveFinishedCourses = (courseId) => {
    const newFinishedCourses = {
      ...finishedCourses,
      [courseId]: true,
    };
    localStorage.removeItem("finishedCourses");
    localStorage.setItem("finishedCourses", JSON.stringify(newFinishedCourses));
    setFinishedCourses(newFinishedCourses);
  };

  const contextValue = {
    playingPosition,
    savePlayingTimePosition,
    getChapterId,
    getTimestamp,
    coursesFinishedChapters,
    saveFinishedChapters,
    finishedCourses,
    saveFinishedCourses,
    courses,
    saveCourse,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
