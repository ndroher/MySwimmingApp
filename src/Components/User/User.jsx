import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import ChangeDisplayName from "./ChangeDisplayName";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/alterar-nome" element={<ChangeDisplayName />} />
      </Routes>
    </>
  );
};

export default User;
