import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/:username" element={<UserPage />} />
      </Routes>
    </>
  );
};

export default User;
