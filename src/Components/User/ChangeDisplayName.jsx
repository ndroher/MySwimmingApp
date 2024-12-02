import React from "react";
import Input from "../Forms/Input";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { DISPLAY_NAME_PUT } from "../../api";
import { useNavigate } from "react-router-dom";
import Waves from "@mui/icons-material/Waves";
import { UserContext } from "../../UserContext";
import ErrorPage from "../ErrorPage";
import OfflinePage from "../OfflinePage";
import Head from "../Helper/Head";

const ChangeDisplayName = () => {
  const { data } = React.useContext(UserContext);
  const navigate = useNavigate();
  const display_name = useForm("display_name");
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if (display_name.validate()) {
      const token = window.localStorage.getItem("token");

      const { url, options } = DISPLAY_NAME_PUT(
        {
          display_name: display_name.value,
        },
        token
      );
      const { response } = await request(url, options);
      if (response.ok) navigate(`/user/${data.username}`);
    }
  }

  if (error && !navigator.onLine) return <OfflinePage />;
  return (
    <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
      <Head title="Alterar Nome de Exibição" />
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
        Alterar Nome de Exibição
      </Typography>

      <Box component="form" action="" onSubmit={handleSubmit}>
        <Input
          label="Nome de Exibição"
          type="text"
          name="display_name"
          fullWidth
          {...display_name}
        />
        {loading ? (
          <Button fullWidth variant="contained" disabled sx={{ my: 2 }}>
            Alterando...
          </Button>
        ) : (
          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Alterar
          </Button>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default ChangeDisplayName;
