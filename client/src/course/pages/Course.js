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
  const [finishedChapters, setFinishedChapters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { getChapterId, getTimestamp, coursesFinishedChapters, courses } =
    courseCtx;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let result
      if (courses.length === 0) {
        result = await api.getCourse(courseId);
      }else{
        [result] = courses.filter((course) => course.id === courseId);
      }

     

      setCourse(result);
      let chapter;
      // Check if there is a chapter ID on localstorage that need to playing from,
      // IF so set this chapter and set his timestamp.
      // ELSE set the first chapter on the course.
      if (getChapterId(courseId)) {
        let chapterId = getChapterId(courseId);
        chapter = result.chapters.find((chapter) => chapter.id === chapterId);
        // Record of the time elapsed since the start of the video
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

  useEffect(() => {
    setFinishedChapters(coursesFinishedChapters[courseId] ?? {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursesFinishedChapters[courseId], courseId]);

  // Event for clicking on chapter, find chapter by id and set it.
  const clickVideoChapterHanlder = (chapterId) => {
    const chapter = course.chapters.find((chapter) => chapter.id === chapterId);
    setChapter(chapter);
    setTimestamp(0);
  };

  // Event for saving playing time position if the user reload the page or exit from it.
  const savePlayingTimePosition = (chapterId, timeLeft) => {
    courseCtx.savePlayingTimePosition(courseId, chapterId, timeLeft);
  };

  // Event for saving finished chapter on local storage if the user finished that chapter.
  const saveFinishedChapters = (chapterId) => {
    courseCtx.saveFinishedChapters(courseId, chapterId);
  };

  // Event trigger when video playing time position reached to 0, The event setting  next chapter.
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
          courseId={courseId}
          chapterId={chapter.id}
          finishedChapters={finishedChapters}
        />
      </div>
    </div>
  );
};

export default Course;
