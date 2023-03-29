import React, { useEffect, useRef } from "react";
import "./CourseVideo.css";

const CourseVideo = ({
  title,
  duration,
  timestamp,
  url,
  savePlayingTimePosition,
}) => {
  const videoRef = useRef();

  useEffect(() => {
    let videoRefValue = null;
    if (videoRef.current) {
      videoRefValue = videoRef.current; // <-- save ref value
      videoRefValue.currentTime = timestamp;
    }

    const onBeforeUnload = (e) => {
      // run your cleanup code here
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
  }, [duration, timestamp]);

  return (
    <video
      title={title}
      ref={videoRef}
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
