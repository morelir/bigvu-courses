import React from "react";
import CheckedIcon from "../../../shared/components/ui/CheckedIcon";
import CirclePlayIcon from "../../../shared/components/ui/CirclePlayIcon";
import CompleteChapters from "./CompleteChapters";
import "./CourseDetails.css";

const CourseDetails = ({
  onClickVideoChapter,
  course: { headline, chapters },
  chapterId,
  finishedChapters,
}) => {
  return (
    <div className="course-details">
      <div className="course-headline-container">
        <h1 className="course-headline">{headline}</h1>
        <CompleteChapters finished={Object.keys(finishedChapters).length} total={chapters.length} />
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
                className={`chapter-item ${
                  chapterId === chapter.id ? "active" : ""
                } ${finishedChapters[chapter.id] ? "finished" : ""}`}
              >
                <CheckedIcon
                  className={`${
                    finishedChapters[chapter.id]
                      ? "display-flex"
                      : "display-none"
                  }`}
                />
                <CirclePlayIcon
                  className={`${
                    !finishedChapters[chapter.id]
                      ? "display-flex"
                      : "display-none"
                  }`}
                />

                <p className="chapter-title">{chapter.title}</p>

                <span className="duration">
                  {new Date(chapter.asset.resource.duration.toFixed(2) * 1000)
                    .toISOString()
                    .slice(15, 19)}
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
