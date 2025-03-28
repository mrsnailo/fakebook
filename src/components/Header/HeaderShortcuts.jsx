import { useState, useEffect, useRef } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

import Accounts from "./shortcuts/Accounts/Accounts";
import avatar from "../../assets/images/user/avatar.jpg";
import { IoIosArrowDown } from "react-icons/io";

export default function HeaderShortcut() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLabel, setActiveLabel] = useState(null); // Track active icon
  const [menuContent, setMenuContent] = useState(null);
  const wrapperRef = useRef(null);

  const handleIconClick = (label) => {
    let newContent = null;

    switch (label) {
      case "Account":
        newContent = <Accounts />;
        break;
      case "Messenger":
        newContent = <div>Messenger Content</div>;
        break;
      case "Notification":
        newContent = <div>Notifications Content</div>;
        break;
      case "Menu":
        newContent = <div>Menu Content</div>;
        break;
      default:
        newContent = null;
    }

    setMenuContent(newContent);
    setActiveLabel(label); // Set the active label
    if (!isOpen && newContent) {
      setIsOpen(true);
    } else if (isOpen && label === activeLabel) {
      // Close the menu if the same icon is clicked again
      setIsOpen(false);
      setActiveLabel(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setMenuContent(null);
        setActiveLabel(null); // Reset active state
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="flex items-center gap-4 relative min-w-fit"
    >
      {[
        { icon: <CgMenuGridR />, label: "Menu" },
        { icon: <FaFacebookMessenger />, label: "Messenger" },
        { icon: <IoNotifications />, label: "Notification" },
      ].map((item, index) => (
        <div key={index}>
          <div
            className={`bg-hover p-3 rounded-full cursor-pointer text-xl hover:brightness-105 transition-colors ${
              activeLabel === item.label ? "text-accent bg-teal-100" : ""
            }`}
            title={item.label}
            onClick={() => handleIconClick(item.label)}
          >
            {item.icon}
          </div>
        </div>
      ))}

      <div key="account">
        <div
          className="relative bg-hover rounded-full cursor-pointer text-xl hover:brightness-105 transition-colors"
          title="Account"
          onClick={() => handleIconClick("Account")}
        >
          <img src={avatar} className="w-11 rounded-full border-2" />
          <div className="arrow-icon absolute right-0 bottom-0 bg-hover rounded-full text-[10px] p-1 font-extrabold transform translate-x">
            <IoIosArrowDown />
          </div>
        </div>
      </div>
      {isOpen && menuContent && <PopupMenu>{menuContent}</PopupMenu>}
    </div>
  );
}

function PopupMenu({ children }) {
  return (
    <div className="absolute top-16 right-3  transition-[height] duration-500 ease-in-out bg-secondary p-4 w-96 overflow-hidden rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-center">
      {children}
    </div>
  );
}
