import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Input from "../../Forms/Input";
import Waves from "@mui/icons-material/Waves";
import useForm from "../../../Hooks/useForm";
import useFetch from "../../../Hooks/useFetch";
import { EXERCICIO_GET, EXERCICIO_PUT } from "../../../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../Helper/Loading";
import ErrorPage from "../../ErrorPage";
import OfflinePage from "../../OfflinePage";
import Head from "../../Helper/Head";

const ExercicioEdit = () => {
  const nome_exercicio = useForm();

  const [selectedTipoNado, setSelectedTipoNado] = React.useState([]);
  const [optionsNados, setOptionsNados] = React.useState();
  const [defaultTipoNado, setDefaultTipoNado] = React.useState([]);
  const handleChangeTipoNado = (e, v) =>
    setSelectedTipoNado(v.map((item) => item));

  const [selectedEquipamentos, setSelectedEquipamentos] = React.useState([]);
  const [optionsEquipamentos, setOptionsEquipamentos] = React.useState([]);
  const [defaultEquipamentos, setDefaultEquipamentos] = React.useState([]);
  const handleChangeEquipamentos = (e, v) =>
    setSelectedEquipamentos(v.map((item) => item));

  const [searchParams] = useSearchParams();
  const { data, loading, error, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getExercicio() {
      const { url, options } = EXERCICIO_GET(searchParams.get("id"));
      const { response, json } = await request(url, options);
    }
    getExercicio();

    setOptionsNados(["Borboleta", "Costas", "Crawl", "Peito"]);

    setOptionsEquipamentos([
      "Prancha",
      "PullBuoy",
      "Nadadeiras",
      "Palmar",
      "Paraquedas",
      "Corda Elástica",
      "Snorkel",
      "Halteres de Espuma",
      "Cinto Flutuante",
      "Espaguete Flutuador",
      "Outro",
    ]);
  }, []);

  React.useEffect(() => {
    if (data) {
      setDefaultTipoNado(data.tipo_nado);
      setDefaultEquipamentos(data.equipamentos);
      nome_exercicio.setValue(data.nome);
    }
  }, [data]);

  React.useEffect(() => {
    setSelectedTipoNado(defaultTipoNado.map((item) => item));
  }, [defaultTipoNado]);

  React.useEffect(() => {
    setSelectedEquipamentos(defaultEquipamentos.map((item) => item));
  }, [defaultEquipamentos]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (nome_exercicio.validate()) {
      const token = window.localStorage.getItem("token");
      const { url, options } = EXERCICIO_PUT(
        {
          nome: nome_exercicio.value,
          tipo_nado: selectedTipoNado,
          equipamentos: selectedEquipamentos,
          personalizado: true,
        },
        token,
        searchParams.get("id")
      );
      const { response } = await request(url, options);
      if (response.ok) navigate("/conta/exercicios");
    }
  }

  if (error) return !navigator.onLine ? <OfflinePage /> : <ErrorPage />;
  if (loading) return <Loading />;
  if (data)
    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
        <Head title="Editar Exercício" />
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
          Editar Exercício
        </Typography>

        <Box component="form" action="" onSubmit={handleSubmit}>
          <Input
            label="Nome"
            type="text"
            name="nome_exercicio"
            fullWidth
            sx={{ mb: 2 }}
            {...nome_exercicio}
          />

          <Autocomplete
            multiple
            id="tipo-nado"
            options={optionsNados}
            getOptionLabel={(optionNados) => optionNados}
            value={selectedTipoNado}
            filterSelectedOptions
            onChange={handleChangeTipoNado}
            renderInput={(params) => (
              <TextField {...params} label="Tipo de Nado" />
            )}
            sx={{ mb: 2 }}
          />

          <Autocomplete
            multiple
            id="equipamentos-utilizados"
            options={optionsEquipamentos}
            getOptionLabel={(optionEquipamentos) => optionEquipamentos}
            value={selectedEquipamentos}
            filterSelectedOptions
            onChange={handleChangeEquipamentos}
            renderInput={(params) => (
              <TextField {...params} label="Equipamentos Utilizados" />
            )}
          />

          {loading ? (
            <Button fullWidth variant="contained" disabled sx={{ my: 2 }}>
              Editando...
            </Button>
          ) : (
            <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
              Editar
            </Button>
          )}
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Container>
    );
  else return null;
};

export default ExercicioEdit;
