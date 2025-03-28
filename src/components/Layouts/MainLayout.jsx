import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="pt-14">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}
