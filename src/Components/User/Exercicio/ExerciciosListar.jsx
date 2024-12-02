import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { EXERCICIOS_GET } from "../../../api";
import useFetch from "../../../Hooks/useFetch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Container from "@mui/material/Container";
import ExercicioItem from "./ExercicioItem";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Waves from "@mui/icons-material/Waves";
import Loading from "../../Helper/Loading";
import ErrorPage from "../../ErrorPage";
import OfflinePage from "../../OfflinePage";
import Head from "../../Helper/Head";

const Exercicios = () => {
  const { data, loading, error, request } = useFetch();
  const [update, setUpdate] = React.useState(0);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    async function getExercicios() {
      const token = window.localStorage.getItem("token");
      const { url, options } = EXERCICIOS_GET(token);
      const { response, json } = await request(url, options);
    }
    getExercicios();
  }, [update]);

  if (error) return !navigator.onLine ? <OfflinePage /> : <ErrorPage />;
  if (loading) return <Loading />;
  if (data) {
    const exercicios = data.filter((exercicio) =>
      exercicio.nome.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
        <Head title="Lista de Exercícios" />
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
          Lista de Exercícios
        </Typography>
        <Box
          sx={{
            display: { sm: "flex" },
            justifyContent: "space-between",
            mt: "1rem",
            mb: "2rem",
          }}
        >
          <FormControl
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <OutlinedInput
              id="buscar-exercicio"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              }
              placeholder="Buscar Exercício"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormControl>
          <Button
            component={RouterLink}
            to="/conta/exercicios/criar"
            variant="contained"
            sx={{
              mt: { xs: "1rem", sm: "0" },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Adicionar Novo Exercício
          </Button>
        </Box>
        {exercicios.map((exercicio) => (
          <ExercicioItem
            key={exercicio.id}
            exercicio={exercicio}
            setUpdate={setUpdate}
          />
        ))}
      </Container>
    );
  } else return null;
};

export default Exercicios;
