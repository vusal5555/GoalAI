import Pagination, { LinkType } from "@/Components/Pagination";
import ResourceCreationDialog from "@/Components/ResourceCreationDialog";
import ResourceEditionDialog from "@/Components/ResourceEditionDialog";
import { Button } from "@/Components/ui/button";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";

const Index = ({
  auth,
  goals,
  resources,
  filters,
  links,
}: PageProps<{
  goals: { data: { id: number; title: string }[] };
  resources: {
    data: { id: number; title: string; description: string; url: string }[];
  };
  filters: { goal_id?: number; search?: string };
  links: LinkType[]; // Add this line to include the 'links' property
}>) => {
  const [selectedGoal, setSelectedGoal] = useState(filters.goal_id || null);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  // Function to handle goal (category) selection
  const handleGoalSelect = (goalId: number | null) => {
    setSelectedGoal(goalId);
    router.get(
      route("resources.index"),
      { goal_id: goalId, search: searchTerm },
      { preserveState: true }
    );
  };

  // Function to handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    router.get(
      route("resources.index"),
      { goal_id: selectedGoal, search: searchValue },
      { preserveState: true }
    );
  };

  const deleteResource = (id: number) => {
    router.delete(route("resources.destroy", { resource: id }));
  };

  return (
    <>
      <Head title="Resources" />

      <MainLayout auth={auth}>
        <div className="min-h-screen bg-transparent border shadow-lg shadow-gray-200/30 rounded-md text-white p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold mb-4">Resources</h1>
            <div>
              <ResourceCreationDialog goals={goals}></ResourceCreationDialog>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Left Sidebar for Goals (acts as categories) */}
            <div className="w-full md:w-1/4 pr-0 md:pr-6 mb-6 md:mb-0 lg:sticky lg:top-4 lg:h-[calc(100vh-32px)]">
              <h2 className="text-xl font-semibold mb-4">Goals</h2>
              <ul className="space-y-3">
                <li
                  className={`cursor-pointer p-2 rounded-md ${
                    selectedGoal === null
                      ? "bg-blue-500 text-white"
                      : "bg-primary-foreground text-gray-300"
                  } hover:bg-blue-600`}
                  onClick={() => handleGoalSelect(null)}
                >
                  All
                </li>
                {goals.data.map((goal) => (
                  <li
                    key={goal.id}
                    className={`cursor-pointer p-2 rounded-md ${
                      selectedGoal === goal.id
                        ? "bg-blue-500 text-white"
                        : "bg-primary-foreground text-gray-300"
                    } hover:bg-blue-600`}
                    onClick={() => handleGoalSelect(goal.id)}
                  >
                    {goal.title}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section: Search & Resource Display */}
            <div className="w-full md:w-3/4">
              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  className="p-3 w-full rounded-md bg-primary-foreground text-white focus:outline-none"
                  placeholder="Search resources by name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Resource Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resources.data.length > 0 ? (
                  resources.data.map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-primary-foreground p-4 rounded-md border shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">
                          {resource.title}
                        </h3>

                        <div>
                          <ResourceEditionDialog
                            id={resource.id}
                            goals={goals}
                          ></ResourceEditionDialog>
                          <Button
                            variant="ghost"
                            onClick={() => deleteResource(resource.id)}
                            className="p-0"
                          >
                            <FontAwesomeIcon
                              className="text-xl"
                              icon={faRemove}
                            ></FontAwesomeIcon>
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-400">
                        {resource.description}
                      </p>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline mt-2 inline-block"
                      >
                        View Resource
                      </a>
                    </div>
                  ))
                ) : (
                  <p>No resources found.</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Pagination links={links}></Pagination>
          </div>
        </div>
      </MainLayout>
    </>
  );
};
export default Index;
