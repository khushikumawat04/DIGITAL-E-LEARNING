import React, { useState, useEffect } from "react";

// Sample student data (Can be fetched from backend/localStorage)
const sampleData = {
  Maths: 80, 
  Biology: 50, 
  Commerce: 30 
};

const Dashboard = ({ studentName }) => {
  const [progress, setProgress] = useState({});

  // Load progress from localStorage when component mounts
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("students")) || {};
    setProgress(storedData[studentName] || sampleData);
  }, [studentName]);

  return (
    <div className="dashboard" style={{marginTop:"300px"}}>
      <h2>{studentName}'s Dashboard</h2>
      {Object.entries(progress).map(([subject, percentage]) => (
        <div key={subject} className="progress-item">
          <h4>{subject}</h4>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p>{percentage}% Completed</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
