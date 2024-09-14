import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { useState } from "react";

type Milestone = {
  id: number;
  step: string;
  description: string;
  completed: boolean;
  suggestedResources: string[];
  userResources: string[];
};

const Index = ({ auth }: PageProps) => {
  // Dynamic roadmap, initially empty
  const [roadmap, setRoadmap] = useState<Milestone[]>([]);

  // AI Chat Initial Messages
  const initialChat = [
    {
      user: "ai",
      text: "Hi! Let me help you with your goal. Ask me anything.",
    },
  ];

  const [goal, setGoal] = useState<string>("");
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    null
  );
  const [chatLog, setChatLog] = useState(initialChat);
  const [userMessage, setUserMessage] = useState<string>("");

  // Predefined milestones based on a generic learning goal
  const generateRoadmap = (goal: string): Milestone[] => {
    return [
      {
        id: 1,
        step: `Understand the Basics of ${goal}`,
        description: `Start learning the basic concepts of ${goal} (variables, loops, etc.).`,
        completed: false,
        suggestedResources: [
          `Introduction to ${goal} (Video)`,
          `Basics of ${goal} (Article)`,
        ],
        userResources: [],
      },
      {
        id: 2,
        step: `Learn Functions in ${goal}`,
        description: `Focus on learning functions, callbacks, and how to structure your code in ${goal}.`,
        completed: false,
        suggestedResources: [
          `Understanding Functions in ${goal} (Tutorial)`,
          `Callbacks and Closures (Video)`,
        ],
        userResources: [],
      },
      {
        id: 3,
        step: "Build Mini Projects",
        description: `Create small projects to practice ${goal}.`,
        completed: false,
        suggestedResources: [
          "Project Ideas for Practice (Blog)",
          "How to Build a Project (Video)",
        ],
        userResources: [],
      },
      {
        id: 4,
        step: "Advanced Concepts",
        description: `Learn advanced topics related to ${goal} like asynchronous programming, APIs, etc.`,
        completed: false,
        suggestedResources: [
          "Async Programming in JavaScript (Video)",
          "Mastering APIs (Article)",
        ],
        userResources: [],
      },
      {
        id: 5,
        step: "Final Project",
        description: `Create a final project to showcase what you have learned in ${goal}.`,
        completed: false,
        suggestedResources: [
          "How to Build a Full Project (Course)",
          "Showcasing Your Project (Blog)",
        ],
        userResources: [],
      },
    ];
  };

  // Handle Goal Submission
  const handleGoalSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (goal === "") return;

    const generatedRoadmap = generateRoadmap(goal);
    setRoadmap(generatedRoadmap); // Set the dynamically generated roadmap
  };

  // Handle AI Chat Input
  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userMessage.trim()) {
      const newLog = { user: "user", text: userMessage };
      setChatLog([
        ...chatLog,
        newLog,
        { user: "ai", text: "Let me guide you!" },
      ]);
      setUserMessage("");
    }
  };

  // Handle Milestone Click
  const handleMilestoneClick = (milestone: Milestone) => {
    setSelectedMilestone(milestone);
    setChatLog([]);
    const aiIntro = {
      user: "ai",
      text: `Great! You're working on "${milestone.step}". Here's what you should focus on for this step: ${milestone.description}.`,
    };

    const aiResources = {
      user: "ai",
      text: `I recommend starting with these resources: ${milestone.suggestedResources.join(
        ", "
      )}.`,
    };

    setChatLog([...chatLog, aiIntro, aiResources]);
  };

  // Handle Adding User Resource to the Milestone
  const handleAddResource = (milestone: Milestone, newResource: string) => {
    const updatedRoadmap = roadmap.map((item) =>
      item.id === milestone.id
        ? { ...item, userResources: [...item.userResources, newResource] }
        : item
    );
    setRoadmap(updatedRoadmap);
  };

  // Mark Milestone as Complete
  const handleMarkAsComplete = (milestone: Milestone) => {
    const updatedRoadmap = roadmap.map((item) =>
      item.id === milestone.id ? { ...item, completed: true } : item
    );
    setRoadmap(updatedRoadmap);
  };

  const handleClearChat = () => {
    setChatLog([]); // Clears the chat log
  };

  return (
    <>
      <Head title="AI Roadmaps"></Head>

      <MainLayout auth={auth}>
        <div className="min-h-screen bg-transparent text-white border shadow-lg shadow-gray-200/20 rounded-lg">
          {/* Goal Input Section */}
          <form className="p-6">
            <h1 className="text-3xl font-bold">AI-Powered Goal Setting</h1>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                className="p-3 w-full rounded-md bg-primary-foreground text-white focus:outline-none"
                placeholder="Enter your goal..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
              <button
                className="bg-blue-500 px-6 py-3 rounded-md hover:bg-blue-600"
                onClick={(e) => handleGoalSubmit(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleGoalSubmit(
                      e as unknown as React.MouseEvent<
                        HTMLButtonElement,
                        MouseEvent
                      >
                    );
                  }
                }}
              >
                Submit
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 min-h-screen">
            {/* Left: Roadmap Section */}
            <div className="bg-primary-foreground p-6 rounded-md border">
              <h2 className="text-xl font-bold">Your Roadmap</h2>
              <div className="mt-4">
                {roadmap.length > 0 ? (
                  roadmap.map((milestone) => (
                    <div
                      key={milestone.id}
                      className="p-4 mb-4 rounded-md cursor-pointer bg-gray-800"
                      onClick={() => handleMilestoneClick(milestone)}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">
                          {milestone.step}
                        </h3>

                        {milestone.completed ? (
                          <span className="text-green-500 bg-gray-700 px-4 py-2 rounded-md">
                            Completed
                          </span>
                        ) : (
                          <span className="text-red-500 bg-gray-700 px-4 py-2 rounded-md">
                            Incomplete
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-300">
                        {milestone.description}
                      </p>
                      <button
                        className="text-sm bg-blue-500 mt-2 px-2 py-1 rounded hover:bg-blue-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsComplete(milestone);
                        }}
                      >
                        Mark as Complete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No roadmap available. Submit a goal to generate one.</p>
                )}
              </div>

              {/* Show Selected Milestone Details */}
              {selectedMilestone && (
                <div className="mt-6 p-4 bg-primary-foreground rounded-md border">
                  <h3 className="text-lg font-bold">Milestone Details</h3>
                  <p>{selectedMilestone.description}</p>
                  <div className="mt-4">
                    <h4 className="text-md font-semibold">Resources:</h4>
                    <ul>
                      {selectedMilestone.suggestedResources.map(
                        (resource, index) => (
                          <li key={index} className="text-sm text-gray-300">
                            {resource}
                          </li>
                        )
                      )}
                    </ul>
                    <h4 className="text-md font-semibold mt-4">
                      Your Resources:
                    </h4>
                    <ul>
                      {selectedMilestone.userResources.map(
                        (resource, index) => (
                          <li key={index} className="text-sm text-gray-300">
                            {resource}
                          </li>
                        )
                      )}
                    </ul>
                    <input
                      type="text"
                      className="p-2 w-full bg-primary-foreground rounded-md mt-4 focus:outline-none"
                      placeholder="Add a custom resource..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddResource(
                            selectedMilestone,
                            e.currentTarget.value
                          );
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {roadmap.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm text-gray-300">Progress:</h3>
                  <div className="w-full bg-gray-600 h-2 rounded-md">
                    <div
                      className="bg-blue-500 h-full rounded-md"
                      style={{
                        width: `${
                          (roadmap.filter((m) => m.completed).length /
                            roadmap.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: AI Chat Section */}
            <div className="bg-primary-foreground p-6 rounded-md flex flex-col justify-between border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold mb-4">AI Mentor Chat</h2>
                <button
                  className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 mt-2"
                  onClick={handleClearChat}
                >
                  Clear Chat
                </button>
              </div>

              <div className="flex-grow overflow-y-auto mb-4">
                {chatLog.map((log, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      log.user === "ai" ? "justify-start" : "justify-end"
                    } mb-2`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        log.user === "ai"
                          ? "bg-gray-300 text-gray-800"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      <strong>
                        {log.user === "ai" ? "AI Mentor" : "You"}:
                      </strong>{" "}
                      {log.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Chat Input */}
              <form onSubmit={handleChatSubmit} className="flex">
                <input
                  type="text"
                  className="p-2 w-full bg-primary-foreground rounded-l-md focus:outline-none"
                  placeholder="Ask your AI mentor..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                />
                <button
                  className="bg-blue-500 px-6 py-2 rounded-r-md hover:bg-blue-600"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Section: Motivational Feedback */}
          <div className="p-6 bg-transparent rounded-md text-center">
            <h2 className="text-xl font-bold">Keep Going!</h2>
            <p>
              You're doing great. Remember, small progress every day leads to
              big results!
            </p>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Index;
