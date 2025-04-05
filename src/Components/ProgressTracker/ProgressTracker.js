import React, { useState, useEffect } from "react";

const subjects = {
  Math: ["Algebra", "Geometry", "Trigonometry"],
  Science: ["Physics", "Chemistry", "Biology"],
};

const ProgressTracker = () => {
  const [progress, setProgress] = useState({});

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("progress")) || {};
    setProgress(savedProgress);
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  // Toggle completion status
  const toggleCompletion = (subject, topic) => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      if (!newProgress[subject]) newProgress[subject] = {};
      newProgress[subject][topic] = !newProgress[subject][topic];
      return newProgress;
    });
  };

  // Calculate completion percentage
  const getCompletionPercentage = (subject) => {
    const topics = subjects[subject];
    const completed = topics.filter((topic) => progress[subject]?.[topic]).length;
    return Math.round((completed / topics.length) * 100);
  };

  return (
    <div>
      <h2>Progress Tracker 📊</h2>
      {Object.keys(subjects).map((subject) => (
        <div key={subject} style={{ marginBottom: "20px" }}>
          <h3>{subject} ({getCompletionPercentage(subject)}% completed)</h3>
          <progress value={getCompletionPercentage(subject)} max="100"></progress>
          <ul>
            {subjects[subject].map((topic) => (
              <li key={topic}>
                <input
                  type="checkbox"
                  checked={progress[subject]?.[topic] || false}
                  onChange={() => toggleCompletion(subject, topic)}
                />
                {topic}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
