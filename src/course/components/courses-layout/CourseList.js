import React from "react";
import "./CourseList.css"
import CourseItem from "./CourseItem"

const styles = ["deep-ocean", "green-field", "sunset"];

const CourseList = ({ courses }) => {
  return (
    <ul className="course-list">
      {courses.map((course,pos) => {
        return <CourseItem key={course.id} course={course} style={styles[pos]}/>;
      })}
    </ul>
  );
};

export default CourseList;
