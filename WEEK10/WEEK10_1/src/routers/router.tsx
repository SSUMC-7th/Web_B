import { createBrowserRouter, RouteObject } from "react-router-dom";

import NotFound from "../components/Not-found";
import HomePage from "../pages/home";
import RootLayout from "../outlet/root-layout";
import Search from "../pages/Search/Search";
import CategoryPage from "../pages/Categories";
import Join from "../pages/Join";
import Login from "../pages/Login";
import MovieDetailPage from "../pages/Categories/MovieDetail";
import NowPlayingPage from "../pages/Categories/NowPlaying";
import PopularPage from "../pages/Categories/Popular";
import TopRatedPage from "../pages/Categories/TopRated";
import UpComingPage from "../pages/Categories/UpComing";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movies",
        element: <CategoryPage />,
      },
      {
        path: "movies/:movieId",
        element: <MovieDetailPage />,
      },
      {
        path: "popular",
        element: <PopularPage />,
      },
      {
        path: "top_rated",
        element: <TopRatedPage />,
      },
      {
        path: "now_playing",
        element: <NowPlayingPage />,
      },
      {
        path: "upcoming",
        element: <UpComingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
