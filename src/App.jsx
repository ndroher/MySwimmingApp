import React from "react";
import Header from "./Components/Header";
import BottomNav from "./Components/BottomNav";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserStorage } from "./UserContext";
import { BottomNavValueProvider } from "./BottomNavContext";
import CssBaseline from "@mui/material/CssBaseline";

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
              <Route path="/login/*" element={<Login />} />
            </Routes>
            <BottomNav />
          </UserStorage>
        </BottomNavValueProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
