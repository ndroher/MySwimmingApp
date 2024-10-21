import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import Historico from "./Treino/TreinosListar";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/historico" element={<Historico />} />
      </Routes>
    </>
  );
};

export default User;
