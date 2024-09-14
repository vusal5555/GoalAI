import Menu from "./Menu";
import Logo from "./Logo";

const Sidebar = () => {
  return (
    <aside className="hidden z-50 fixed lg:flex flex-col w-[300px] h-screen shadow-lg shadow-gray-100/20">
      <Logo></Logo>
      <Menu></Menu>
    </aside>
  );
};

export default Sidebar;
