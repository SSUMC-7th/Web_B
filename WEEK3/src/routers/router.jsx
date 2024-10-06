import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import NotFound from "../components/Not-found";
import RootLayout from "../outlet/root-layout";
import Login from "../pages/Login";
import Join from "../pages/Join";
import Movies from "../pages/movies";
import Search from "../pages/search";
import MovieList from "../api/MovieList";


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
                element: <Movies />
            },
            {

                path: 'movies/:category',
                element: <MovieList />
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