import avatar from "../../../../assets/images/user/avatar.jpg";
import { PiUserSwitchFill } from "react-icons/pi";
import { FaBrush, FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { FaPaintRoller } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { useRef, useState } from "react";

import styles from "./Accounts.module.css";
import { BsMoonFill } from "react-icons/bs";
import { getCurrentTheme, toggleTheme } from "../../../../utils/themeUtil";

export default function Accounts() {
  const [activeMenu, setActiveMenu] = useState("main");

  const mainRef = useRef(null);
  const themeRef = useRef(null);
  const currentMode = getCurrentTheme();
  const [selectedOption, setSelectedOption] = useState(currentMode);
  const [selectedAccent, setSelectedAccent] = useState("Lavender");

  return (
    <>
      {/* main menu */}
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        nodeRef={mainRef}
        classNames={{
          enter: styles["menuPrimary-enter"],
          enterActive: styles["menuPrimary-enter-active"],
          exit: styles["menuPrimary-exit"],
          exitActive: styles["menuPrimary-exit-active"],
        }}
        unmountOnExit
      >
        <div ref={mainRef} className="main-menu">
          <div className="wrapper-up bg-bg  p-4 rounded-xl shadow-md">
            <div className="profiles flex flex-col rounded-lg gap-2 justify-start w-60 after:content-[''] after-absolute after:left-0 after:w-full after:h-[2px] after:bg-secondary after:rounded-md">
              <Profiles image={avatar} label="Shahid Parvez" />
            </div>
            <div className="pages flex flex-col  gap-2 mt-2 after:content-[''] after-absolute after:left-0 after:w-full after:h-[2px] after:bg-secondary after:rounded-md ">
              <Profiles image={avatar} label="Shahid Parvez" />
              <Profiles image={avatar} label="Shahid Parvez" />
            </div>
            <button className="flex items-center  justify-center gap-2 text-text bg-hover border-none rounded-md mt-3 w-full px-4 py-2 hover:brightness-105">
              <PiUserSwitchFill />
              <span> See all profiles</span>
            </button>
          </div>
          <div className="wrapper-bottom my-3">
            <ListItem
              menuSwitch={() => setActiveMenu("themes")}
              leftIcon={<FaBrush />}
              rightIcon={<FaChevronRight />}
            >
              Apperance
            </ListItem>
            <ListItem leftIcon={<IoSettings />} rightIcon={<FaChevronRight />}>
              Settings & Privacy
            </ListItem>
            <ListItem leftIcon={<MdOutlineLogout />}>Logout</ListItem>
          </div>
        </div>
      </CSSTransition>
      {/* themes menu */}
      <CSSTransition
        in={activeMenu === "themes"}
        timeout={500}
        classNames={{
          enter: styles["menuThemes-enter"],
          enterActive: styles["menuThemes-enter-active"],
          exit: styles["menuThemes-exit"],
          exitActive: styles["menuThemes-exit-active"],
        }}
        unmountOnExit
        nodeRef={themeRef}
      >
        <div ref={themeRef} className="wrapper-bottom my-3 p4">
          <div className="heading mb-3 flex gap-2 text-xl font-bold items-center">
            <div
              onClick={() => {
                setActiveMenu("main");
              }}
              className="icon hover:bg-hover p-2 hover:rounded-full hover:cursor-pointer"
            >
              <FaChevronLeft />
            </div>
            <div className="heading">
              <h1>Apperance</h1>
            </div>
          </div>
          {/* dark mode  */}
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
                {/* toogle options */}
                <div className="options">
                  <div class="flex items-center justify-between mb-4 pt-2">
                    <label
                      htmlFor="default-radio-1"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      On
                    </label>
                    <input
                      id="default-radio-1"
                      checked={selectedOption == "dark"}
                      onChange={() => {
                        setSelectedOption(toggleTheme());
                      }}
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <label
                      htmlFor="default-radio-2"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      Off
                    </label>
                    <input
                      checked={selectedOption == "light"}
                      onChange={() => {
                        setSelectedOption(toggleTheme());
                      }}
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                {/* toogle options */}
                <div className="options">
                  <div class="flex items-center justify-between mb-2 pt-2">
                    <label
                      htmlFor="default-radio-2"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      Lavender
                    </label>
                    <input
                      checked={selectedAccent == "Lavender"}
                      onChange={() => {
                        setSelectedAccent("Lavender");
                      }}
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div class="flex items-center justify-between mb-2 pt-2">
                    <label
                      htmlFor="default-radio-2"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      Lavender
                    </label>
                    <input
                      checked={selectedAccent == "Lavender"}
                      onChange={() => {
                        setSelectedAccent("Lavender");
                      }}
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div class="flex items-center justify-between mb-2 pt-2">
                    <label
                      htmlFor="default-radio-2"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      Lavender
                    </label>
                    <input
                      checked={selectedAccent == "Lavender"}
                      onChange={() => {
                        setSelectedAccent("Lavender");
                      }}
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div class="flex items-center justify-between mb-2 pt-2">
                    <label
                      htmlFor="default-radio-2"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      Lavender
                    </label>
                    <input
                      checked={selectedAccent == "Lavender"}
                      onChange={() => {
                        setSelectedAccent("Lavender");
                      }}
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div class="flex items-center justify-between mb-2 pt-2">
                    <label
                      htmlFor="default-radio-2"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      Lavender
                    </label>
                    <input
                      checked={selectedAccent == "Lavender"}
                      onChange={() => {
                        setSelectedAccent("Lavender");
                      }}
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
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
