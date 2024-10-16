import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import ChangeDisplayName from "./ChangeDisplayName";
import Exercicios from "./Exercicios";
import ExercicioCreate from "./ExercicioCreate";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/alterar-nome" element={<ChangeDisplayName />} />
        <Route path="/exercicios" element={<Exercicios />} />
        <Route path="/exercicios/criar" element={<ExercicioCreate />} />
      </Routes>
    </>
  );
};

export default User;
