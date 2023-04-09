import React, { useContext,  useState } from "react";
import CourseContext from "../../../shared/store/course-context";
import "./FinishedCourse.css";

const FinishedCourse = ({ courseId ,style}) => {
  const coursesCtx = useContext(CourseContext);
  console.log(coursesCtx.finishedCourses)
  console.log(courseId)
  const [finishedCourse] = useState(coursesCtx.finishedCourses[courseId] ?? false);

  if (finishedCourse) {
    return <span className={`finished-course ${style}-background`}>Completed</span>;
  }

  return <></>;
};

export default FinishedCourse;
