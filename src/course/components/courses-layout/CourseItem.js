import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createApiClient } from "../../../core/api";
import CircleChevronRight from "../../../shared/components/ui/CircleChevronRight";
import "./CourseItem.css";
import CourseTotalVideos from "./CourseTotalVideos";
import FinishedCourse from "./FinishedCourse";

const CourseItem = ({
  course: { id, headline, description, summary },
  style,
}) => {
  return (
    <li className="course-container">
      <h1 className={`course-headline ${style}`}>{headline}</h1>
      <Link to={`/${id}`}>
        <div className="course-box">
          <CourseTotalVideos id={id} />
          <p className="course-description">{description}</p>
          <ul className="summary">
            {summary.map((bullet, pos) => {
              return (
                <li key={pos} className={`bullet-point ${style}`}>
                  {bullet}
                </li>
              );
            })}
          </ul>
          <CircleChevronRight />
          <img
            className="draw"
            src={require(`../../../shared/images/${style}-draw.png`)}
            alt={`${style}-draw`}
          ></img>
          <FinishedCourse courseId={id} style={style}/>
        </div>
      </Link>
    </li>
  );
};

export default CourseItem;
