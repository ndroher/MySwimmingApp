import React from "react";
import Input from "../Forms/Input";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Waves from "@mui/icons-material/Waves";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_RESET } from "../../api";
import { useNavigate } from "react-router-dom";

const LoginPasswordReset = () => {
  const [key, setKey] = React.useState();
  const [login, setLogin] = React.useState();
  const password = useForm("password");
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        key,
        login,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate("/login");
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
          Redefinir senha
        </Typography>

        <Box component="form" action="" onSubmit={handleSubmit} sx={{ mb: 3 }}>
          <Input
            label="Nova Senha"
            type="password"
            name="password"
            fullWidth
            sx={{ mb: 2 }}
            {...password}
          />
          {loading ? (
            <Button fullWidth variant="contained" disabled sx={{ my: 2 }}>
              Redefinindo...
            </Button>
          ) : (
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Redefinir
            </Button>
          )}
          {error && <p>{error}</p>}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPasswordReset;
