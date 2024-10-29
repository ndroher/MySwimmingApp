import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import Historico from "./Treino/TreinosListar";
import TreinoInfo from "./Treino/TreinoInfo";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/historico" element={<Historico />} />
        <Route path="/:username/treino/:treino_id" element={<TreinoInfo />} />
      </Routes>
    </>
  );
};

export default User;
