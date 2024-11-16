import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ToDoListPage from "./pages/ToDoListPage.jsx";
import ToDoDetailPage from "./pages/ToDoDetailPage.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      children: [
        {
          index: true,
          element: <ToDoListPage />,
        },
        {
          path: "todo/:id",
          element: <ToDoDetailPage />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
