import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createApiClient } from "../../core/api";
import CoureseContext from "../../shared/store/course-context";
import CourseDetails from "../components/course/CourseDetails";
import CourseVideo from "../components/course/CourseVideo";
import "./Course.css";

const api = createApiClient();

const Course = () => {
  const courseId = useParams().id;
  const courseCtx = useContext(CoureseContext);
  const [course, setCourse] = useState();
  const [chapter, setChapter] = useState();
  const [timestamp, setTimeStamp] = useState(0);

  const {getChapterId,getTimeStamp} = courseCtx;

  useEffect(() => {
    (async () => {
      const result = await api.getCourse(courseId);
      setCourse(result);
      let chapterId;
      let chapter;
      if (getChapterId(courseId)) {
        chapterId = getChapterId(courseId);
        chapter = result.chapters.find((chapter) => chapter.id === chapterId);
        console.log(getTimeStamp(courseId,chapterId,chapter.asset.resource.duration))
        setTimeStamp(getTimeStamp(courseId,chapterId,chapter.asset.resource.duration))
      } else {
        chapter = result.chapters[0];
      }

      setChapter(chapter);
      console.log(chapter);
    })();
  }, [courseId,getChapterId,getTimeStamp]);

  const clickVideoChapterHanlder = () => {};

  const savePlayingTimePosition = (chapterId, timeLeft) => {
    courseCtx.savePlayingTimePosition(courseId, chapterId, timeLeft);
  };

  if (!course) {
    return (
      <div>
        <h1>No courses found</h1>
      </div>
    );
  }

  return (
    <div className="course-section">
      <div className="course-container">
        <CourseVideo
          onClickVideoChapter={clickVideoChapterHanlder}
          url={chapter.asset.resource.stream.url}
          title={chapter.asset.title}
          duration={chapter.asset.resource.duration}
          timestamp={timestamp}
          savePlayingTimePosition={savePlayingTimePosition.bind(
            null,
            course.chapters[0].id
          )}
        />
        <CourseDetails course={course} />
      </div>
    </div>
  );
};

export default Course;
