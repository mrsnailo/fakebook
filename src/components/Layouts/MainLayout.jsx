import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import Modal from "../UI/Modal/Modal";

export default function MainLayout() {
  const modalVisibility = useSelector((state) => state.modal.modalVisibility);
  const modalContent = useSelector((state) => state.modal.modalContent);
  return (
    <>
      <Header />
      <main className="pt-14">
        <Outlet />
      </main>
      {/* <Footer /> */}
      {/* modal  space  */}
      {modalVisibility && <Modal>{modalContent}</Modal>}
    </>
  );
}
