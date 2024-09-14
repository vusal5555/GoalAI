import { Checkbox } from "@/Components/ui/checkbox";

type Goal = {
  goal: {
    id: number;
    name: string;
    completed: boolean;
  };
};

export function MonthGoals({ goal }: Goal) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {goal.name}
      </label>
    </div>
  );
}
