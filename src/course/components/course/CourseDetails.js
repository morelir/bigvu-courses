import React from "react";
import CirclePlayIcon from "../../../shared/components/ui/CirclePlayIcon";
import "./CourseDetails.css";

const CourseDetails = ({
  course: { headline, chapters },
  onClickVideoChapter,
}) => {
  return (
    <div className="course-details">
      <div className="course-headline-container">
        <h1 className="course-headline">{headline}</h1>
        <div className="complete-chapters">
          <span>0/{chapters.length}</span>
        </div>
      </div>
      <div className="chapters-box">
        <ul className="chapter-list">
          {chapters.map((chapter) => {
            return (
              <li
                key={chapter.id}
                onClick={() => {
                  onClickVideoChapter(chapter.id);
                }}
                className="chapter-item"
              >
                <CirclePlayIcon />
                <p>{chapter.title}</p>

                <span className="duration">
                  {Math.round(chapter.asset.resource.duration)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
