import React, { useState } from "react";

interface QuestionnaireComponentProps {
  submitAnswers: (answers: {
    category: string;
    struggle: string;
    gender: string;
  }) => void;
}

const QuestionnaireComponent: React.FC<QuestionnaireComponentProps> = ({
  submitAnswers,
}) => {
  const [category, setCategory] = useState<string>("");
  const [struggle, setStruggle] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const handleSubmit = () => {
    submitAnswers({ category, struggle, gender });
  };

  return (
    <div className="onboarding-step">
      <h2>What area of your life do you want to improve?</h2>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" disabled>
          Select an option
        </option>
        <option value="health">Health</option>
        <option value="fitness">Fitness</option>
        <option value="learning">Learning</option>
      </select>

      <h2>What’s your current struggle?</h2>
      <select value={struggle} onChange={(e) => setStruggle(e.target.value)}>
        <option value="" disabled>
          Select an option
        </option>
        <option value="motivation">Lack of Motivation</option>
        <option value="time">Not Enough Time</option>
      </select>

      <h2>What’s your gender?</h2>
      <select value={struggle} onChange={(e) => setGender(e.target.value)}>
        <option value="" disabled>
          Select an option
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="non-binary">Non-binary</option>
      </select>

      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

export default QuestionnaireComponent;
