import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import NotFound from "../components/Not-found";
import RootLayout from "../outlet/root-layout";
import Login from "../pages/Login";
import Join from "../pages/Join";

import Search from "../pages/search";
import CategoryPage from "../pages/Categories";
import MovieDetailPage from "../pages/Categories/MovieDetail";
import PopularPage from "../pages/Categories/Popular";
import TopRatedPage from "../pages/Categories/TopRated";
import NowPlayingPage from "../pages/Categories/NowPlaying";
import UpComingPage from "../pages/Categories/UpComing";



const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <NotFound />,

        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {

                path: '/movies',
                element: <CategoryPage />
            },
            {

                path: 'movies/:movieId',
                element: <MovieDetailPage />
            },
            {

                path: 'popular',
                element: <PopularPage />
            },
            {

                path: 'top_rated',
                element: <TopRatedPage />
            },
            {

                path: 'now_playing',
                element: <NowPlayingPage />
            },
            {

                path: 'upcoming',
                element: <UpComingPage />
            },
            {

                path: '/login',
                element: <Login />
            },
            {

                path: '/join',
                element: <Join />
            },
            {

                path: '/search',
                element: <Search />
            }

        ]
    },

])
export default router;