import navLinks from "@/navlinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";

const Menu = () => {
  return (
    <div>
      <div className="flex flex-col gap-2 mt-4">
        {navLinks.map((link, index) => {
          return (
            <ul key={`${index}`} className="flex flex-col p-2">
              <li className="cursor-pointer hover:bg-secondary p-2 px-3 rounded-md">
                {link.path === "/logout" ? (
                  <Link
                    method="post"
                    href={route("logout")}
                    as="button"
                    className="flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={link.icon} />
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    href={`${link.path}`}
                    className="flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={link.icon} />
                    {link.name}
                  </Link>
                )}
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
