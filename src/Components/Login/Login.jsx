import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import { UserContext } from "../../UserContext";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

const Login = () => {
  const { login } = React.useContext(UserContext);
  const matches = useMediaQuery("(min-width:900px)");

  if (login) return <Navigate to="/conta" />;
  return (
    <Grid
      container
      spacing={0}
      sx={{
        height: `calc(100vh - 64px)`,
      }}
    >
      <Grid
        size={6}
        sx={{
          display: { xs: "none", md: "block" },
          height: "100%",
        }}
      >
        <Box
          sx={{
            backgroundImage:
              "url('src/Assets/swimmer-with-equipment-pool-full-shot.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "100%",
          }}
        />
      </Grid>
      <Grid size={matches ? 6 : 12} sx={{ height: "100%" }}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/criar" element={<LoginCreate />} />
          <Route path="/perdeu" element={<LoginPasswordLost />} />
          <Route path="/resetar" element={<LoginPasswordReset />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Login;
