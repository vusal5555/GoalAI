import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
import TextAreaInput from "./TextAreaInput";
import SelectInput from "./SelectInput";
import uppercaseFirstLetterLowerCaseTheRest from "@/utils/utils";
import { useState } from "react";

interface GoalFormData {
  title: string;
  description: string;
  due_date: string;
  priority: string;
  status: string;
  category: string;
}

const GoalCreationDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data, setData, post, reset, errors, processing } =
    useForm<GoalFormData>({
      title: "",
      description: "",
      due_date: "",
      priority: "",
      status: "",
      category: "",
    });
  // Get today's date in 'YYYY-MM-DD' format for the min attribute
  const today = new Date().toISOString().split("T")[0];
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    data.title = uppercaseFirstLetterLowerCaseTheRest(data.title);

    data.description = uppercaseFirstLetterLowerCaseTheRest(data.description);

    data.category = uppercaseFirstLetterLowerCaseTheRest(data.category);

    post(route("goals.store"), {
      onSuccess: () => {
        setOpen(false);
      },
    });
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-0">
          <FontAwesomeIcon className="text-xl" icon={faPlus} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-col">
          <DialogTitle>Set a Goal</DialogTitle>
          <DialogDescription>Create your goal here!</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <InputLabel htmlFor="goal_title" value="Goal Title"></InputLabel>
            <TextInput
              id="goal_title"
              type="text"
              name="title"
              value={data.title}
              className="mt-1 block w-full bg-transparent"
              onChange={(e) => setData("title", e.target.value)}
            ></TextInput>
            <InputError message={errors.title} className="mt-2"></InputError>
          </div>
          <div className="mt-4 mb-4">
            <InputLabel
              htmlFor="goal_description"
              value="Goal Description"
            ></InputLabel>
            <TextAreaInput
              id="goal_description"
              name="description"
              value={data.description}
              className="mt-1 block w-full bg-transparent"
              onChange={(e) => setData("description", e.target.value)}
            ></TextAreaInput>
            <InputError
              message={errors.description}
              className="mt-2"
            ></InputError>
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="goal_due_date" value="Goal Deadline" />

            <TextInput
              id="goal_due_date"
              type="date"
              value={data.due_date}
              name="due_date"
              min={today} // This disables past and current dates
              className="mt-1 block w-full bg-transparent text-white custom-date-input"
              onChange={(e) => setData("due_date", e.target.value)}
            />

            <InputError message={errors.due_date} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="goal_category" value="Goal Catgory" />

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
              className="mt-1 block w-full bg-transparent"
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

export default GoalCreationDialog;
