import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import Historico from "./Treino/TreinosListar";
import TreinoInfo from "./Treino/TreinoInfo";
import UserEstatisticas from "./UserEstatisticas";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/estatisticas" element={<UserEstatisticas />} />
        <Route path="/:username/historico" element={<Historico />} />
        <Route path="/:username/treino/:treino_id" element={<TreinoInfo />} />
      </Routes>
    </>
  );
};

export default User;
