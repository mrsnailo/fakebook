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
import { setActive } from "../../../store/UI/Post/postSlice";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

// Reusable Header Component
const Header = ({ onClose }) => (
  <div className="grid grid-cols-[1fr_auto] items-center">
    <h2 className="text-[18px] font-bold text-center">Create Post</h2>
    <button
      type="button"
      onClick={onClose}
      className="ml-auto text-xl p-2 rounded-full bg-bg hover:brightness-125 transition-colors"
      aria-label="Close"
    >
      <IoMdClose />
    </button>
  </div>
);

// Reusable User Info Component
const UserInfo = ({ buttonClickHandler, audience, feeling, activity }) => (
  <div className="flex items-center gap-3">
    <NavLink to="#">
      <img src={Avatar} className="w-10 h-10 rounded-full" alt="User avatar" />
    </NavLink>
    <div className="flex-1">
      <p className="text-sm">
        <span className="font-bold text-md"> Shahid Parvez</span>
        {feeling && (
          <>
            is {feeling.emoji} feeling{" "}
            <span className="font-bold">{feeling.label}</span>
          </>
        )}
        {activity && (
          <>
            {" "}
            is {activity.emoji}{" "}
            <span className="font-bold">{activity.label}</span>
          </>
        )}
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

// Reusable Theme Toggle Button
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
        <IoIosColorPalette onClick={toggle} />
      </motion.div>
    )}
  </AnimatePresence>
);

// Reusable Theme List
const ThemeList = ({ themes, activeTheme, setActiveTheme }) => {
  const themeVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <AnimatePresence>
      {themes.map((theme, index) => (
        <motion.div
          key={theme}
          variants={themeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className={`w-6 h-6 rounded-sm cursor-pointer ${theme} ${
            activeTheme === theme ? "ring-2 ring-offset-2 ring-blue-500" : ""
          }`}
          onClick={() => setActiveTheme(theme)}
          role="button"
          aria-label={`Select ${theme} theme`}
        />
      ))}
    </AnimatePresence>
  );
};

// Reusable Emoji Picker Component
const EmojiPickerComponent = ({ isOpen, onEmojiClick, pickerRef, toggle }) => {
  const emojiCategories = [
    { category: "smileys_people", name: "Smileys & People" },
    { category: "animals_nature", name: "Animals & Nature" },
    { category: "food_drink", name: "Food & Drink" },
    { category: "travel_places", name: "Travel & Places" },
    { category: "activities", name: "Activities" },
    { category: "objects", name: "Objects" },
    { category: "symbols", name: "Symbols" },
    { category: "flags", name: "Flags" },
  ];

  return (
    isOpen && (
      <div
        className="absolute bottom-0 right-0 z-50 translate-y-14"
        ref={pickerRef}
      >
        <div className="relative shadow-lg">
          <EmojiPicker
            categories={emojiCategories}
            skinTonesDisabled
            emojiStyle="facebook"
            theme="auto"
            searchDisabled
            onEmojiClick={onEmojiClick}
            height={300}
            width={350}
          />
          <div className="absolute w-0 h-0 border-l-[20px] border-r-[20px] border-t-[20px] border-l-transparent border-r-transparent border-t-gray-800 -bottom-4 right-5 -z-10" />
        </div>
      </div>
    )
  );
};

// Main Editor Wrapper Component
export default function EditorWrapper({
  onClose,
  audienceSelector,
  feelingActivity,
  locationSelector,
}) {
  const dispatch = useDispatch();
  const accent = useSelector((state) => state.accent.activeAccent);
  const feeling = useSelector((state) => state.post.draftPost.feeling);
  const activity = useSelector((state) => state.post.draftPost.activity);
  console.log(feeling);
  console.log(activity);
  const currentAudience = useSelector(
    (state) => state.post.draftPost.activeAudience
  );
  const postThemes = useSelector((state) => state.post.postbackgrounds);

  const activeThemeBg = useSelector((state) => state.post.activeBackground);
  const [listOpened, setListOpened] = useState(false);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const editorRef = useRef(null);
  const pickerRef = useRef(null);

  // Handle outside click to close emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setEmojiPicker(false);
      }
    };

    if (emojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiPicker]);

  // Handle emoji selection
  const handleEmoji = (emojiData) => {
    if (editorRef.current && emojiData?.emoji) {
      editorRef.current.insertMarkdown(emojiData.emoji);
      editorRef.current.focus();
    }
    setEmojiPicker(false);
  };

  // Toggle theme list
  const toggleThemeList = () => setListOpened((prev) => !prev);

  // Set active theme
  const setActiveTheme = (theme) => dispatch(setActive(theme));

  return (
    <>
      <Header onClose={onClose} />
      <hr className="my-3 -mx-4 border-gray-200" />
      <UserInfo
        buttonClickHandler={audienceSelector}
        audience={currentAudience}
        feeling={feeling}
        activity={activity}
      />
      <div className={`my-5 -mx-4 ${activeThemeBg}`}>
        <div className="relative h-[250px] flex flex-col rounded-lg py-2">
          <div className="flex-1 overflow-y-auto px-4">
            <Editor ref={editorRef} />
          </div>
          <div className="flex justify-between items-center py-4 px-8 text-2xl">
            <div className="flex items-center gap-3">
              <ThemeToggleButton isOpen={listOpened} toggle={toggleThemeList} />
              {listOpened && (
                <ThemeList
                  themes={postThemes}
                  activeTheme={activeThemeBg}
                  setActiveTheme={setActiveTheme}
                />
              )}
            </div>
            <div className="relative">
              <BsEmojiAngry
                onClick={() => setEmojiPicker((prev) => !prev)}
                className="cursor-pointer"
                aria-label="Open emoji picker"
              />
              <EmojiPickerComponent
                isOpen={emojiPicker}
                onEmojiClick={handleEmoji}
                pickerRef={pickerRef}
                toggle={() => setEmojiPicker((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-6 py-4 border border-gray-200 border-[2px] rounded-md">
        <span className="font-semibold text-sm">Add to your post</span>
        <div className="flex gap-4 text-2xl">
          <MdOutlineEmojiEmotions
            className="text-yellow-500 cursor-pointer hover:text-yellow-600 transition-colors"
            aria-label="Add emoji"
            onClick={feelingActivity}
          />
          <FaLocationDot
            onClick={locationSelector}
            className="text-red-600 cursor-pointer hover:text-red-700 transition-colors"
            aria-label="Add location"
          />
        </div>
      </div>
      <div className="flex justify-center py-6">
        <button
          type="button"
          className="w-full px-4 py-2 rounded-md text-white font-semibold hover:brightness-110 transition-all"
          style={{ backgroundColor: accent }}
        >
          Post
        </button>
      </div>
    </>
  );
}
