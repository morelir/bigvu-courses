import React, { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
import { createApiClient } from "../../../core/api";
import VideoIcon from "../../../shared/components/ui/VideoIcon";
import "./CourseTotalVideos.css";

const api = createApiClient();

const CourseTotalVideos = ({ id }) => {
  const [totalVideos, setTotalVideos] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await api.getCourse(id);
      setTotalVideos(result.chapters.length);
      setIsLoading(false);
    })();
  });

  // if (isLoading) {
  //   return <BarLoader color="#253658" />;
  // }

  return (
    <div className="course-total-videos">
      <VideoIcon />
      <p>{totalVideos}<BarLoader width="1.2rem" height="0.3rem" color="#253658" loading={isLoading} /> videos</p>
    </div>
  );
};

export default CourseTotalVideos;
