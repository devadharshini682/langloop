import React from "react";

function StatCards({
  cardsDue = 0,
  mastered = 0,
  accuracy = 0,
  sessions = 0,
}) {
  return (
    <div className="stats-grid">
      <div className="stat-card due-stat">
        <div className="stat-card-top">
          <span className="stat-icon">!</span>
          <span className="stat-title">DUE FOR REVIEW</span>
        </div>
        <h3>Cards Due</h3>
        <p className="stat-value">{cardsDue}</p>
      </div>

      <div className="stat-card mastered-stat">
        <div className="stat-card-top">
          <span className="stat-icon">✓</span>
          <span className="stat-title">COMPLETED</span>
        </div>
        <h3>Mastered</h3>
        <p className="stat-value">{mastered}</p>
      </div>

      <div className="stat-card flashcard-stat">
        <div className="stat-card-top">
          <span className="stat-icon">🎯</span>
          <span className="stat-title">PERFORMANCE</span>
        </div>
        <h3>Accuracy</h3>
        <p className="stat-value">{accuracy}%</p>
      </div>

      <div className="stat-card streak-stat">
        <div className="stat-card-top">
          <span className="stat-icon">★</span>
          <span className="stat-title">ACTIVITY</span>
        </div>
        <h3>Sessions</h3>
        <p className="stat-value">{sessions}</p>
      </div>
    </div>
  );
}

export default StatCards;