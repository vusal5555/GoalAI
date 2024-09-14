import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";

// Mock data for resources
const initialResources = [
  {
    id: 1,
    title: "Beginner's Guide to JavaScript",
    description: "A comprehensive guide to start learning JavaScript.",
    category: "Programming",
    link: "https://example.com/js-guide",
  },
  {
    id: 2,
    title: "10 Tips for a Healthy Diet",
    description: "Essential tips to maintain a healthy diet.",
    category: "Fitness",
    link: "https://example.com/healthy-diet",
  },
  {
    id: 3,
    title: "How to Start Meditation",
    description: "A beginner's guide to meditation.",
    category: "Mindfulness",
    link: "https://example.com/meditation",
  },
];

// Mock data for categories
const categories = ["All", "Programming", "Fitness", "Mindfulness"];

const Index = ({ auth }: PageProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [resources, setResources] = useState(initialResources);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter resources based on category and search term
  const filteredResources = resources.filter((resource) => {
    const inCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return inCategory && matchesSearch;
  });

  return (
    <>
      <Head title="Resources" />

      <MainLayout auth={auth}>
        <div className="min-h-screen bg-transparent border shadow-lg shadow-gray-200/30 rounded-md text-white p-6">
          <h1 className="text-3xl font-bold mb-4">Resources</h1>

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

            {/* Right Section: Search & Resource Display */}
            <div className="w-full md:w-3/4">
              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  className="p-3 w-full rounded-md bg-primary-foreground text-white focus:outline-none"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Resource Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-primary-foreground p-4 rounded-md border shadow-md"
                    >
                      <h3 className="text-xl font-semibold text-white">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {resource.description}
                      </p>
                      <a
                        href={resource.link}
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
        </div>
      </MainLayout>
    </>
  );
};

export default Index;
