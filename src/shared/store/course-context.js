import React, { useState, useEffect, useCallback } from "react";

const CoureseContext = React.createContext({
  playingPosition: {},
  savePlayingTimePosition: (courseId, chapterId, timeLeft) => {},
  getChapterId: (courseId) => {},
  getTimeStamp:(courseId,chapterId)=>{}
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

export const CoureseContextProvider = (props) => {

  const playingData = retrieveStoredPlayingData();
  console.log(playingData)
  let initialPlayingData={};
  if (playingData) {
    initialPlayingData = JSON.parse(playingData);
  }
  const [playingPosition, setPlayingPosition] = useState(initialPlayingData);

  // useEffect(() => {}, []);

  const savePlayingTimePosition = (courseId, chapterId, timeLeft) => {
    const newPlayingPosition = {
      ...playingPosition,
      [courseId]: { [chapterId]: timeLeft },
    };

    localStorage.removeItem("playingPosition");
    localStorage.setItem("playingPosition", JSON.stringify(newPlayingPosition));

    setPlayingPosition({
      newPlayingPosition,
    });
  };

  const getChapterId = useCallback((courseId) => {
    if(playingPosition && playingPosition[courseId]){
      return Object.keys(playingPosition[courseId])[0]
    }
    return false;
  },[]) 

  const getTimeStamp = useCallback((courseId,chapterId,duration) => {
    if(playingPosition[courseId]?.[chapterId]>=0 ){
      return duration-playingPosition[courseId][chapterId];
    }
    return false;
  },[]) 



  const contextValue = {
    playingPosition,
    savePlayingTimePosition,
    getChapterId,
    getTimeStamp
  };

  return (
    <CoureseContext.Provider value={contextValue}>
      {props.children}
    </CoureseContext.Provider>
  );
};

export default CoureseContext;
