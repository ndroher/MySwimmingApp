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
import { TREINO_POST } from "../../../api";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../../../UserContext";

const TreinoCreate = () => {
  const { data } = React.useContext(UserContext);
  const nome_treino = useForm();
  const tamanho_piscina = useForm("number");

  const [chegadas, setChegadas] = React.useState([]);
  const [errorChegadas, setErrorChegadas] = React.useState([]);

  const addChegada = () => {
    setChegadas([
      ...chegadas,
      {
        exercicio_ida: { id: "" },
        exercicio_volta: { id: "" },
        repeticoes: "",
      },
    ]);
    setErrorChegadas((prev) => [
      ...prev,
      { exercicio_ida: null, exercicio_volta: null, repeticoes: null },
    ]);
  };

  const removeChegada = (index) => {
    const updatedChegadas = chegadas.filter((_, i) => i !== index);
    const updatedErrors = errorChegadas.filter((_, i) => i !== index);
    setChegadas(updatedChegadas);
    setErrorChegadas(updatedErrors);
  };

  function validate(value, field, index) {
    let newErrors = [...errorChegadas];
    if (field === "repeticoes") {
      if (value.length === 0) {
        newErrors[index].repeticoes = "Preencha um valor";
      } else if (value < 1) {
        newErrors[index].repeticoes = "Insira um número maior ou igual a 1";
      } else {
        newErrors[index].repeticoes = null;
      }
    } else {
      if (value.length === 0) {
        newErrors[index][field] = "Preencha um valor";
      } else if (value < 1) {
        newErrors[index][field] = "Insira um número maior ou igual a 1";
      } else {
        newErrors[index][field] = null;
      }
    }
    setErrorChegadas(newErrors);
    return (
      newErrors[index][field] === null && newErrors[index].repeticoes === null
    );
  }

  function validateChegadas() {
    return errorChegadas.every(
      (error) =>
        !error ||
        Object.values(error).every((fieldError) => fieldError === null)
    );
  }

  const handleChegadaChange = (index, field, value) => {
    if (field === "repeticoes" && value === "") {
      setChegadas((prevChegadas) => {
        const updatedChegadas = [...prevChegadas];
        updatedChegadas[index].repeticoes = "";
        return updatedChegadas;
      });

      setErrorChegadas((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index].repeticoes = null;
        return newErrors;
      });

      return;
    }

    validate(value, field, index);

    setChegadas((prevChegadas) => {
      const updatedChegadas = [...prevChegadas];

      if (field === "exercicio_ida" || field === "exercicio_volta") {
        updatedChegadas[index] = {
          ...updatedChegadas[index],
          [field]: { id: value === "0" ? 0 : parseInt(value, 10) || "" },
        };
      } else if (field === "repeticoes") {
        updatedChegadas[index] = {
          ...updatedChegadas[index],
          repeticoes: value ? parseInt(value, 10) : "",
        };
      }

      return updatedChegadas;
    });
  };

  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      nome_treino.validate() &&
      tamanho_piscina.validate() &&
      validateChegadas()
    ) {
      const token = window.localStorage.getItem("token");
      const { url, options } = TREINO_POST(
        {
          nome: nome_treino.value,
          tamanho_da_piscina: tamanho_piscina.value,
          chegadas: chegadas,
        },
        token
      );
      const { response } = await request(url, options);
      if (response.ok) navigate(`/user/${data.username}`);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ paddingY: "2rem", mb: 10 }}>
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
        Criar Novo Treino
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5">Informações</Typography>
        <Box sx={{ my: 2 }}>
          <Input
            label="Nome"
            type="text"
            name="nome_treino"
            fullWidth
            sx={{ mb: 2 }}
            {...nome_treino}
          />

          <Input
            label="Tamanho da Piscina"
            type="number"
            name="tamanho_piscina"
            fullWidth
            sx={{ mb: 2 }}
            {...tamanho_piscina}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">metros</InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Typography variant="h5">Chegadas</Typography>
        {chegadas.map((chegada, index) => (
          <Paper variant="outlined" key={index} sx={{ padding: 2, my: 2 }}>
            <TextField
              label="Exercício de Ida"
              type="number"
              name="exercicio_ida"
              fullWidth
              value={chegada.exercicio_ida.id}
              onChange={(e) =>
                handleChegadaChange(index, "exercicio_ida", e.target.value)
              }
              sx={{ mb: 2 }}
              error={errorChegadas[index]?.exercicio_ida !== null}
              helperText={errorChegadas[index]?.exercicio_ida}
              onBlur={() =>
                validate(chegada.exercicio_ida.id, "exercicio_ida", index)
              }
            />
            <TextField
              label="Exercício de Volta"
              type="number"
              name="exercicio_volta"
              fullWidth
              value={chegada.exercicio_volta.id}
              onChange={(e) =>
                handleChegadaChange(index, "exercicio_volta", e.target.value)
              }
              sx={{ mb: 2 }}
              error={errorChegadas[index]?.exercicio_volta !== null}
              helperText={errorChegadas[index]?.exercicio_volta}
              onBlur={() =>
                validate(chegada.exercicio_volta.id, "exercicio_volta", index)
              }
            />

            <TextField
              label="Repetições"
              type="number"
              name="repeticoes"
              value={chegada.repeticoes}
              onChange={(e) =>
                handleChegadaChange(index, "repeticoes", e.target.value)
              }
              fullWidth
              sx={{ mb: 2 }}
              error={errorChegadas[index]?.repeticoes !== null}
              helperText={errorChegadas[index]?.repeticoes}
              onBlur={() => validate(chegada.repeticoes, "repeticoes", index)}
            />
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => removeChegada(index)}
            >
              Remover Chegada <DeleteIcon sx={{ marginLeft: 1 }} />
            </Button>
          </Paper>
        ))}

        <Button
          fullWidth
          variant="outlined"
          onClick={addChegada}
          sx={{ my: 2 }}
        >
          Adicionar Chegada <AddIcon sx={{ marginLeft: 1 }} />
        </Button>

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

export default TreinoCreate;
