import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import RootLayout from "./layout/root-layout.jsx";
import HomePage from "./pages/home.jsx";
import Movies from "./pages/movies.jsx";
import Login from "./pages/login.jsx";
import Signin from "./pages/signin.jsx";
import Notify from "./pages/notify.jsx";
import Search from "./pages/search/search.jsx";
import Category from "./pages/category.jsx";
import MovieDetail from "./pages/moviedetail.jsx";
import Upcoming from "./category/upcoming.jsx";
import Nowplaying from "./category/nowplaying.jsx";
import Popular from "./category/pupular.jsx";
import Toprated from "./category/toprated.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const fetchUserData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data, error } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });

  useEffect(() => {
    if (data) {
      console.log("데이터 가져오기 성공:", data);
      setUserEmail(data.email);
      setIsLoggedIn(true);
    }
  }, [data]);

  console.log(data);
  console.log(error);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setUserEmail("");
    window.location.href = "/login";
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          handleLogout={handleLogout}
        />
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: "movies", element: <Movies /> },
        {
          path: "login",
          element: <Login onLoginSuccess={() => fetchUserData()} />,
        },
        { path: "notify", element: <Notify userEmail={userEmail} /> },
        { path: "signin", element: <Signin /> },
        { path: "search", element: <Search /> },
        { path: "category", element: <Category /> },
        { path: "now-playing", element: <Nowplaying /> },
        { path: "popular", element: <Popular /> },
        { path: "top-rated", element: <Toprated /> },
        { path: "up-coming", element: <Upcoming /> },
        { path: "movie/:movieID", element: <MovieDetail /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
