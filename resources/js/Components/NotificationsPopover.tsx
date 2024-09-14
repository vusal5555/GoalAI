// NotificationsPopover.tsx

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/Components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

// Sample notifications data (You might want to pass this as props)
const notifications = [
  { id: 1, message: "New goal created: Learn React", time: "2 hours ago" },
  {
    id: 2,
    message: "Milestone achieved: 50% of goal completed",
    time: "1 day ago",
  },
  {
    id: 3,
    message: "Reminder: Complete your daily exercise",
    time: "3 days ago",
  },
];

const NotificationsPopover = () => {
  const [open, setOpen] = useState(false);
  const notificationCount = notifications.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <FontAwesomeIcon className="text-xl" icon={faBell} />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {notificationCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-4">
        <div className="flex flex-col gap-4">
          <h4 className="font-bold">Notifications</h4>
          {notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="bg-gray-800 p-2 rounded-md"
                >
                  <p className="text-white">{notification.message}</p>
                  <span className="text-xs text-gray-400">
                    {notification.time}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
