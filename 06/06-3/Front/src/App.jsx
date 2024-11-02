import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import RootLayout from "./layout/root-layout.jsx";
import HomePage from "./pages/home.jsx";
import NotFound from "./pages/not-found.jsx";
import Movies from "./pages/movies.jsx";
import Login from "./pages/login.jsx";
import Signin from "./pages/signin.jsx";
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
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setIsLoggedIn(false);
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setUserEmail(response.data.email);
            setIsLoggedIn(true);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('인증 실패: 토큰이 유효하지 않습니다.');
                handleLogout();
            } else {
                console.error('사용자 정보를 불러오는데 실패했습니다:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        setUserEmail("");
        // 로그아웃 후 리다이렉트 처리
        window.location.href = '/login';
    };

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <RootLayout 
                    isLoggedIn={isLoggedIn} 
                    userEmail={userEmail} 
                    handleLogout={handleLogout} 
                />
            ),
            errorElement: <NotFound />,
            children: [
                { index: true, element: <HomePage /> },
                { path: 'movies', element: <Movies /> },
                { path: 'login', element: <Login onLoginSuccess={fetchUserData} /> },
                { path: 'signin', element: <Signin /> },
                { path: 'search', element: <Search /> },
                { path: 'category', element: <Category /> },
                { path: 'now-playing', element: <Nowplaying /> },
                { path: 'popular', element: <Popular /> },
                { path: 'top-rated', element: <Toprated /> },
                { path: 'up-coming', element: <Upcoming /> },
                { path: 'movie/:movieID', element: <MovieDetail /> },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;
