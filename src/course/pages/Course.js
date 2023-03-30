import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createApiClient } from "../../core/api";
import CourseContext from "../../shared/store/course-context";
import CourseDetails from "../components/course/CourseDetails";
import CourseVideo from "../components/course/CourseVideo";
import MoonLoader from "react-spinners/MoonLoader";
import "./Course.css";

const api = createApiClient();

const Course = () => {
  const courseId = useParams().id;
  const courseCtx = useContext(CourseContext);
  const [course, setCourse] = useState({});
  const [chapter, setChapter] = useState({});
  const [timestamp, setTimestamp] = useState(0);
  const [finishedChapters,setFinishedChapters] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  const { getChapterId, getTimestamp,coursesFinishedChapters} = courseCtx;

  useEffect(() => {
    (async () => {
      console.log(111);
      setIsLoading(true);
      const result = await api.getCourse(courseId);
      setCourse(result);
      let chapter;
      if (getChapterId(courseId)) {
        let chapterId = getChapterId(courseId);
        chapter = result.chapters.find((chapter) => chapter.id === chapterId);
        setTimestamp(
          getTimestamp(courseId, chapterId, chapter.asset.resource.duration)
        );
      } else {
        chapter = result.chapters[0];
      }
      setChapter(chapter);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  useEffect(()=>{
    setFinishedChapters(coursesFinishedChapters[courseId] ?? {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[coursesFinishedChapters[courseId],courseId])

  const clickVideoChapterHanlder = (chapterId) => {
    const chapter = course.chapters.find((chapter) => chapter.id === chapterId);
    console.log(chapter);
    setChapter(chapter);
    setTimestamp(0);
  };

  const savePlayingTimePosition = (chapterId, timeLeft) => {
    courseCtx.savePlayingTimePosition(courseId, chapterId, timeLeft);
  };

  const saveFinishedChapters = (chapterId) => {
    courseCtx.saveFinishedChapters(courseId, chapterId);
  };

  const nextVideoChapter = (chapterId) => {
    const index = course.chapters.findIndex(
      (chapter) => chapter.id === chapterId
    );
    if (index === course.chapters.length - 1 || index === -1) return;
    setChapter(course.chapters[index + 1]);
    setTimestamp(0);
  };

  if (isLoading) {
    return (
      <div className="center">
        <MoonLoader color="#253658" />
      </div>
    );
  }

  return (
    <div className="course-section">
      <div className="course-container">
        <CourseVideo
          chapterId={chapter.id}
          url={chapter.asset.resource.stream.url}
          title={chapter.title}
          duration={chapter.asset.resource.duration}
          timestamp={timestamp}
          finishedChapters={finishedChapters}
          savePlayingTimePosition={savePlayingTimePosition.bind(
            null,
            chapter.id
          )}
          nextVideoChapter={nextVideoChapter.bind(null, chapter.id)}
          saveFinishedChapters={saveFinishedChapters.bind(null, chapter.id)}
        />
        <CourseDetails
          onClickVideoChapter={clickVideoChapterHanlder}
          course={course}
          chapterId={chapter.id}
          finishedChapters={finishedChapters}
        />
      </div>
    </div>
  );
};

export default Course;
