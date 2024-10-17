import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import ChangeDisplayName from "./ChangeDisplayName";
import ExerciciosListar from "./Exercicio/ExerciciosListar";
import ExercicioCreate from "./Exercicio/ExercicioCreate";
import ExercicioEdit from "./Exercicio/ExercicioEdit";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/alterar-nome" element={<ChangeDisplayName />} />
        <Route path="/exercicios" element={<ExerciciosListar />} />
        <Route path="/exercicios/criar" element={<ExercicioCreate />} />
        <Route path="/exercicios/editar" element={<ExercicioEdit />} />
      </Routes>
    </>
  );
};

export default User;
