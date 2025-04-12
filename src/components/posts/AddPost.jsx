import Card from "../UI/Card";
import { MdVideoCameraBack } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { PiSmileyWinkBold } from "react-icons/pi";
import Avatar from "../../assets/images/user/avatar.jpg";
import { NavLink } from "react-router-dom";

import { useState } from "react";
import PostModal from "./Editor/PostModal";

export default function AddPost() {
  const [isExpanded, setIsExpanded] = useState(false);
  const closeHandler = () => {
    console.log("ece");
    setIsExpanded(false);
  };
  return (
    <>
      <Card>
        <div className="add-post">
          <div className="upper-part flex items-center gap-3">
            {/* Fixed Width Image */}
            <NavLink to={"#"}>
              <img src={Avatar} className="w-10 h-10 rounded-full" />
            </NavLink>

            {/* Input Takes Remaining Space */}
            <div className="flex-1">
              <input
                placeholder="What's on your mind?"
                readOnly
                onClick={() => {
                  setIsExpanded(true);
                }}
                className="w-full p-2 rounded-full bg-search text-text lg:block focus:outline-none focus:ring-0 transition-all duration-200 cursor-pointer"
              />
            </div>
          </div>
          <hr class="my-3 h-0.5 border-t-0 bg-bg" />
        </div>
        <div className="bottom-part flex justify-center">
          <IcoText
            icon={<MdVideoCameraBack />}
            label="Live Video"
            color="text-red-500"
          />
          <IcoText
            icon={<IoMdPhotos />}
            label="Photo/videos"
            color="text-emerald-500"
          />
          <IcoText
            icon={<PiSmileyWinkBold />}
            label="Feeling/Activity"
            color="text-yellow-500"
          />
        </div>
      </Card>
      {isExpanded && <PostModal onClose={closeHandler} />}
    </>
  );
}

const IcoText = ({ icon, label, color }) => {
  return (
    <div className="conatiner flex w-40 gap-2 items-center text-[14px] justify-center text-center rounded-md hover:bg-hover px-2 py-2 cursor-pointer">
      <div className={`icon text-2xl ${color}`}>{icon}</div>
      <p className="label">{label}</p>
    </div>
  );
};
