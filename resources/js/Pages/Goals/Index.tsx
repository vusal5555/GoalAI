import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import GoalEditionDialog from "@/Components/GoalEditionDialog";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/Components/ui/button";
import Pagination, { LinkType } from "@/Components/Pagination";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface Goal {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  user: User;
  progress: number;
}

const Index = ({
  auth,
  goals,
  categories,
  links,
}: PageProps<{
  goals: { data: Goal[] };
  categories: string[];
  links: LinkType[];
}>) => {
  const { filters } = usePage<{
    filters: { category?: string; search?: string };
  }>().props;

  const [selectedCategory, setSelectedCategory] = useState(
    filters.category || "All"
  );
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  // Function to handle category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.get(
      route("goals.index"),
      { category, search: searchTerm },
      { preserveState: true, preserveScroll: true }
    );
  };

  // Function to handle search term changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    router.get(
      route("goals.index"),
      { category: selectedCategory, search: searchValue },
      { preserveState: true, preserveScroll: true }
    );
  };

  const filteredGoals = goals.data;

  const deleteGoal = (id: number) => {
    router.delete(route("goals.destroy", { goal: id }));
  };

  return (
    <>
      <Head title="Goals" />
      <MainLayout auth={auth}>
        <div className="min-h-screen bg-transparent border shadow-lg shadow-gray-200/30 rounded-md text-white p-6">
          <h1 className="text-3xl font-bold mb-4">Goals</h1>

          <div className="flex flex-col md:flex-row">
            {/* Left Sidebar for Categories */}
            <div className="w-full md:w-1/4 pr-0 md:pr-6 mb-6 md:mb-0 lg:sticky lg:top-4 lg:h-[calc(100vh-32px)]">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul className="space-y-3">
                <li
                  className={`cursor-pointer p-2 rounded-md ${
                    selectedCategory === "All"
                      ? "bg-blue-500 text-white"
                      : "bg-primary-foreground text-gray-300"
                  } hover:bg-blue-600`}
                  onClick={() => handleCategoryChange("All")}
                >
                  All
                </li>

                {categories.map((category: string) => (
                  <li
                    key={category}
                    className={`cursor-pointer p-2 rounded-md ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-primary-foreground text-gray-300"
                    } hover:bg-blue-600`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section: Search & Goal Display */}
            <div className="w-full md:w-3/4">
              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  className="p-3 w-full rounded-md bg-primary-foreground text-white focus:outline-none"
                  placeholder="Search goals..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Goal Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
                {filteredGoals.length > 0 ? (
                  filteredGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className="bg-primary-foreground w-full flex flex-col gap-2 p-4 rounded-lg border shadow-lg shadow-gray-200/30"
                    >
                      {/* Title and Edit Dialog */}
                      <div className="flex flex-col lg:flex-row justify-between items-start mb-4 w-full">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {goal.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">
                            {goal.description}
                          </p>
                        </div>
                        <div className="flex gap-4 items-center ml-2 lg:ml-0">
                          <GoalEditionDialog id={goal.id} />
                          <Button
                            variant="ghost"
                            onClick={() => deleteGoal(goal.id)}
                            className="p-0"
                          >
                            <FontAwesomeIcon
                              className="text-xl"
                              icon={faRemove}
                            ></FontAwesomeIcon>
                          </Button>
                        </div>
                      </div>

                      {/* Status */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit ${
                          goal.status === "Completed"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-gray-900"
                        }`}
                      >
                        {goal.status}
                      </span>

                      {/* Progress and Deadline */}
                      <div className="flex justify-between items-center mb-4 ">
                        <p className="text-gray-400 text-sm">
                          Deadline: {goal.due_date}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {goal.progress}% Complete
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-700 h-2 rounded-full mb-6">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>

                      {/* Generate AI Roadmap Button */}
                      <button
                        onClick={() =>
                          alert(`Generating AI roadmap for: ${goal.title}`)
                        }
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                      >
                        Generate AI Roadmap
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No goals found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div>
            <Pagination links={links}></Pagination>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export default Index;
