import React, { useState} from "react";

const CourseContext = React.createContext({
  playingPosition: {},
  savePlayingTimePosition: (courseId, chapterId, timeLeft) => {},
  getChapterId: (courseId) => {},
  getTimestamp: (courseId, chapterId) => {},
  coursesFinishedChapters:{},
  saveFinishedChapters: (courseId, chapterId) => {},
  finishedCourses:{},
  saveFinishedCourses:(courseId) => {},
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
  const coursesFinishedChapters = localStorage.getItem("coursesFinishedChapters");
  if (coursesFinishedChapters) return JSON.parse(coursesFinishedChapters);
  else return {};
};

const retrieveStoredFinishedCourses = () => {
  const finishedCourses = localStorage.getItem("finishedCourses");
  console.log(finishedCourses)
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

  const savePlayingTimePosition = (courseId, chapterId, timeLeft) => {
    const newPlayingPosition = {
      ...playingPosition,
      [courseId]: { [chapterId]: timeLeft },
    };

    localStorage.removeItem("playingPosition");
    localStorage.setItem("playingPosition", JSON.stringify(newPlayingPosition));
    setPlayingPosition(newPlayingPosition);
  };

  const getChapterId = (courseId) => {
    if (playingPosition && playingPosition[courseId]) {
      return Object.keys(playingPosition[courseId])[0];
    }
    return false;
  };

  const getTimestamp = (courseId, chapterId, duration) => {
    if (playingPosition[courseId]?.[chapterId] >= 0) {
      return duration - playingPosition[courseId][chapterId];
    }
    return false;
  };

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

  const saveFinishedCourses = (courseId)=>{
    const newFinishedCourses = {
      ...finishedCourses,
      [courseId]: true,
    };
    localStorage.removeItem("finishedCourses");
    localStorage.setItem(
      "finishedCourses",
      JSON.stringify(newFinishedCourses)
    );
    setFinishedCourses(newFinishedCourses);

  }



  const contextValue = {
    playingPosition,
    savePlayingTimePosition,
    getChapterId,
    getTimestamp,
    coursesFinishedChapters,
    saveFinishedChapters,
    finishedCourses,
    saveFinishedCourses,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
