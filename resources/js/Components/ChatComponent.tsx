import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/Components/ui/select";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils"; // Utility function for conditional classes

// Define interfaces
export interface Goal {
  id: number;
  title: string;
}

interface Message {
  sender: "user" | "ai";
  content: string;
}

interface ChatComponentProps {
  goals: Goal[];
}

const ChatComponent: React.FC<ChatComponentProps> = ({ goals }) => {
  const [selectedGoalId, setSelectedGoalId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");
  const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!selectedGoalId) {
      return (
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components and dependencies to your app using the cli.
          </AlertDescription>
        </Alert>
      );
    }

    if (userMessage.trim() === "") {
      return;
    }

    // Add user's message to the chat
    const newMessage: Message = {
      sender: "user",
      content: userMessage,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Prepare data for the backend
    const payload = {
      message: userMessage,
      goal_id: selectedGoalId,
      conversation: [...messages, newMessage],
    };

    setIsLoading(true);

    // Send the message to the backend
    axios
      .post("/chat/message", payload)
      .then((response) => {
        // Add AI's response to the chat
        const aiMessage: Message = {
          sender: "ai",
          content: response.data.message,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);

        // Check if content is generated
        if (response.data.contentGenerated) {
          setShowSaveButton(true);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Clear the input
    setUserMessage("");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const saveContent = () => {
    axios
      .post("/chat/save-content", {
        goal_id: selectedGoalId,
      })
      .then((response) => {
        alert("Content saved successfully.");
        setShowSaveButton(false);
      })
      .catch((error) => {
        console.error("Error saving content:", error);
        alert("Failed to save content.");
      });
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">AI Mentor Chat</h2>

      {/* Goal Selection */}
      <div className="mb-4">
        <label htmlFor="goal-select" className="block mb-2 font-medium">
          Select a Goal:
        </label>
        <Select value={selectedGoalId} onValueChange={setSelectedGoalId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="--Please choose an option--" />
          </SelectTrigger>
          <SelectContent>
            {goals.map((goal) => (
              <SelectItem key={goal.id} value={goal.id.toString()}>
                {goal.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col h-[600px] border  rounded-md overflow-hidden bg-card text-card-foreground">
        {/* Messages */}
        <ScrollArea
          className="flex-1 p-4 space-y-4"
          ref={scrollAreaRef}
          style={{ height: "100%", maxHeight: "100%" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={cn(
                  "rounded-lg p-3 max-w-xl break-words",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h2 className="text-xl font-bold" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h3 className="text-lg font-bold" {...props} />
                    ),
                    // Customize other elements as needed
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <p className="text-center text-muted-foreground">Thinking...</p>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4 bg-background">
          <div className="flex items-center">
            <Input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 mr-2"
              disabled={isLoading}
            />
            <Button onClick={sendMessage} disabled={isLoading}>
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {showSaveButton && (
        <Button
          onClick={saveContent}
          variant="default"
          className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Save Generated Content
        </Button>
      )}
    </div>
  );
};

export default ChatComponent;
