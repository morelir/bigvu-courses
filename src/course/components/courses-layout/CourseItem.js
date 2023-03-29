import React from "react";
import { Link } from "react-router-dom";
import "./CourseItem.css";

const CourseItem = ({ course: { id, headline, description, summary } }) => {
  return (
    <li className="course-container">
      <h1 className="course-headline">{headline}</h1>
      <Link to={`/${id}`}>
        <div className="course-box">
          <div>5 videos</div>
          <p className="course-description">{description}</p>
          <ul className="summary">
            {summary.map((bullet,pos) => {
              return <li key={pos} className="bullet-point">{bullet}</li>;
            })}
          </ul>
        </div>
      </Link>
    </li>
  );
};

export default CourseItem;
