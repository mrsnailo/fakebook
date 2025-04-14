// FeelingActivityPicker.jsx
import React, { useState } from "react";
import ModalHeader from "../../../UI/Modal/ModalHeader";
import { useDispatch } from "react-redux";
import { setFeeling, setActivity } from "../../../../store/UI/Post/postSlice";

const feelingData = {
  Feelings: [
    { emoji: "😇", label: "blessed" },
    { emoji: "😍", label: "loved" },
    { emoji: "😊", label: "lovely" },
    { emoji: "😄", label: "excited" },
    { emoji: "🤪", label: "crazy" },
    { emoji: "😌", label: "blissful" },
    { emoji: "🙂", label: "happy" },
    { emoji: "😢", label: "sad" },
    { emoji: "😊", label: "thankful" },
    { emoji: "❤️", label: "in love" },
    { emoji: "😇", label: "grateful" },
    { emoji: "🤩", label: "fantastic" },
  ],
  Activities: [
    { emoji: "🎮", label: "gaming" },
    { emoji: "📺", label: "watching TV" },
    { emoji: "🍕", label: "eating pizza" },
    { emoji: "🎧", label: "listening to music" },
    { emoji: "🎉", label: "celebrating" },
  ],
};

export default function FeelingActivityPicker({ onBack }) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("Feelings");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item);
    if (tab === "Feelings") {
      dispatch(setFeeling(item));
      dispatch(setActivity(null));
    } else {
      dispatch(setActivity(item));
      dispatch(setFeeling(null));
    }
    onBack();
  };

  const items = feelingData[tab].filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ModalHeader onClickBack={onBack} title="How are you feeling?" />

      <div className="flex px-4 pt-2 space-x-4">
        {["Feelings", "Activities"].map((name) => (
          <button
            key={name}
            onClick={() => setTab(name)}
            className={`pb-2 border-b-2 ${
              tab === name
                ? "border-blue-500 text-blue-600 font-medium"
                : "border-transparent text-gray-500"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="px-4 py-2">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-3 py-2 rounded-md text-sm bg-gray-100 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 p-4 max-h-[300px] overflow-y-auto">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => handleSelect(item)}
            className={`flex items-center px-2 py-2 rounded-md text-left hover:bg-hover ${
              selected?.label === item.label ? "bg-gray-200" : ""
            }`}
          >
            <span className="text-xl mr-2">{item.emoji}</span>
            <span className="capitalize text-sm">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
