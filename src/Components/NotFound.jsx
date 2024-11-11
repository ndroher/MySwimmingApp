import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { data, userLogout } = React.useContext(UserContext);
  return (
    <Box
      sx={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h4" color="textSecondary">
        Página não encontrada
      </Typography>
      {data ? (
        <Button
          onClick={() => navigate(`/user/${data.username}`)}
          sx={{ mt: 2 }}
        >
          Voltar
        </Button>
      ) : (
        <Button onClick={() => navigate(`/login`)} sx={{ mt: 2 }}>
          Voltar
        </Button>
      )}
    </Box>
  );
};

export default NotFound;
