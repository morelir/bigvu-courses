import React, { useEffect, useState } from "react";
import { createApiClient } from "../../core/api";
import CourseList from "../components/courses-layout/CourseList";
import MoonLoader from "react-spinners/MoonLoader";

const api = createApiClient();


const CoursesLayout = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await api.getCourseList();
      setCourses(result.result);
      console.log(result.result);
    })();
  }, []);

  if (courses.length !== 0) {
    return <MoonLoader className="center" color="#36d7b7" />
  }

  return (
    <section className="coursesLayout-section">
      <h1 className="coursesLayout-heading">BIGVU 101 Crash Course</h1>
      <p className="coursesLayout-description">
        Zero editing experience to pro — your journey starts here. Watch
        step-by-step video lessons how to make videos with impact.
      </p>
      <CourseList courses={courses} />
    </section>
  );
};

export default CoursesLayout;
