import React from "react";
import MedalIcon from "../../../shared/components/ui/MedalIcon";
import "./CompleteChapters.css";

const CompleteChapters = ({ finished, total }) => {
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
