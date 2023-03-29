import React from "react";
import "./CourseList.css"
import CourseItem from "./CourseItem"

const CourseList = ({ courses }) => {


  return (
    <ul className="course-list">
      {courses.map((course) => {
        return <CourseItem key={course.id} course={course}/>;
      })}
    </ul>
  );
};

export default CourseList;
