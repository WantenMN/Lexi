import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import InputIcon from "../icons/InputIcon";
import OutputIcon from "../icons/OutputIcon";
import MyWordsIcon from "../icons/MyWordsIcon";

const Nav = () => {
  const pathname = useLocation().pathname;
  const links = [
    {
      name: "input",
      path: "/",
      icon: InputIcon,
    },
    {
      name: "output",
      path: "/output",
      icon: OutputIcon,
    },
    {
      name: "my-words",
      path: "/my-words",
      icon: MyWordsIcon,
    },
  ];

  const navList = links.map((link) => (
    <li
      className={classNames(
        "cursor-pointer transition duration-300 hover:bg-red-50 ",
        {
          "border-b-2 border-b-red-600": pathname === link.path,
        }
      )}
      title={link.name}
      key={link.path}
    >
      <Link
        className={classNames("block p-4", {
          "hover:text-red-400": pathname !== link.path,
        })}
        to={link.path}
      >
        <link.icon
          className={classNames("duration-700", {
            "text-red-500": pathname === link.path,
          })}
        />
      </Link>
    </li>
  ));

  return (
    <nav className="border-b">
      <ul className="flex">{navList}</ul>
    </nav>
  );
};
export default Nav;
