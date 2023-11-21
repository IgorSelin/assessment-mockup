import MainPage from "./pages/MainPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SchoolStatistics from "./pages/SchoolStatistics";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/school/:id",
      element: <SchoolStatistics />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
