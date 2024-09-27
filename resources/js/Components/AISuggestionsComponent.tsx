import React from "react";

interface Goal {
  id: number;
  name: string;
}

interface AISuggestionsComponentProps {
  suggestedGoals: Goal[];
  selectGoal: (goal: Goal) => void;
}

const AISuggestionsComponent: React.FC<AISuggestionsComponentProps> = ({
  suggestedGoals,
  selectGoal,
}) => {
  return (
    <div className="onboarding-step">
      <h2>Here are some goals you can start with:</h2>
      <ul>
        {suggestedGoals.map((goal) => (
          <li key={goal.id}>
            {goal.name}
            <button onClick={() => selectGoal(goal)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AISuggestionsComponent;
