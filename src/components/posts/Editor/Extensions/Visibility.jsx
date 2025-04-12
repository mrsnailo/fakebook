import { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaUserFriends, FaLock, FaGlobe } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setAudience } from "../../../../store/UI/Post/postSlice";

const options = [
  { id: "public", icon: <FaGlobe />, label: "Public" },
  { id: "friends", icon: <FaUserFriends />, label: "Friends" },
  { id: "onlyme", icon: <FaLock />, label: "Only Me" },
];

const RadioList = ({ audience, onChangeAudience }) => (
  <div className="space-y-2">
    {options.map((option) => (
      <label
        key={option.id}
        className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{option.icon}</span>
          <span className="text-sm font-medium">{option.label}</span>
        </div>
        <input
          type="radio"
          name="audience"
          value={option.id}
          checked={audience === option.id}
          onChange={() => onChangeAudience(option.id)}
          className="form-radio accent-blue-600 w-4 h-4"
        />
      </label>
    ))}
  </div>
);

const Header = ({ onButtonClick }) => (
  <div className="relative flex items-center justify-center h-12">
    <button
      onClick={onButtonClick}
      type="button"
      className="absolute left-0 text-xl p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ml-2"
      aria-label="Close"
    >
      <FaArrowCircleLeft />
    </button>
    <h2 className="text-[18px] font-bold text-center">Post audience</h2>
  </div>
);

const Visibility = ({ onBack }) => {
  const currentAudience = useSelector(
    (state) => state.post.draftPost.activeAudience
  );
  const [activeAudience, setActiveAudience] = useState(currentAudience);
  const dispatch = useDispatch();

  const accentColor = useSelector((state) => state.accent.activeAccent);
  const changeAudienceHandler = (audience) => {
    setActiveAudience(audience);
  };
  return (
    <>
      <Header onButtonClick={onBack} />
      <hr className="my-3 -mx-4 border-gray-200" />

      <div className="info my-2">
        <h2 className="font-bold text-2xl">Who can see your post?</h2>
        <p className="my-1 text-sm">
          {" "}
          Your post will show up in Feed, on your profile and in search results.{" "}
        </p>
        <p className="mt-2 text-sm">
          Your default audience is set to Public, but you can change the
          audience of this specific post.
        </p>
      </div>
      <RadioList
        audience={activeAudience}
        onChangeAudience={changeAudienceHandler}
      />
      <div className="action-buttons my-2 flex justify-end gap-3 mr-3">
        <button
          onClick={onBack}
          style={{ color: accentColor }}
          className="p-3 text"
        >
          Cancel
        </button>
        <button
          style={{ background: accentColor }}
          className="px-5 rounded-md text-white py-2"
          onClick={() => {
            dispatch(setAudience(activeAudience), onBack());
          }}
        >
          Done
        </button>
      </div>
    </>
  );
};

export default Visibility;
