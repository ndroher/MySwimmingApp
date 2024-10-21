import React from "react";
import { Routes, Route } from "react-router-dom";
import ChangeDisplayName from "./ChangeDisplayName";
import ChangeProfilePicture from "./ChangeProfilePicture";
import ChangeGoals from "./ChangeGoals";
import ExerciciosListar from "./Exercicio/ExerciciosListar";
import ExercicioCreate from "./Exercicio/ExercicioCreate";
import ExercicioEdit from "./Exercicio/ExercicioEdit";

const Conta = () => {
  return (
    <>
      <Routes>
        <Route path="/exercicios" element={<ExerciciosListar />} />
        <Route path="/alterar-nome" element={<ChangeDisplayName />} />
        <Route path="/alterar-foto" element={<ChangeProfilePicture />} />
        <Route path="/alterar-metas" element={<ChangeGoals />} />
        <Route path="/exercicios/criar" element={<ExercicioCreate />} />
        <Route path="/exercicios/editar" element={<ExercicioEdit />} />
      </Routes>
    </>
  );
};

export default Conta;
