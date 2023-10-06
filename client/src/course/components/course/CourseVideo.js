import React, { useEffect, useRef } from "react";
import "./CourseVideo.css";

const CourseVideo = ({
  chapterId,
  title,
  duration,
  timestamp,
  url,
  finishedChapters,
  savePlayingTimePosition,
  nextVideoChapter,
  saveFinishedChapters,
}) => {
  const videoRef = useRef();

  useEffect(() => {
    let videoRefValue = null;
    if (videoRef.current) {
      videoRefValue = videoRef.current; // <-- save ref value
      videoRefValue.currentTime = timestamp;
    }

    const onBeforeUnload = (e) => {
      if (videoRefValue) {
        const timeLeft = duration - videoRefValue.currentTime;
        savePlayingTimePosition(timeLeft);
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      if (videoRefValue) {
        const timeLeft = duration - videoRefValue.currentTime;
        savePlayingTimePosition(timeLeft);
      }
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timestamp, duration]);

  useEffect(() => {
    //for update source src need to load the video
    videoRef.current?.load();
  }, [url]);

  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;
    if (currentTime >= 10 && !finishedChapters[chapterId]) {
      // execute after 10 seconds
      saveFinishedChapters();
    }
  };

  return (
    <video
      title={title}
      ref={videoRef}
      onEnded={nextVideoChapter}
      onTimeUpdate={handleTimeUpdate}
      id="course-video"
      className="course-video"
      controls
      autoPlay
      muted
    >
      <source src={url} type="video/mp4" />
    </video>
  );
};

export default CourseVideo;
