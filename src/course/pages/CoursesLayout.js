import React, { useEffect, useState } from "react";
import { createApiClient } from "../../core/api";
import CourseList from "../components/courses-layout/CourseList";
import MoonLoader from "react-spinners/MoonLoader";
import "./CoursesLayout.css";

const api = createApiClient();

const CoursesLayout = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const result = await api.getCourseList();
      setCourses(result.result);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="center">
        <MoonLoader color="#253658" />
      </div>
    );
  }

  return (
    <section className="coursesLayout-section">
      <h1 className="coursesLayout-heading">BIGVU 101 Crash Course</h1>
      <div>
        <p className="coursesLayout-description">
          Zero editing experience to pro — your journey starts here.<br/>                        
          Watch step-by-step video lessons how to make videos with impact.
        </p>
      </div>
      <CourseList courses={courses} />
    </section>
  );
};

export default CoursesLayout;
