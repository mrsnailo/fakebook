import { FaArrowLeft } from "react-icons/fa6";

const ModalHeader = ({ onClickBack, title }) => (
  <>
    <div className="relative flex items-center justify-center h-12 text-text">
      <button
        onClick={onClickBack}
        type="button"
        className="absolute left-0 text-xl p-2 rounded-full bg-hover hover:brightness-125 transition-colors ml-2"
        aria-label="Close"
      >
        <FaArrowLeft />
      </button>
      <h2 className="text-[18px] font-bold text-center">{title}</h2>
    </div>
    <hr className="my-3 -mx-4 border-hover" />
  </>
);
export default ModalHeader;
