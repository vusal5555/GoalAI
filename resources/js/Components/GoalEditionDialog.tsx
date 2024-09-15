import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Link2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
import TextAreaInput from "./TextAreaInput";
import SelectInput from "./SelectInput";
import uppercaseFirstLetterLowerCaseTheRest from "@/utils/utils";
import { useEffect, useState } from "react";
import axios from "axios";

interface GoalFormData {
  user_id: number | null;
  title: string;
  description: string;
  due_date: string;
  priority: string;
  status: string;
  category: string;
}

const GoalEditionDialog: React.FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data, setData, put, reset, errors, processing } =
    useForm<GoalFormData>({
      user_id: null,
      title: "",
      description: "",
      due_date: "",
      priority: "",
      status: "",
      category: "",
    });

  const getGoal = () => {
    axios
      .get(`/goals/${id}`)
      .then((response) => {
        const goal = response.data;

        setData({
          user_id: goal.user_id,
          title: goal.title,
          description: goal.description,
          due_date: goal.due_date,
          priority: goal.priority,
          status: goal.status,
          category: goal.category,
        });
      })
      .catch((error) => {
        console.error("Error fetching goal:", error);
      });
  };

  useEffect(() => {
    getGoal();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedData = {
      ...data,
      title: uppercaseFirstLetterLowerCaseTheRest(data.title),
      description: uppercaseFirstLetterLowerCaseTheRest(data.description),
      category: uppercaseFirstLetterLowerCaseTheRest(data.category),
    };

    put(route("goals.update", { goal: id }), {
      data: updatedData,
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-0 p-0"
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon className="text-xl" icon={faEdit} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-col">
          <DialogTitle>Edit Goal</DialogTitle>
          <DialogDescription>Edit your goal here!</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="goal_title" value="Goal Title" />
            <TextInput
              id="goal_title"
              type="text"
              name="title"
              value={data.title}
              className="mt-1 block w-full bg-transparent"
              onChange={(e) => setData("title", e.target.value)}
            />
            <InputError message={errors.title} className="mt-2" />
          </div>
          <div className="mt-4 mb-4">
            <InputLabel htmlFor="goal_description" value="Goal Description" />
            <TextAreaInput
              id="goal_description"
              name="description"
              value={data.description}
              className="mt-1 block w-full bg-transparent"
              onChange={(e) => setData("description", e.target.value)}
            />
            <InputError message={errors.description} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="goal_due_date" value="Goal Deadline" />
            <TextInput
              id="goal_due_date"
              type="date"
              value={data.due_date}
              name="due_date"
              className="mt-1 block w-full bg-transparent text-white"
              onChange={(e) => setData("due_date", e.target.value)}
            />
            <InputError message={errors.due_date} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="goal_category" value="Goal Category" />
            <TextInput
              id="goal_category"
              type="text"
              value={data.category}
              name="category"
              className="mt-1 block w-full bg-transparent"
              onChange={(e) => setData("category", e.target.value)}
            />
            <InputError message={errors.category} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="goal_status" value="Goal Status" />
            <SelectInput
              name="status"
              id="goal_status"
              value={data.status}
              className="mt-1 block w-full bg-transparent "
              onChange={(e) => setData("status", e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </SelectInput>
            <InputError message={errors.status} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="goal_priority" value="Goal Priority" />
            <SelectInput
              name="priority"
              id="goal_priority"
              value={data.priority}
              className="mt-1 block w-full bg-transparent"
              onChange={(e) => setData("priority", e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </SelectInput>
            <InputError message={errors.priority} className="mt-2" />
          </div>
          <div className="mt-4 text-right">
            <Button type="submit" disabled={processing}>
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoalEditionDialog;
