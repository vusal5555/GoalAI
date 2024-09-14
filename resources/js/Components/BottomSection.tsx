import UpcomingGoalsCard from "./UpcomingGoals";
import RecentActivity from "./RecentActivity";
import AIRecommendations from "./AIRecommendation";

const BottomSection = () => {
  return (
    <div className="grid gap-3 grid-cols-1 m-auto md:grid-cols-2 lg:grid-cols-3">
      <RecentActivity></RecentActivity>
      <AIRecommendations></AIRecommendations>
    </div>
  );
};

export default BottomSection;
