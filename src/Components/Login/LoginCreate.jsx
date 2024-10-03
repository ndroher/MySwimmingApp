import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Input from "../Forms/Input";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Waves from "@mui/icons-material/Waves";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) userLogin(username.value, password.value);
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
            whiteSpace: "nowrap",
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
          Cadastre-se
        </Typography>

        <Box component="form" action="" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <Input
            label="Usuário"
            type="text"
            name="username"
            fullWidth
            sx={{ mb: 2 }}
            {...username}
          />
          <Input
            label="E-mail"
            type="email"
            name="email"
            fullWidth
            sx={{ mb: 2 }}
            {...email}
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            fullWidth
            sx={{ mb: 2 }}
            {...password}
          />
          {loading ? (
            <Button fullWidth variant="contained" disabled sx={{ my: 2 }}>
              Cadastrando...
            </Button>
          ) : (
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Cadastrar
            </Button>
          )}
          {error && <p>{error}</p>}
        </Box>

        <Typography sx={{ mb: 2 }}>
          Já possui uma conta?{" "}
          <Link component={RouterLink} to="/login" underline="hover">
            Fazer Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginCreate;
