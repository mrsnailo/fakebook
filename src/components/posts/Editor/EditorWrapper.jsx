import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { IoMdClose, IoIosColorPalette } from "react-icons/io";
import { BiLeftArrow, BiWorld } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";
import { BsEmojiAngry } from "react-icons/bs";
import Editor from "./Editor";
import Avatar from "../../../assets/images/user/avatar.jpg";
import { AnimatePresence, motion } from "framer-motion"; // Corrected import
import { Oval } from "react-loader-spinner";
import {
  savePost,
  setActive,
  setContent,
} from "../../../store/UI/Post/postSlice";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

import { getCurrentTheme } from "../../../utils/themeUtil";
import {
  resetModal,
  setModalContent,
} from "../../../store/UI/Modal/modalSlice";

// Header
const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-[1fr_auto] items-center">
      <h2 className="text-[18px] font-bold text-center">Create Post</h2>
      <button
        type="button"
        onClick={() => {
          dispatch(resetModal());
        }}
        className="ml-auto text-xl p-2 rounded-full bg-bg hover:brightness-125 transition-colors"
        aria-label="Close"
      >
        <IoMdClose />
      </button>
    </div>
  );
};

// User Info
const UserInfo = ({
  buttonClickHandler,
  audience,
  feeling,
  activity,
  location,
}) => (
  <div className="flex items-center gap-3">
    <NavLink to="#">
      <img src={Avatar} className="w-10 h-10 rounded-full" alt="User avatar" />
    </NavLink>
    <div className="flex-1">
      <p className="text-sm">
        <span className="font-bold text-md">Shahid Parvez</span>
        {feeling && ` is ${feeling.emoji} feeling `}
        {feeling?.label && <span className="font-bold">{feeling.label}</span>}
        {activity && ` is ${activity.emoji} `}
        {activity?.label && <span className="font-bold">{activity.label}</span>}
        {location && ` in `}
        {location && <span className="font-bold">{location}</span>}
      </p>
      <button
        onClick={buttonClickHandler}
        className="flex items-center justify-center bg-hover px-2 py-1 rounded-md gap-1 text-[14px] transition-colors"
      >
        <BiWorld />
        <span className="font-semibold text-xs">{audience}</span>
        <FaCaretDown />
      </button>
    </div>
  </div>
);

// Theme Toggle
const ThemeToggleButton = ({ isOpen, toggle }) => (
  <AnimatePresence mode="wait">
    {isOpen ? (
      <motion.div
        key="arrow"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 90 }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer"
      >
        <BiLeftArrow onClick={toggle} />
      </motion.div>
    ) : (
      <motion.div
        key="palette"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer"
      >
        <IoIosColorPalette className="text-white" onClick={toggle} />
      </motion.div>
    )}
  </AnimatePresence>
);

// Theme List
const ThemeList = ({ themes, activeTheme, setActiveTheme }) => {
  console.log(themes);
  const themeVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <AnimatePresence>
      {themes.map((theme, index) => (
        <motion.div
          key={theme.name}
          variants={themeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2, delay: index * 0.05, ease: "easeOut" }}
          className={`w-6 h-6 z-[70] rounded-sm cursor-pointer bg-center bg-cover  ${
            activeTheme.name === theme.name
              ? "ring-2 ring-offset-2 ring-blue-500"
              : ""
          }`}
          style={{ backgroundImage: `url(${theme.url})` }}
          onClick={() => setActiveTheme(theme)}
          tabIndex={0}
          role="button"
          aria-label={`Select ${theme.name} theme`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setActiveTheme(theme);
          }}
        />
      ))}
    </AnimatePresence>
  );
};

// Emoji Picker
const EmojiPickerComponent = ({ isOpen, onEmojiClick, pickerRef }) =>
  isOpen && (
    <div className="absolute bottom-12 -right-5" ref={pickerRef}>
      <div className="relative shadow-lg">
        <EmojiPicker
          categories={[
            { category: "smileys_people", name: "Smileys & People" },
            { category: "animals_nature", name: "Animals & Nature" },
            { category: "food_drink", name: "Food & Drink" },
            { category: "travel_places", name: "Travel & Places" },
            { category: "activities", name: "Activities" },
            { category: "objects", name: "Objects" },
            { category: "symbols", name: "Symbols" },
            { category: "flags", name: "Flags" },
          ]}
          skinTonesDisabled
          emojiStyle="facebook"
          theme={getCurrentTheme() === "dark" ? "dark" : "light"}
          searchDisabled
          onEmojiClick={onEmojiClick}
          height={300}
          width={350}
        />
        <div className="absolute w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-gray-800 -bottom-4 right-5 -z-10" />
      </div>
    </div>
  );

// Main
export default function EditorWrapper({
  audienceSelector,
  feelingActivity,
  locationSelector,
}) {
  const dispatch = useDispatch();
  const draftPost = useSelector((state) => state.post.draftPost);
  const isContentEmpty = draftPost.content === "";
  const postbackgrounds = useSelector((state) => state.post.postbackgrounds);
  const activeBackground = useSelector((state) => state.post.activeBackground);
  const activeAccent = useSelector((state) => state.accent.activeAccent);

  const [listOpened, setListOpened] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);

  const editorRef = useRef(null);
  const pickerRef = useRef(null);
  const emojiIconRef = useRef(null);

  const contentHandler = (content) => dispatch(setContent(content));

  const submitHandler = () => {
    dispatch(
      setModalContent(
        <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
        />
      )
    );

    setTimeout(() => {
      dispatch(savePost());

      dispatch(setModalContent(<p>✅ Post saved successfully!</p>));

      setTimeout(() => {
        dispatch(resetModal());
      }, 1500);
    }, 2000);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target) &&
        emojiIconRef.current &&
        !emojiIconRef.current.contains(e.target)
      ) {
        setEmojiPicker(false);
      }
    };

    if (emojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [emojiPicker]);

  const handleEmoji = (emojiData) => {
    if (editorRef.current && emojiData?.emoji) {
      editorRef.current.insertMarkdown(emojiData.emoji);
      editorRef.current.focus();
    }
    setEmojiPicker(false);
  };

  return (
    <>
      <Header />
      <hr className="my-3 -mx-4 border-gray-200" />
      <UserInfo
        buttonClickHandler={audienceSelector}
        audience={draftPost.activeAudience}
        feeling={draftPost.feeling}
        activity={draftPost.activity}
        location={draftPost.location}
      />
      <div
        className={`my-5 -mx-4 bg-cover bg-center relative`}
        style={{ backgroundImage: `url(${activeBackground.url})` }}
      >
        <div className="absolute inset-0 backdrop-blur-sm bg-blue-200/20" />
        <div className="relative h-[250px] flex flex-col py-2 z-20 bg-black/50">
          <div className="flex-1 overflow-y-auto px-4">
            <Editor ref={editorRef} handleContent={contentHandler} />
          </div>
          <div className="flex justify-between items-center py-4 px-8 text-2xl">
            <div className="flex items-center gap-3">
              <ThemeToggleButton
                isOpen={listOpened}
                toggle={() => setListOpened((p) => !p)}
              />
              {listOpened && (
                <ThemeList
                  themes={postbackgrounds}
                  activeTheme={activeBackground}
                  setActiveTheme={(theme) => dispatch(setActive(theme))}
                />
              )}
            </div>
            <div className="relative z-[60]">
              <BsEmojiAngry
                ref={emojiIconRef}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the event from reaching document listener
                  setEmojiPicker((prev) => !prev);
                }}
                className="cursor-pointer text-white"
                aria-label="Open emoji picker"
              />
              <EmojiPickerComponent
                Theme="auto"
                isOpen={emojiPicker}
                onEmojiClick={handleEmoji}
                pickerRef={pickerRef}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-6 py-4 border-gray-200 border-[2px] rounded-md">
        <span className="font-semibold text-sm">Add to your post</span>
        <div className="flex gap-4 text-2xl">
          <MdOutlineEmojiEmotions
            className="text-yellow-500 cursor-pointer hover:text-yellow-600"
            onClick={feelingActivity}
          />
          <FaLocationDot
            className="text-red-600 cursor-pointer hover:text-red-700"
            onClick={locationSelector}
          />
        </div>
      </div>

      <div className="flex justify-center py-6">
        <button
          disabled={isContentEmpty}
          type="button"
          onClick={submitHandler}
          className="w-full px-4 py-2 rounded-md text-white font-semibold hover:brightness-110 transition-all"
          style={{ backgroundColor: isContentEmpty ? "gray" : activeAccent }}
        >
          Post
        </button>
      </div>
    </>
  );
}
