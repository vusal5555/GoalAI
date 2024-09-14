import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import Logo from "./Logo";
import Menu from "./Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import GoalCreationDialog from "./GoalCreatianDialog";
import NotificationsPopover from "./NotificationsPopover";
import { Button } from "./ui/button";

const MobileSidebar = () => {
  return (
    <div className="flex items-center justify-between lg:hidden p-3 ">
      <div>
        <Logo></Logo>
      </div>

      <div className="flex items-center">
        <GoalCreationDialog></GoalCreationDialog>
        <NotificationsPopover></NotificationsPopover>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="w-0">
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Logo></Logo>
              </SheetTitle>

              <div>
                <Menu></Menu>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
export default MobileSidebar;
