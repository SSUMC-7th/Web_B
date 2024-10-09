import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Movies from "./pages/movies.jsx";
import RootLayout from "./layout/root-layout.jsx";
import Login from "./pages/login.jsx";
import Signin from "./pages/signin.jsx";
import Search from "./pages/search.jsx";
import Category from "./pages/category.jsx";
import MovieDetail from "./pages/moviedetail.jsx";

import Upcoming from "./category/upcoming.jsx";
import Nowplaying from "./category/nowplaying.jsx";
import Popular from "./category/pupular.jsx";
import Toprated from "./category/toprated.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'movies',
                element: <Movies/>,
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'signin',
                element: <Signin/>
            },
            {
                path: 'search',
                element: <Search/>
            },
            {
                path: 'category',
                element: <Category/>
            },
            {
                path: 'now-playing',
                element: <Nowplaying/>
            },
            {
                path: 'popular',
                element: <Popular/>
            },
            {
                path: 'top-rated',
                element: <Toprated/>
            },
            {
                path: 'up-coming',
                element: <Upcoming/>
            },
            {
                path: 'movie/:movieID',
                element: <MovieDetail/>
            }
        ]
    },

])

function App() {
    return <RouterProvider router={router}/>
}

export default App;
