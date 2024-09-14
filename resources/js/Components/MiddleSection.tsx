import { ProgressChart } from "./WeeklyProgress";
import { GoalCategoryPieChart } from "./MonthlyProgress";
import UpcomingGoalsCard from "./UpcomingGoals";

const MiddleSection = () => {
  return (
    <div className="grid gap-3 grid-cols-1 m-auto md:grid-cols-2 lg:grid-cols-3 mb-10">
      <ProgressChart></ProgressChart>
      <GoalCategoryPieChart></GoalCategoryPieChart>
      <UpcomingGoalsCard></UpcomingGoalsCard>
    </div>
  );
};

export default MiddleSection;
