import { NavLink, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { PiAirplayFill } from "react-icons/pi";
import { AiFillShop } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi2";
import { FaGamepad } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function HeaderNavigation() {
  const location = useLocation(); // Get current route
  const accentColor = useSelector((state) => state.accent.activeAccent);
  console.log(accentColor);

  return (
    <nav className="hidden md:flex justify-center items-center gap-2 xl:gap-4 mx-4">
      {[
        { to: "/feed", icon: <IoHome />, label: "Home" },
        { to: "/watch", icon: <PiAirplayFill />, label: "Videos" },
        { to: "/marketplace", icon: <AiFillShop />, label: "Shop" },
        { to: "/groups", icon: <HiUserGroup />, label: "Groups" },
        { to: "/gaming", icon: <FaGamepad />, label: "Gaming" },
      ].map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `relative py-2 px-4 xl:px-7 rounded-lg cursor-pointer text-2xl flex items-center justify-center
              ${
                isActive || (to === "/feed" && location.pathname === "/")
                  ? "after:content-[''] after:absolute after:bottom-[-8px] after:rounded-md after:left-0 after:w-full after:h-1 after:bg-[var(--tw-after-bg)]"
                  : "text-gray-500 hover:bg-hover"
              }`
          }
          style={({ isActive }) => ({
            color:
              isActive || (to === "/feed" && location.pathname === "/")
                ? accentColor
                : undefined,
            "--tw-after-bg": accentColor,
          })}
          title={label}
        >
          {icon}
        </NavLink>
      ))}
    </nav>
  );
}
