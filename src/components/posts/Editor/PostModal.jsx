import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../UI/Modal/Modal";
import EditorWrapper from "./EditorWrapper";
import Visibility from "./Extensions/Visibility";

export default function PostModal(props) {
  const [activeModal, setActiveModal] = useState("main");
  const mainVariants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3 } },
  };

  // Animation variants for themes menu
  const visibilityVariants = {
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
              />
            </motion.div>
          )}
          {activeModal === "visibility" && (
            <motion.div
              key="visibility"
              variants={visibilityVariants}
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
        </AnimatePresence>
      </PostContainer>
    </Modal>
  );
}

const PostContainer = ({ children }) => {
  return (
    <div className="w-[600px] rounded-lg shadow-md bg-white p-4 overflow-hidden">
      {children}
    </div>
  );
};
