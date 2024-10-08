import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const UserPage = () => {
  return (
    <>
      <Link component={RouterLink} to="/conta/alterar-nome" underline="hover">
        Alterar Nome de Exibição
      </Link>
    </>
  );
};

export default UserPage;
