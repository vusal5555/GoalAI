import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/Components/ui/popover";
import { Calendar } from "@/Components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/react";
import { ComboboxDemo } from "./Combobox";

interface GoalFormData {
  title: string;
  description: string;
  dueDate: Date | null;
  priority: string;
  status: string;
  category: string;
}

const GoalCreationDialog: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data, setData, post, reset, errors, processing } =
    useForm<GoalFormData>({
      title: "",
      description: "",
      dueDate: null,
      priority: "",
      status: "",
      category: "",
    });

  // Update dueDate when selectedDate changes
  useEffect(() => {
    setData("dueDate", selectedDate);
  }, [selectedDate, setData]);

  const handlePriorityChange = (newPriority: string) => {
    setData("priority", newPriority);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting data:", data);
    post(route("goals.store"), {
      data,
      onSuccess: () => {
        reset();
        setSelectedDate(null);
      },
    });
  };

  return (
    <Dialog>
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
        <form onSubmit={onSubmit} className="grid gap-4 py-4">
          {/* Goal Title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              placeholder="Enter the title"
              value={data.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData("title", e.target.value)
              }
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter the description"
              value={data.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData("description", e.target.value)
              }
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[240px] text-left font-normal"
                >
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date: Date | undefined) => {
                    setSelectedDate(date || null);
                    setData("dueDate", date || null);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.dueDate && <span className="error">{errors.dueDate}</span>}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Enter the category"
              value={data.category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setData("category", e.target.value)
              }
            />
            {errors.category && (
              <span className="error">{errors.category}</span>
            )}
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="priority">Priority</Label>
            <ComboboxDemo onPriorityChange={handlePriorityChange} />
            {errors.priority && (
              <span className="error">{errors.priority}</span>
            )}
          </div>

          {/* Submit Button */}
          <DialogFooter>
            <Button type="submit" disabled={processing}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GoalCreationDialog;
