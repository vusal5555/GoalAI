import React from "react";
import classNames from "classnames";
import {
  FaRegClock,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const goals = [
  {
    id: 1,
    title: "Finish React Component",
    dueDate: "2024-09-12",
    daysRemaining: 3,
  },
  {
    id: 2,
    title: "Submit Final Report",
    dueDate: "2024-09-07",
    daysRemaining: -2,
  },
  {
    id: 3,
    title: "Start Fitness Routine",
    dueDate: "2024-09-25",
    daysRemaining: 15,
  },
];

const getIcon = (daysRemaining = 3) => {
  if (daysRemaining < 0)
    return <FaExclamationTriangle className="text-red-500 text-2xl" />;
  if (daysRemaining <= 3 && daysRemaining >= 0)
    return <FaRegClock className="text-yellow-400 text-2xl" />;
  return <FaCheckCircle className="text-green-500 text-2xl" />;
};

const UpcomingGoalsCard = () => {
  return (
    <div className="w-full border mx-auto p-5 shadow-lg shadow-gray-200/30 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Upcoming Deadlines</h2>
      <div className="grid grid-cols-1 gap-6">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-primary-foreground hover:bg-gray-700 cursor-pointer rounded-lg p-4 shadow transition duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {goal.title}
                </h3>
                <p
                  className={classNames({
                    "text-red-500": goal.daysRemaining < 0,
                    "text-yellow-400":
                      goal.daysRemaining <= 3 && goal.daysRemaining >= 0,
                    "text-green-500": goal.daysRemaining > 3,
                  })}
                >
                  Due: {goal.dueDate} (
                  {goal.daysRemaining < 0
                    ? "Overdue"
                    : `In ${goal.daysRemaining} days`}
                  )
                </p>
              </div>
              <div>{getIcon(goal.daysRemaining)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingGoalsCard;
