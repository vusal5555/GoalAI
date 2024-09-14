import React from "react";

// Mock Data for AI Recommendations
const aiRecommendations = [
  {
    id: 1,
    suggestion: "Start a 30-day meditation habit",
    description: "Meditate daily for 15 minutes to improve mental clarity.",
    type: "habit",
  },
  {
    id: 2,
    suggestion: "Learn JavaScript in 6 weeks",
    description: "Complete a structured learning roadmap to master JavaScript.",
    type: "goal",
  },
  {
    id: 3,
    suggestion: "Read 1 book per month",
    description: "Build a habit of reading one book every month.",
    type: "habit",
  },
];

// Function to simulate adding a goal (this can be replaced with real logic later)
const handleAddGoal = (suggestion = "abc") => {
  alert(`Goal Added: ${suggestion}`);
};

const AIRecommendations = () => {
  return (
    <div className="w-full border mx-auto p-5 shadow-lg shadow-gray-200/30 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">AI Recommendations</h2>
      <div className="grid grid-cols-1 gap-6">
        {aiRecommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-primary-foreground rounded-lg p-6 shadow-lg"
          >
            {/* Suggestion Title */}
            <h3 className="text-xl font-semibold text-white">
              {rec.suggestion}
            </h3>
            {/* Suggestion Description */}
            <p className="text-gray-400 mt-2">{rec.description}</p>
            {/* Start Now Button */}
            <button
              onClick={() => handleAddGoal(rec.suggestion)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Start Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
