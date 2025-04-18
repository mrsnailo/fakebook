import avatar from "../../../../assets/images/user/avatar.jpg";
import { PiUserSwitchFill } from "react-icons/pi";
import { FaBrush, FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaPaintRoller } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { BsMoonFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import { getCurrentTheme, toggleTheme } from "../../../../utils/themeUtil";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../../../store/UI/Accent/accentSlice";

export default function Accounts() {
  const [activeMenu, setActiveMenu] = useState("main");
  const accentOptions = useSelector((state) => state.accent.options);
  const selectedAccent = useSelector((state) => state.accent.activeAccent);
  const dispatch = useDispatch();

  const mainRef = useRef(null);
  const themeRef = useRef(null);
  const currentMode = getCurrentTheme();
  const [selectedOption, setSelectedOption] = useState(currentMode);

  // Animation variants for main menu
  const mainMenuVariants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.5 } },
  };

  // Animation variants for themes menu
  const themesMenuVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Main menu */}
        {activeMenu === "main" && (
          <motion.div
            key="main"
            ref={mainRef}
            className="main-menu"
            variants={mainMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="wrapper-up bg-bg p-4 rounded-xl shadow-md">
              <div className="profiles flex flex-col rounded-lg gap-2 justify-start w-60 after:content-[''] after-absolute after:left-0 after:w-full after:h-[2px] after:bg-secondary after:rounded-md">
                <Profiles image={avatar} label="Shahid Parvez" />
              </div>
              <div className="pages flex flex-col gap-2 mt-2 after:content-[''] after-absolute after:left-0 after:w-full after:h-[2px] after:bg-secondary after:rounded-md">
                <Profiles image={avatar} label="Shahid Parvez" />
                <Profiles image={avatar} label="Shahid Parvez" />
              </div>
              <button className="flex items-center justify-center gap-2 text-text bg-hover border-none rounded-md mt-3 w-full px-4 py-2 hover:brightness-105">
                <PiUserSwitchFill />
                <span>See all profiles</span>
              </button>
            </div>
            <div className="wrapper-bottom my-3">
              <ListItem
                menuSwitch={() => setActiveMenu("themes")}
                leftIcon={<FaBrush />}
                rightIcon={<FaChevronRight />}
              >
                Appearance
              </ListItem>
              <ListItem
                leftIcon={<IoSettings />}
                rightIcon={<FaChevronRight />}
              >
                Settings & Privacy
              </ListItem>
              <ListItem leftIcon={<MdOutlineLogout />}>Logout</ListItem>
            </div>
          </motion.div>
        )}

        {/* Themes menu */}
        {activeMenu === "themes" && (
          <motion.div
            key="themes"
            ref={themeRef}
            className="wrapper-bottom my-2 p-2"
            variants={themesMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="heading mb-3 flex gap-2 text-xl font-bold items-center">
              <div
                onClick={() => setActiveMenu("main")}
                className="icon hover:bg-hover p-2 hover:rounded-full hover:cursor-pointer"
              >
                <FaChevronLeft />
              </div>
              <div className="heading">
                <h1>Appearance</h1>
              </div>
            </div>
            {/* Dark mode */}
            <div className="dark-mode mb-3">
              <div className="ui-theme flex gap-2 text-left justify-start">
                <span className="left-icon p-2 h-8 w-8 rounded-full bg-hover">
                  <BsMoonFill />
                </span>
                <div className="fields">
                  <p className="heading">Dark Mode</p>
                  <span className="block text-sm">
                    Adjust the appearance of Facebook to reduce glare and give
                    your eyes a break.
                  </span>
                  <div className="options">
                    <div className="flex items-center justify-between mb-4 pt-2">
                      <label
                        htmlFor="default-radio-1"
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        On
                      </label>
                      <input
                        id="default-radio-1"
                        checked={selectedOption === "dark"}
                        onChange={() => {
                          if (currentMode === "dark") return;
                          toggleTheme();
                          setSelectedOption("dark");
                        }}
                        type="radio"
                        value=""
                        name="theme-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="default-radio-2"
                        className="font-medium text-gray-900 dark:text-gray-300"
                      >
                        Off
                      </label>
                      <input
                        checked={selectedOption === "light"}
                        onChange={() => {
                          if (currentMode === "light") return;
                          toggleTheme();
                          setSelectedOption("light");
                        }}
                        id="default-radio-2"
                        type="radio"
                        value=""
                        name="theme-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Accent */}
            <div className="accent">
              <div className="ui-theme flex gap-2 text-left justify-start">
                <span className="left-icon p-2 h-8 w-8 rounded-full bg-hover">
                  <FaPaintRoller />
                </span>
                <div className="fields">
                  <p className="heading">Accent</p>
                  <span className="block text-sm">
                    Choose your favorite color for highlighting the interface.
                  </span>
                  <div className="accent-selector">
                    {accentOptions.map(({ name, color }, index) => (
                      <div key={index} className="options">
                        <div className="flex items-center justify-between mb-2 pt-2">
                          <div className="flex items-center">
                            <div
                              className="w-5 h-5 mr-2 rounded-full"
                              style={{ backgroundColor: color }}
                            ></div>
                            <label
                              htmlFor={`accent-radio-${index}`}
                              className="font-medium text-gray-900 dark:text-gray-300"
                            >
                              {name}
                            </label>
                          </div>
                          <input
                            checked={selectedAccent === color}
                            onChange={() => {
                              dispatch(setActive(color));
                            }}
                            id={`accent-radio-${index}`}
                            type="radio"
                            value={color}
                            name="accent-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Profiles(props) {
  return (
    <div className="profile flex gap-2 items-center w-full hover:bg-hover px-1 py-3 rounded-md">
      <div className="image">
        <img src={props.image} className="w-8 rounded-full" alt="avatar" />
      </div>
      <div className="label text-sm font-bold">{props.label}</div>
    </div>
  );
}

function ListItem(props) {
  return (
    <div
      onClick={props.menuSwitch}
      className="items profile w-full hover:bg-hover px-1 py-3 rounded-md"
    >
      <a href="#" className="flex items-center justify-between w-full px-2">
        <div className="flex items-center gap-2">
          <span className="left-icon p-2 rounded-full bg-hover">
            {props.leftIcon}
          </span>
          {props.children}
        </div>
        <span className="right-icon">{props.rightIcon}</span>
      </a>
    </div>
  );
}
