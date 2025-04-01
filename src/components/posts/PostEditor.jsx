import Modal from "../UI/Modal/Modal";

export default function PostEditor({ onClose }) {
  return (
    <Modal>
      <p className="hi"></p>
      <button onClick={onClose} type="button">
        close
      </button>
    </Modal>
  );
}
