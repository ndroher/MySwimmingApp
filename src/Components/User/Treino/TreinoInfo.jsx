import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Input from "../../Forms/Input";
import Waves from "@mui/icons-material/Waves";
import useForm from "../../../Hooks/useForm";
import useFetch from "../../../Hooks/useFetch";
import { USER_TREINO_GET, EXERCICIOS_GET } from "../../../api";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../../UserContext";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Link as RouterLink, useParams } from "react-router-dom";

const TreinoInfo = () => {
  const { username, treino_id } = useParams();
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function getHistorico() {
      const { url, options } = USER_TREINO_GET(username, treino_id);
      const { response, json } = await request(url, options);
    }
    getHistorico();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading</div>;
  if (data) {
    let totalRepeticoes = 0;
    Object.keys(data.repeticoes_por_tipo_de_nado).map(
      (tipo_de_nado) =>
        (totalRepeticoes += data.repeticoes_por_tipo_de_nado[tipo_de_nado])
    );
    const cores = ["#1976d2", "#fbc02d", "#c2185b", "#7b1fa2"];
    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem", mb: 10 }}>
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
                    backgroundColor: cores[index % cores.length],
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
