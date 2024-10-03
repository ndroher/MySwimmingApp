import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Input from "../Forms/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Waves from "@mui/icons-material/Waves";
import Water from "@mui/icons-material/Water";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
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
          Login
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
            label="Senha"
            type="password"
            name="password"
            fullWidth
            sx={{ mb: 2 }}
            {...password}
          />
          <Link
            component={RouterLink}
            to="/login/perdeu"
            underline="hover"
            sx={{ mb: 2 }}
          >
            Esqueceu sua senha?
          </Link>
          {loading ? (
            <Button fullWidth variant="contained" disabled sx={{ my: 2 }}>
              Carregando...
            </Button>
          ) : (
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Entrar
            </Button>
          )}
          {error && <Typography color="error">{error}</Typography>}
        </Box>

        <Water
          color="primary"
          fontSize="large"
          sx={{ display: "block", mt: 3, mb: 3 }}
        />
        <Box>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily:
                '"Calistoga", "Roboto", "Helvetica", "Arial", sans-serif;',
            }}
          >
            Não possui uma conta?
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Sua jornada aquática começa aqui:{" "}
            <Link component={RouterLink} to="/login/criar" underline="hover">
              inscreva-se agora!
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
