import React, { useContext, useEffect } from "react";
import MedalIcon from "../../../shared/components/ui/MedalIcon";
import CourseContext from "../../../shared/store/course-context";
import "./CompleteChapters.css";

const CompleteChapters = ({ courseId, finished, total }) => {
  const courseCtx = useContext(CourseContext);

  useEffect(() => {
    if (finished === total && !courseCtx.finishedCourses[courseId]) {
      console.log("finish "+ courseId)
      courseCtx.saveFinishedCourses(courseId);
    }
  }, [finished, total]);

  return (
    <div className="complete-chapters">
      <MedalIcon />
      <span>
        {finished}/{total}
      </span>
    </div>
  );
};

export default CompleteChapters;
