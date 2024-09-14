import React from "react";
import { FaCheckCircle, FaFlag } from "react-icons/fa";
import classNames from "classnames";

// Mock Data for Recent Activities
const recentActivities = [
  {
    id: 1,
    action: "Completed task: Finish React Component",
    timestamp: "2024-09-06 10:30 AM",
    type: "task",
  },
  {
    id: 2,
    action: "Added new goal: Learn TypeScript",
    timestamp: "2024-09-05 08:15 AM",
    type: "goal",
  },
  {
    id: 3,
    action: "Completed task: Submit Final Report",
    timestamp: "2024-09-04 03:00 PM",
    type: "task",
  },
  {
    id: 4,
    action: "Added new goal: Start Fitness Routine",
    timestamp: "2024-09-03 06:45 AM",
    type: "goal",
  },
];

// Function to get the icon and color based on activity type
const getActivityIcon = (type = "task") => {
  return type === "task" ? (
    <FaCheckCircle className="text-green-500" />
  ) : (
    <FaFlag className="text-blue-500" />
  );
};

const RecentActivity = () => {
  return (
    <div className="col-span-1 lg:col-span-2 w-full mx-auto p-5 border rounded-lg shadow-lg shadow-gray-200/30">
      <h2 className="text-2xl font-bold mb-6 text-white">Recent Activity</h2>
      <div className="space-y-6">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-4 bg-primary-foreground cursor-pointer rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            {/* Icon with Background */}
            <div className="flex-shrink-0">
              <div className="p-3 bg-gray-900 rounded-full">
                {getActivityIcon(activity.type)}
              </div>
            </div>
            {/* Action and Timestamp */}
            <div className="flex-1">
              <p className="text-white font-semibold">{activity.action}</p>
              <p className="text-gray-400 text-sm">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
