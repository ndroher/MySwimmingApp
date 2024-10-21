import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Waves from "@mui/icons-material/Waves";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../../UserContext";

const AccountPage = () => {
  const { data, userLogout } = React.useContext(UserContext);

  if (data)
    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
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
          Minha Conta
        </Typography>
        <Button
          component={RouterLink}
          to="/conta/alterar-nome"
          underline="hover"
        >
          Alterar Nome de Exibição
        </Button>
        <Button
          component={RouterLink}
          to="/conta/alterar-foto"
          underline="hover"
        >
          Alterar Foto de Perfil
        </Button>
      </Container>
    );
  else return null;
};

export default AccountPage;
