import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Waves from "@mui/icons-material/Waves";
import useFetch from "../../../Hooks/useFetch";
import { USER_TREINO_GET, TREINO_DELETE } from "../../../api";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../../UserContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loading from "../../Helper/Loading";
import ErrorPage from "../../ErrorPage";
import OfflinePage from "../../OfflinePage";
import EditIcon from "@mui/icons-material/Edit";

const TreinoInfo = () => {
  const { username, treino_id } = useParams();
  const { data: userData, loading: userLoading } =
    React.useContext(UserContext);
  const { data, loading, error, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getHistorico() {
      const { url, options } = USER_TREINO_GET(username, treino_id);
      const { response, json } = await request(url, options);
    }
    getHistorico();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const excluirTreino = () => {
    async function excluir() {
      const token = window.localStorage.getItem("token");
      const { url, options } = TREINO_DELETE(token, data.id);
      const { response, json } = await request(url, options);
      if (response.ok) navigate(`/user/${username}/historico`);
    }
    excluir();
  };

  if (error) return !navigator.onLine ? <OfflinePage /> : <ErrorPage />;
  if (loading) return <Loading />;
  if (data) {
    let totalRepeticoes = 0;
    Object.keys(data.repeticoes_por_tipo_de_nado).map(
      (tipo_de_nado) =>
        (totalRepeticoes += data.repeticoes_por_tipo_de_nado[tipo_de_nado])
    );
    const cores = {
      Crawl: "#1976d2",
      Costas: "#fbc02d",
      Borboleta: "#c2185b",
      Peito: "#7b1fa2",
    };
    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem", mb: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h3"
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
            {data.nome}
          </Typography>
          {userData ? (
            userData.username === username ? (
              <>
                <Box>
                  <Button
                    component={RouterLink}
                    to={`/conta/treino/editar?id=${treino_id}`}
                    size="small"
                    color="action"
                    sx={{
                      marginLeft: "0px !important",
                      "&:hover": { color: "#221c12" },
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="small"
                    color="action"
                    onClick={handleClickOpen}
                    sx={{
                      marginLeft: "0px !important",
                      "&:hover": { color: "#d32f2f" },
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Excluir Treino
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Tem certeza que deseja excluir o treino "{data.nome}"?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={excluirTreino} color="error" autoFocus>
                      Excluir
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : null
          ) : null}
        </Box>
        <Typography variant="h6" color="textSecondary">
          {data.post_date}
        </Typography>
        <Box sx={{ display: "flex", width: "100%", my: 2 }}>
          {Object.keys(data.repeticoes_por_tipo_de_nado).map(
            (tipo_de_nado, index) => (
              <Box
                key={tipo_de_nado}
                sx={{
                  width: `calc((${data.repeticoes_por_tipo_de_nado[tipo_de_nado]}/${totalRepeticoes}) * 100%)`,
                }}
              >
                <Box
                  sx={{
                    height: ".5rem",
                    backgroundColor:
                      cores[tipo_de_nado] || "rgba(0, 0, 0, 0.08)",
                    borderInlineEnd: "solid",
                    borderInlineColor: "white",
                  }}
                ></Box>
                <Typography
                  color="textSecondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tipo_de_nado}
                </Typography>
              </Box>
            )
          )}
        </Box>
        <Box sx={{ my: 2 }}>
          {data.equipamentos_utilizados.map((equipamentos_utilizado) => (
            <Chip
              key={equipamentos_utilizado}
              label={equipamentos_utilizado}
              sx={{ mr: "1rem" }}
            />
          ))}
        </Box>

        <Box
          sx={{
            my: 2,
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">
            Distância Total: <b>{data.distancia_total}m</b>
          </Typography>
          <Typography variant="h6">
            Tamanho da Piscina: <b>{data.tamanho_da_piscina}m</b>
          </Typography>
        </Box>

        <Divider />

        {data.exercicios.map((exercicio, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              my: 3,
              width: "100%",
            }}
          >
            <Box>
              <Typography variant="h4" color="textSecondary">
                {exercicio.repeticoes}x
              </Typography>
            </Box>

            <Paper
              variant="outlined"
              sx={{
                width: "100%",
                padding: "1rem",
                marginLeft: "1rem",
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  minHeight: "88px",
                  mb: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ my: 1 }}
                  >
                    Ida
                  </Typography>
                  <Typography variant="h6">
                    {exercicio.exercicio_ida.nome}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    {exercicio.exercicio_ida.tipo_nado.map((tipo_nado) => (
                      <Typography
                        key={tipo_nado}
                        color="textSecondary"
                        sx={{ mr: 1 }}
                      >
                        {tipo_nado}
                      </Typography>
                    ))}
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    {exercicio.exercicio_ida.equipamentos.map((equipamento) => (
                      <Chip
                        key={equipamento}
                        label={equipamento}
                        sx={{ mr: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>

              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  minHeight: "88px",
                }}
              >
                <CardContent>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ my: 1 }}
                  >
                    Volta
                  </Typography>
                  <Typography variant="h6">
                    {exercicio.exercicio_volta.nome}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    {exercicio.exercicio_volta.tipo_nado.map((tipo_nado) => (
                      <Typography
                        key={tipo_nado}
                        color="textSecondary"
                        sx={{ mr: "1rem" }}
                      >
                        {tipo_nado}
                      </Typography>
                    ))}
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    {exercicio.exercicio_volta.equipamentos.map(
                      (equipamento) => (
                        <Chip
                          key={equipamento}
                          label={equipamento}
                          sx={{ mr: "1rem" }}
                        />
                      )
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Box>
        ))}
      </Container>
    );
  } else return null;
};

export default TreinoInfo;
