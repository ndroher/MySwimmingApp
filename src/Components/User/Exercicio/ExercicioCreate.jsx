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
import { EXERCICIO_POST } from "../../../api";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../../ErrorPage";
import OfflinePage from "../../OfflinePage";
import Head from "../../Helper/Head";

const ExercicioCreate = () => {
  const nome_exercicio = useForm();
  const [selectedTipoNado, setSelectedTipoNado] = React.useState([]);
  const [selectedEquipamentos, setSelectedEquipamentos] = React.useState([]);

  const { loading, error, request } = useFetch();

  const [optionsNados, setOptionsNados] = React.useState([]);
  const [optionsEquipamentos, setOptionsEquipamentos] = React.useState([]);

  const handleChangeTipoNado = (e, v) =>
    setSelectedTipoNado(v.map((item) => item));
  const handleChangeEquipamentos = (e, v) =>
    setSelectedEquipamentos(v.map((item) => item));

  const navigate = useNavigate();

  React.useEffect(() => {
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

  async function handleSubmit(event) {
    event.preventDefault();
    if (nome_exercicio.validate()) {
      const token = window.localStorage.getItem("token");
      const { url, options } = EXERCICIO_POST(
        {
          nome: nome_exercicio.value,
          tipo_nado: selectedTipoNado,
          equipamentos: selectedEquipamentos,
          personalizado: true,
        },
        token
      );
      const { response } = await request(url, options);
      if (response.ok) navigate("/conta/exercicios");
    }
  }

  if (error && !navigator.onLine) return <OfflinePage />;
  return (
    <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
      <Head title="Criar Novo Exercício" />
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
        Criar Novo Exercício
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
          filterSelectedOptions
          onChange={handleChangeEquipamentos}
          renderInput={(params) => (
            <TextField {...params} label="Equipamentos Utilizados" />
          )}
        />

        {loading ? (
          <Button fullWidth variant="contained" disabled sx={{ my: 2 }}>
            Criando...
          </Button>
        ) : (
          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Criar
          </Button>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default ExercicioCreate;
