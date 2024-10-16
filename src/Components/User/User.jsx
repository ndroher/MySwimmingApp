import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import ChangeDisplayName from "./ChangeDisplayName";
import Exercicios from "./Exercicios";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/alterar-nome" element={<ChangeDisplayName />} />
        <Route path="/exercicios" element={<Exercicios />} />
      </Routes>
    </>
  );
};

export default User;
