import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { USER_ESTATISTICAS_GET, EXERCICIO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import UserInfo from "./UserInfo";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { LineChart } from "@mui/x-charts/LineChart";
import Loading from "../Helper/Loading";
import ErrorPage from "../ErrorPage";

//Tipos de nado
const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const UserEstatisticas = () => {
  const { username } = useParams();
  const { data, loading, error, request } = useFetch();
  const {
    data: exercicioData,
    loading: exercicioLoading,
    error: exercicioError,
    request: exercicioRequest,
  } = useFetch();

  React.useEffect(() => {
    async function getEstatisticas() {
      const { url, options } = USER_ESTATISTICAS_GET(username);
      const { response, json } = await request(url, options);
      return json;
    }
    getEstatisticas().then(async function getExercicio(result) {
      if (result.exercicio_mais_realizado_id !== null) {
        const { url, options } = EXERCICIO_GET(
          result.exercicio_mais_realizado_id
        );
        const { response, json } = await exercicioRequest(url, options);
      }
    });
  }, []);

  const cores = {
    Crawl: "#1976d2",
    Costas: "#fbc02d",
    Borboleta: "#c2185b",
    Peito: "#7b1fa2",
  };

  if (error || exercicioError) return <ErrorPage />;
  if (loading || exercicioLoading) return <Loading />;
  if (data) {
    const nados = Object.entries(data.repeticoes_por_tipo_de_nado).map(
      ([label, value]) => ({
        label,
        value,
        color: cores[label],
      })
    );

    const semanas = data.atividades_por_semana.map((item) => item.semana);
    const valores = data.atividades_por_semana.map((item) => item.treinos);

    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
        <UserInfo />
        <Box sx={{ paddingBottom: "2em" }}>
          <Paper
            sx={{
              textAlign: "center",
              padding: 2,
              my: 2,
            }}
          >
            {data.total_treinos > 0 ? (
              <Typography>
                O usuário{" "}
                <Typography
                  component={"span"}
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ fontStyle: "italic", display: "inline" }}
                >
                  @{username}
                </Typography>{" "}
                realizou {data.total_treinos} treinos e nadou um total de{" "}
                {data.total_metros_nadados} metros, tendo uma média de
                aproximadamente{" "}
                {(data.total_metros_nadados / data.total_treinos).toFixed(0)}{" "}
                metros por treino.
              </Typography>
            ) : (
              <Typography>
                O usuário{" "}
                <Typography
                  component={"span"}
                  variant="subtitle1"
                  color="textSecondary"
                  sx={{ fontStyle: "italic", display: "inline" }}
                >
                  @{username}
                </Typography>{" "}
                ainda não possui nenhum treino realizado.
              </Typography>
            )}
          </Paper>

          {exercicioData ? (
            <Box sx={{ my: 3 }}>
              <Typography variant="h5" sx={{ my: 2 }}>
                Exercício mais realizado
              </Typography>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{exercicioData.nome}</Typography>
                  <Box sx={{ display: "flex" }}>
                    {exercicioData.tipo_nado.map((tipo_nado) => (
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
                    {exercicioData.equipamentos.map((equipamento) => (
                      <Chip
                        key={equipamento}
                        label={equipamento}
                        sx={{ mr: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ) : null}

          <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
              Gráficos
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: "2rem",
              }}
            >
              <Paper
                sx={{
                  width: "fit-content",
                  margin: { xs: "0 auto", lg: "auto" },
                  padding: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", paddingTop: 2 }}
                >
                  Tipos de Nado
                </Typography>
                <PieChart
                  series={[{ data: nados, innerRadius: 70, outerRadius: 85 }]}
                  width={300}
                  height={300}
                  margin={{ right: 0, top: -50 }}
                  sx={{
                    ".MuiChartsLegend-mark": {
                      width: "10px !important",
                      height: "10px !important",
                      x: "5",
                      y: "-5",
                      rx: "25",
                      ry: "25",
                    },
                  }}
                  slotProps={{
                    legend: {
                      direction: "row",
                      position: {
                        horizontal: "middle",
                        vertical: "bottom",
                      },
                    },
                  }}
                >
                  <PieCenterLabel>
                    {data.total_treinos == 0
                      ? "Nenhum treino realizado"
                      : "Repetições"}
                  </PieCenterLabel>
                </PieChart>
              </Paper>

              <Paper
                sx={{
                  width: "fit-content",
                  margin: { xs: "0 auto", lg: "auto" },
                  padding: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", paddingTop: 2 }}
                >
                  Distância por Dia
                </Typography>
                <BarChart
                  width={300}
                  height={300}
                  dataset={data.distancia_por_dia}
                  xAxis={[
                    {
                      scaleType: "band",
                      dataKey: "dia",
                      label: "dias da semana",
                    },
                  ]}
                  yAxis={[
                    {
                      label: "distância (metros)",
                    },
                  ]}
                  series={[
                    {
                      dataKey: "distancia",
                      valueFormatter: (value) => `${value}m`,
                      color: "#1976d2",
                    },
                  ]}
                  sx={{
                    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                      transform: "translateX(-10px)",
                    },
                    transform: "translateX(10px)",
                  }}
                />
              </Paper>

              <Paper
                sx={{
                  width: "fit-content",
                  margin: { xs: "0 auto", lg: "auto" },
                  padding: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", paddingTop: 2 }}
                >
                  Atividade por Semana
                </Typography>
                <LineChart
                  xAxis={[
                    { scaleType: "point", data: semanas, label: "semanas" },
                  ]}
                  yAxis={[
                    {
                      label: "treinos realizados",
                    },
                  ]}
                  series={[
                    {
                      data: valores,
                      valueFormatter: (value) => `${value} treino(s)`,
                      color: "#1976d2",
                    },
                  ]}
                  width={300}
                  height={300}
                />
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>
    );
  } else return null;
};

export default UserEstatisticas;
