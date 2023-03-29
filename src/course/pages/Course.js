import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createApiClient } from "../../core/api";
import CoureseContext from "../../shared/store/course-context";
import CourseDetails from "../components/course/CourseDetails";
import CourseVideo from "../components/course/CourseVideo";
import MoonLoader from "react-spinners/MoonLoader";
import "./Course.css";

const api = createApiClient();

const Course = () => {
  const courseId = useParams().id;
  const courseCtx = useContext(CoureseContext);
  const [course, setCourse] = useState();
  const [chapter, setChapter] = useState();
  const [timestamp, setTimeStamp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { getChapterId, getTimeStamp } = courseCtx;

  useEffect(() => {
    (async () => {
      const result = await api.getCourse(courseId);
      setCourse(result);
      let chapterId;
      let chapter;
      if (getChapterId(courseId)) {
        chapterId = getChapterId(courseId);
        chapter = result.chapters.find((chapter) => chapter.id === chapterId);
        setTimeStamp(
          getTimeStamp(courseId, chapterId, chapter.asset.resource.duration)
        );
      } else {
        chapter = result.chapters[0];
      }

      setChapter(chapter);
      console.log(chapter);
      setIsLoading(false);
    })();
  }, [courseId, getChapterId, getTimeStamp]);

  const clickVideoChapterHanlder = (chapterId) => {
    const chapter = course.chapters.find((chapter) => chapter.id === chapterId);
    setChapter(chapter);
    setTimeStamp(0);
  };

  const savePlayingTimePosition = (chapterId, timeLeft) => {
    courseCtx.savePlayingTimePosition(courseId, chapterId, timeLeft);
  };

  if (isLoading) {
    return (
      <div className="center">
        <MoonLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="course-section">
      <div className="course-container">
        <CourseVideo
          url={chapter.asset.resource.stream.url}
          title={chapter.asset.title}
          duration={chapter.asset.resource.duration}
          timestamp={timestamp}
          savePlayingTimePosition={savePlayingTimePosition.bind(
            null,
            course.chapters[0].id
          )}
        />
        <CourseDetails
          onClickVideoChapter={clickVideoChapterHanlder}
          course={course}
        />
      </div>
    </div>
  );
};

export default Course;
