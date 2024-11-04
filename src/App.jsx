import React from "react";
import "./App.css";
import Header from "./Components/Header";
import BottomNav from "./Components/BottomNav";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import Conta from "./Components/User/Conta";
import User from "./Components/User/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserStorage } from "./UserContext";
import { BottomNavValueProvider } from "./BottomNavContext";
import CssBaseline from "@mui/material/CssBaseline";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <BottomNavValueProvider>
          <UserStorage>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <Route
                path="conta/*"
                element={
                  <ProtectedRoute>
                    <Conta />
                  </ProtectedRoute>
                }
              />
              <Route path="user/*" element={<User />} />
            </Routes>
            <BottomNav />
          </UserStorage>
        </BottomNavValueProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
