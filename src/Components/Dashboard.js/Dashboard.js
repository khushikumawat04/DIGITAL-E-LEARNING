import React, { useState, useEffect } from "react";

import PhysicsData from '../Physics/PhysicsData.json';
import ChemistryData from '../Chemistry/ChemistryData.json';
import MathsData from '../Mathematics/MathData.json';
import EnglishData from '../English/EnglishData.json';
import HindiData from '../Hindi/HindiData.json';

const Dashboard = ({ studentName }) => {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const completedPhysics = JSON.parse(localStorage.getItem('completedPhysicsChapters')) || {};
    const completedChemistry = JSON.parse(localStorage.getItem('completedChemistryChapters')) || {};
    const completedMaths = JSON.parse(localStorage.getItem('completedMathsChapters')) || {};
    const completedEnglish = JSON.parse(localStorage.getItem('completedEnglishChapters')) || {};
    const completedHindi = JSON.parse(localStorage.getItem('completedHindiChapters')) || {};

    const calcProgress = (completedObj, totalChapters) => {
      const completedCount = Object.values(completedObj).filter(Boolean).length;
      if (totalChapters === 0) return 0;
      return Math.round((completedCount / totalChapters) * 100);
    };

    setProgress({
      Physics: calcProgress(completedPhysics, PhysicsData.length),
      Chemistry: calcProgress(completedChemistry, ChemistryData.length),
      Maths: calcProgress(completedMaths, MathsData.length),
      English: calcProgress(completedEnglish, EnglishData.length),
      Hindi: calcProgress(completedHindi, HindiData.length),
    });
  }, [studentName]);

  return (
    <>
<div className="text-center my-4">
  <h2 style={{
    borderBottom: "3px solid #007bff",
    display: "inline-block",
    paddingBottom: "8px",
    color: "#333",
    marginTop:"100px"
  }}>
    {studentName}'s Dashboard
  </h2>
  <p className="mt-2 text-muted">
    Welcome back, {studentName}! Here's a quick look at your subject-wise progress. Keep going!
  </p>
</div>
<div className="container" style={{ paddingTop: "200px", marginBottom:"300px" }}>

  <div className="row g-4">
      
    {Object.entries(progress).map(([subject, percentage]) => (
      <div key={subject} className="col-12 col-md-6 col-lg-4">
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{subject}</h5>
            <div className="progress mb-3" style={{ height: "25px" }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: `${percentage}%` }}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {percentage}%
              </div>
            </div>
            <p className="card-text text-muted">{percentage}% Completed</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
</>

  );
};

export default Dashboard;
