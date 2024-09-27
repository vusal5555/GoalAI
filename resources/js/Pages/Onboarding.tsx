import React, { useState } from "react";

import axios from "axios";
// import { Inertia } from "@inertiajs/inertia";
import WelcomeComponent from "@/Components/Welcome";
import QuestionnaireComponent from "@/Components/QuestionnaireComponent";
import AISuggestionsComponent from "@/Components/AISuggestionsComponent";
import ConfirmationComponent from "@/Components/ConfirmationComponent";

// Define User type based on what Laravel sends in the `auth` prop
interface User {
  id: number;
  name: string;
  email: string;
}

// Define the types for the props your Inertia page expects
interface OnboardingContainerProps {
  laravelVersion: string;
  phpVersion: string;
  auth: {
    user: User;
  };
}

interface Goal {
  id: number;
  name: string;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  laravelVersion,
  phpVersion,
  auth,
}) => {
  const [step, setStep] = useState<number>(1);
  const [suggestedGoals, setSuggestedGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const nextStep = () => setStep(step + 1);

  const submitAnswers = async (answers: {
    category: string;
    struggle: string;
  }) => {
    try {
      const response = await axios.post("/onboarding", answers);
      setSuggestedGoals(response.data);

      console.log("Suggested goals:", response.data);
      nextStep();
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  const selectGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    nextStep();
  };

  const completeOnboarding = async () => {
    try {
      if (selectedGoal) {
        await axios.post("/api/onboarding/complete", {
          goalId: selectedGoal.id,
        });
      }
    } catch (error) {
      console.error("Error completing onboarding", error);
    }
  };

  console.log("Selected goal:", suggestedGoals);

  return (
    <div className="onboarding-container">
      {step === 1 && <WelcomeComponent nextStep={nextStep} />}
      {step === 2 && <QuestionnaireComponent submitAnswers={submitAnswers} />}
      {step === 3 && (
        <AISuggestionsComponent
          suggestedGoals={suggestedGoals}
          selectGoal={selectGoal}
        />
      )}
      {step === 4 && selectedGoal && (
        <ConfirmationComponent
          selectedGoal={selectedGoal}
          completeOnboarding={completeOnboarding}
        />
      )}
    </div>
  );
};

export default OnboardingContainer;
