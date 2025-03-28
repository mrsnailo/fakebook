import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

import MainLayout from "./components/Layouts/MainLayout";
import Feed from "./pages/Feed";
import Watch from "./pages/Watch";
import Marketplace from "./pages/Marketplace";
import Groups from "./pages/Groups";
import Gaming from "./pages/Gaming";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Feed />,
        },
        {
          path: "feed", 
          element: <Feed />,
        },
        {
          path: "watch",
          element: <Watch />,
        },
        {
          path: "marketplace",
          element: <Marketplace />,
        },
        {
          path: "groups",
          element: <Groups />,
        },
        {
          path: "gaming",
          element: <Gaming />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
