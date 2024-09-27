import React from "react";

interface WelcomeComponentProps {
  nextStep: () => void;
}

const WelcomeComponent: React.FC<WelcomeComponentProps> = ({ nextStep }) => {
  return (
    <div className="onboarding-step">
      <h1>Welcome to [App Name]</h1>
      <p>Let’s personalize your experience.</p>
      <button onClick={nextStep}>Get Started</button>
    </div>
  );
};

export default WelcomeComponent;
