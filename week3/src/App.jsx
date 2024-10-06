import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import MoviesPage from "./pages/movies.jsx";
import RootLayout from "./layout/root-layout.jsx";
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";
import SearchPage from "./pages/search.jsx";
import CategorPage from "./pages/categories.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
    children: [
      {
        // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
        index: true,
        element: <HomePage />,
      },
      {
        // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
        // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
        path: "movies",
        element: <CategorPage />,
      },
      {
        // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
        // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
        path: "movies/:category",
        element: <MoviesPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
