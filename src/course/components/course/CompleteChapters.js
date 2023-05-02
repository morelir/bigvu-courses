import React, { useContext, useEffect } from "react";
import MedalIcon from "../../../shared/components/ui/MedalIcon";
import CourseContext from "../../../shared/store/course-context";
import "./CompleteChapters.css";

const CompleteChapters = ({ courseId, finished, total }) => {
  const courseCtx = useContext(CourseContext);

  useEffect(() => {
    // Check if finished chapters equal to total chapters and this course is not in list of finished courses
    // Then, save finished course ID on local storage, Else not saving
    if (finished === total && !courseCtx.finishedCourses[courseId]) {
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
