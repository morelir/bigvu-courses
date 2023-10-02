import React, { useEffect, useState ,useContext} from "react";
import BarLoader from "react-spinners/BarLoader";
import { createApiClient } from "../../../core/api";
import VideoIcon from "../../../shared/components/ui/VideoIcon";
import CourseContext from "../../../shared/store/course-context";
import "./CourseTotalVideos.css";

const api = createApiClient();

const CourseTotalVideos = ({ id }) => {
  const [totalVideos, setTotalVideos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const {saveCourse} =useContext(CourseContext)


  useEffect(() => {
    (async () => {
      const result = await api.getCourse(id);
      result.id=id; //there is course object id that not match to his course list id, so this fixed it.
      setTotalVideos(result.chapters.length);
      saveCourse(result);
      setIsLoading(false);
      
    })();
  },[]);

  return (
    <div className="course-total-videos">
      <VideoIcon />
      <p>{totalVideos}<BarLoader width="1.2rem" height="0.3rem" color="#253658" loading={isLoading} /> videos</p>
    </div>
  );
};

export default CourseTotalVideos;
