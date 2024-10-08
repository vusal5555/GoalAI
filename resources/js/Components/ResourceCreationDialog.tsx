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
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
import TextAreaInput from "./TextAreaInput";
import SelectInput from "./SelectInput";
import uppercaseFirstLetterLowerCaseTheRest from "@/utils/utils";
import { useState } from "react";

interface ResourceFormData {
  goal_id: number;
  title: string;
  description: string;
  url: string;
}

const ResourceCreationDialog: React.FC<{
  goals: { data: Array<{ id: number; title: string }> };
}> = ({ goals }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, post, reset, errors, processing } =
    useForm<ResourceFormData>({
      goal_id: 0,
      title: "",
      description: "",
      url: "",
    });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    data.title = uppercaseFirstLetterLowerCaseTheRest(data.title);

    data.description = uppercaseFirstLetterLowerCaseTheRest(data.description);

    post(route("resources.store"), {
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
          <FontAwesomeIcon className="text-xl" icon={faBook} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="flex flex-col">
          <DialogTitle>Add Resource</DialogTitle>
          <DialogDescription>Create your resource here!</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="mt-4">
            <InputLabel
              htmlFor="resource_title"
              value="Resource Title"
            ></InputLabel>
            <TextInput
              id="resource_title"
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
              htmlFor="resource_description"
              value="Resource Description"
            ></InputLabel>
            <TextAreaInput
              id="resource_description"
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
            <InputLabel htmlFor="resource_url" value="Resource Link" />

            <TextInput
              id="resource_url"
              type="text"
              value={data.url}
              name="url"
              className="mt-1 block w-full bg-transparent"
              onChange={(e) => setData("url", e.target.value)}
            />

            <InputError message={errors.url} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="resource_goal_id" value="Goal" />

            <SelectInput
              name="Goal"
              id="resource_goal_id"
              className="mt-1 block w-full bg-transparent"
              onChange={(e) => setData("goal_id", Number(e.target.value))}
            >
              <option value="">Select Goal</option>
              {goals.data.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.title}
                </option>
              ))}
            </SelectInput>

            <InputError message={errors.goal_id} className="mt-2" />
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

export default ResourceCreationDialog;
