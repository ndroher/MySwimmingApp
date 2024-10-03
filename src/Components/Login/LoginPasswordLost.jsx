import React from "react";
import Input from "../Forms/Input";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Waves from "@mui/icons-material/Waves";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_LOST } from "../../api";

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.origin + "/login/resetar",
      });
      request(url, options);
    }
  }

  return (
    <Box
      component="section"
      sx={{
        display: { xs: "grid", md: "block" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "30rem",
          marginTop: "20%",
          marginLeft: "4rem",
          marginRight: "4rem",
          marginBottom: "8rem",
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily:
              '"Calistoga", "Roboto", "Helvetica", "Arial", sans-serif;',
            position: "relative",
          }}
        >
          <Waves
            color="primary"
            sx={{
              position: "absolute",
              zIndex: "-1",
              bottom: "5px",
              left: "-5px",
            }}
          />
          Esqueceu sua senha?
        </Typography>

        {data ? (
          <>
            <Typography variant="subtitle1">
              E-mail enviado com sucesso!
            </Typography>
            <Typography variant="subtitle1">
              Utilize o link recebido para redefinir sua senha.
            </Typography>
          </>
        ) : (
          <Box
            component="form"
            action=""
            onSubmit={handleSubmit}
            sx={{ mb: 3 }}
          >
            <Input
              label="E-mail / Usuário"
              type="text"
              name="login"
              fullWidth
              sx={{ mb: 2 }}
              {...login}
            />
            {loading ? (
              <Button fullWidth variant="contained" disabled sx={{ my: 2 }}>
                Enviando...
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ my: 2 }}
              >
                Enviar
              </Button>
            )}
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default LoginPasswordLost;
