import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../UI/Modal/Modal";
import EditorWrapper from "./EditorWrapper";
import Visibility from "./Extensions/Visibility";
import FeelingActivityPicker from "./Extensions/FeelingActivity";
import Location from "./Extensions/Location";
export default function PostModal(props) {
  const [activeModal, setActiveModal] = useState("main");
  const mainVariants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } },
  };

  // Animation variants for themes menu
  const otherVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: "100%", opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <Modal>
      <PostContainer>
        <AnimatePresence mode="wait">
          {activeModal === "main" && (
            <motion.div
              key="main"
              variants={mainVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <EditorWrapper
                onClose={props.onClose}
                audienceSelector={() => {
                  setActiveModal("visibility");
                }}
                feelingActivity={() => {
                  setActiveModal("feeling");
                }}
                locationSelector={() => {
                  setActiveModal("location");
                }}
              />
            </motion.div>
          )}
          {activeModal === "visibility" && (
            <motion.div
              key="visibility"
              variants={otherVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Visibility
                onBack={() => {
                  setActiveModal("main");
                }}
              />
            </motion.div>
          )}
          {activeModal === "feeling" && (
            <motion.div
              key="feeling"
              variants={otherVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <FeelingActivityPicker
                onBack={() => {
                  setActiveModal("main");
                }}
              />
            </motion.div>
          )}
          {activeModal === "location" && (
            <motion.div
              key="location"
              variants={otherVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Location
                onBack={() => {
                  setActiveModal("main");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </PostContainer>
    </Modal>
  );
}

const PostContainer = ({ children }) => {
  return (
    <div className="w-[600px] rounded-lg shadow-md bg-secondary p-4 overflow-hidden">
      {children}
    </div>
  );
};
