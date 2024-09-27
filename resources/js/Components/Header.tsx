import { useState, useEffect } from "react";
import { PageProps } from "@/types";
import GoalCreationDialog from "./GoalCreatianDialog";
import NotificationsPopover from "./NotificationsPopover";

const Header = ({ auth }: PageProps) => {
  // const [hasScrolled, setHasScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setHasScrolled(true);
  //     } else {
  //       setHasScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div
      className={`w-full flex justify-center lg:justify-between items-center px-4 transition-all duration-300 `}
    >
      <h1 className="text-3xl font-extrabold">Hi, {auth.user.name}!</h1>

      <div className="flex items-center">
        {/* Goal Creation Dialog */}
        <div className="hidden lg:block">
          <GoalCreationDialog />
        </div>

        {/* Notifications Popover */}
        <div className="hidden lg:block">
          <NotificationsPopover />
        </div>
      </div>
    </div>
  );
};

export default Header;
