import { HiOutlineSearch } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";
import { GoDotFill } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import avatar from "../../assets/images/search/avatar.jpg";
import NormalInput from "../UI/NormalInput";

export default function HeaderSearch() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  const focusHandler = () => {
    setIsFocused(true);
  };
  const blurHandler = () => {
    if (!searchQuery) {
      setIsFocused(false);
    }
  };
  const changeHandler = (e) => {
    setSearchQuery(e.target.alue);
  };

  return (
    <div className={`flex relative ${isFocused ? "w-60" : "w-auto"}`}>
      <div
        className={`wrapper bg-secondary  flex flex-col items-center gap-3 z-[100] ${
          isFocused &&
          "absolute left-0 top-0 shadow-sm transform -translate-y-4 -translate-x-4 px-5 w-80"
        }`}
      >
        <div className="search-box flex gap-3 items-center justify-start">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            {isFocused ? (
              <IoMdArrowRoundBack
                onClick={() => {
                  setIsFocused(false);
                  setSearchQuery("");
                }}
              />
            ) : (
              <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 object-contain cursor-pointer"
              />
            )}
          </NavLink>

          {/* Search Section */}
          <div className="flex-grow max-w-[400px]">
            <div
              className={`relative transition-all duration-200 lg:w-auto ${
                !isFocused && "w-10"
              } h-10 flex items-center justify-center rounded-full bg-gray-200 lg:bg-transparent`}
              onClick={() => setIsFocused(true)}
            >
              {!isFocused && (
                <HiOutlineSearch className="text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              )}

              <NormalInput
                changeHandler={changeHandler}
                blurHandler={blurHandler}
                focusHandler={focusHandler}
                dataRef={searchRef}
                isFocused={isFocused}
                placeHolder="Search Facebook"
                inputValue={searchQuery}
              />
            </div>
          </div>
        </div>

        {/* Recent searches */}
        {isFocused && (
          <div className="recent-search w-full">
            <div className="heading flex px-2 py-3 justify-between">
              <h3 className="text-bold">Recent</h3>
              <span>
                <a href="#" className="text-accent">
                  Edit
                </a>
              </span>
            </div>
            <div className="searches">
              <SearchItem
                avatar={avatar}
                title="Naznin Hasan"
                leftIcon={<RxCross2 />}
                updates={3}
              />
              <SearchItem
                avatar={avatar}
                title="Nahid Uz Zaman"
                leftIcon={<RxCross2 />}
                updates={0}
              />
              <SearchItem
                avatar={avatar}
                title="Nusrat Zahan"
                leftIcon={<RxCross2 />}
                updates={2}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchItem(props) {
  return (
    <div className="flex wrapper justify-between items-center w-full p-3">
      <div className="left-part flex gap-1 items-center">
        <div className="avatar">
          <img src={props.avatar} alt="avatar" className="w-10 rounded-full" />
        </div>
        <div className="details flex flex-col ">
          <p className={`name ${props.updates && "font-bold"}`}>
            {props.title}
          </p>
          {props.updates && (
            <div className="flex gap-1 items-center text-sm text-accent">
              {" "}
              <GoDotFill />
              <span className="updates text-text">{props.updates} new</span>
            </div>
          )}
        </div>
      </div>
      <div className="left-icon">{props.leftIcon}</div>
    </div>
  );
}
