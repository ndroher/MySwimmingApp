import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import Head from "../Components/Helper/Head";

const OfflinePage = () => {
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
      <Head title="Offline" />
      <CloudOffIcon fontSize="large" />
      <Typography variant="h5" my={1}>
        Você está Offline!
      </Typography>
      <Typography color="textSecondary">
        Mas não se preocupe, sua requisição foi salva e caso tiver sucesso será
        enviada quando você estiver online novamente!
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

export default OfflinePage;
