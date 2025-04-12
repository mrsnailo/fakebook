import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { motion } from "motion/react";

const Backdrop = ({ onClickBackdrop }) => {
  const accent = useSelector((state) => state.accent.activeAccent);

  return (
    <div
      onClick={onClickBackdrop}
      className="backdrop fixed top-0 left-0 w-full h-screen z-[51] opacity-40"
      style={{ backgroundColor: accent }}
    ></div>
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className="modal fixed inset-0 flex justify-center items-center z-[55]">
      {/* Content container with dynamic width */}
      <div className="content">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

const Modal = ({ children, onClose }) => {
  const portaElement = document.getElementById("overlay");

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!portaElement) return null;

  return (
    <>
      {createPortal(<Backdrop onClickBackdrop={onClose} />, portaElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portaElement)}
    </>
  );
};

export default Modal;
