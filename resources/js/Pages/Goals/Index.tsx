import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";

// Mock data for categories and goals
const categories = ["All", "Health", "Learning", "Fitness"];

const goals = [
  {
    id: 1,
    title: "Finish React Component",
    description: "Complete the React component for user login.",
    deadline: "2024-09-15",
    progress: 50,
    status: "In Progress",
    category: "Learning",
  },
  {
    id: 2,
    title: "Read 1 Book a Month",
    description: "Read one self-improvement book each month.",
    deadline: "2024-10-01",
    progress: 80,
    status: "In Progress",
    category: "Learning",
  },
  {
    id: 3,
    title: "Run 10km",
    description: "Achieve running 10 kilometers without stopping.",
    deadline: "2024-09-25",
    progress: 100,
    status: "Completed",
    category: "Fitness",
  },
  {
    id: 4,
    title: "Morning Meditation",
    description: "Practice 10 minutes of meditation every morning.",
    deadline: "2024-09-20",
    progress: 40,
    status: "In Progress",
    category: "Health",
  },
];

const Index = ({ auth }: PageProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter goals based on selected category and search term
  const filteredGoals = goals.filter((goal) => {
    const inCategory =
      selectedCategory === "All" || goal.category === selectedCategory;
    const matchesSearch = goal.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return inCategory && matchesSearch;
  });

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
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`cursor-pointer p-2 rounded-md ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-primary-foreground text-gray-300"
                    } hover:bg-blue-600`}
                    onClick={() => setSelectedCategory(category)}
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Goal Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGoals.length > 0 ? (
                  filteredGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className="bg-primary-foreground p-6 rounded-lg border shadow-lg shadow-gray-200/30"
                    >
                      {/* Goal Title and Status */}
                      <div className="flex flex-col justify-between gap-4 items-start mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {goal.title}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">
                            {goal.description}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            goal.status === "Completed"
                              ? "bg-green-500 text-white"
                              : "bg-yellow-500 text-gray-900"
                          }`}
                        >
                          {goal.status}
                        </span>
                      </div>

                      {/* Progress and Deadline */}
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-400 text-sm">
                          Deadline: {goal.deadline}
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
        </div>
      </MainLayout>
    </>
  );
};

export default Index;
