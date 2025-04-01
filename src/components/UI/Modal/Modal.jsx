import React from "react";
import { createPortal } from "react-dom";

import { useSelector } from "react-redux";

const Backdrop = (props) => {
  const accent = useSelector((state) => state.accent.activeAccent);

  return (
    <div
      onClick={props.onClickBackdrop}
      className="fixed top-0 left-0 w-full h-screen z-[51] opacity-40"
      style={{ backgroundColor: accent }} 
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 z-[55]">
      <div className="content">{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const portaElement = document.getElementById("overlay");
  return (
    <>
      {createPortal(<Backdrop />, portaElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portaElement
      )}
    </>
  );
};

export default Modal;
