import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import axios from "axios";
import Form from "./Form";
import Lists from "./Lists";
import Detail from "./Detail";
import Search from "./Search";

const queryClient = new QueryClient();

function App() {
  const [todos, setTodos] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_TODO_API}/todo`);
      setTodos(response.data);
    } catch (error) {
      console.error("에러 : ", error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Form fetchTodos={fetchTodos} />
                <Search setSearchResults={setSearchResults} />
                <Lists
                  todos={searchResults.length > 0 ? searchResults : todos}
                  fetchTodos={fetchTodos}
                />
              </>
            }
          />
          <Route
            path="/detail/:id"
            element={<Detail fetchTodos={fetchTodos} />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
