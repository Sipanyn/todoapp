import { createBrowserRouter, RouterProvider } from "react-router";
import Applayout from "./componenets/Applayout";
import Allpage from "./pages/Allpage";
import CompoletedPage from "./pages/CompletedPage";
import UncompoletedPage from "./pages/UncompletedPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      children: [
        { index: true, element: <Allpage /> },
        { path: "uncompleted", element: <UncompoletedPage /> },
        { path: "completed", element: <CompoletedPage /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
