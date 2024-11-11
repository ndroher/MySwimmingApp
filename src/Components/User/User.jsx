import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import Historico from "./Treino/TreinosListar";
import TreinoInfo from "./Treino/TreinoInfo";
import UserEstatisticas from "./UserEstatisticas";
import NotFound from "../NotFound";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/estatisticas" element={<UserEstatisticas />} />
        <Route path="/:username/historico" element={<Historico />} />
        <Route path="/:username/treino/:treino_id" element={<TreinoInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default User;
