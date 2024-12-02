import React from "react";
import useFetch from "../../Hooks/useFetch";
import { CHANGE_PROFILE_PICTURE_POST } from "../../api";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Waves from "@mui/icons-material/Waves";
import { UserContext } from "../../UserContext";
import ErrorPage from "../ErrorPage";
import OfflinePage from "../OfflinePage";
import Head from "../Helper/Head";

const ChangeProfilePicture = () => {
  const { data } = React.useContext(UserContext);
  const navigate = useNavigate();
  const { loading, error, request } = useFetch();
  const [img, setImg] = React.useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profile_picture", img.raw);
    const token = window.localStorage.getItem("token");

    const { url, options } = CHANGE_PROFILE_PICTURE_POST(formData, token);
    const { response } = await request(url, options);

    if (response.ok) navigate(`/user/${data.username}`);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  if (error) return !navigator.onLine ? <OfflinePage /> : <ErrorPage />;
  return (
    <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
      <Head title="Alterar Foto de Perfil" />
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
        Alterar Foto de Perfil
      </Typography>
      <Box component="form" action="" onSubmit={handleSubmit}>
        <Typography variant="subtitle1">
          Faça o upload de sua imagem:
        </Typography>
        <input type="file" name="img" id="img" onChange={handleImgChange} />
        {img.preview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Pré-visualização:</Typography>
            <Avatar
              alt="Preview"
              src={img.preview}
              sx={{ width: 64, height: 64 }}
            />
          </Box>
        )}
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

export default ChangeProfilePicture;
