import React from "react";

interface Goal {
  id: number;
  name: string;
}

interface ConfirmationComponentProps {
  selectedGoal: Goal;
  completeOnboarding: () => void;
}

const ConfirmationComponent: React.FC<ConfirmationComponentProps> = ({
  selectedGoal,
  completeOnboarding,
}) => {
  return (
    <div className="onboarding-step">
      <h2>Great! You’ve selected {selectedGoal.name} as your first goal!</h2>
      <button onClick={completeOnboarding}>Finish</button>
    </div>
  );
};

export default ConfirmationComponent;
