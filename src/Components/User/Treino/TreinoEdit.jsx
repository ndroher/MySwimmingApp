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
import { EXERCICIOS_GET, USER_TREINO_GET, TREINO_PUT } from "../../../api";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import Loading from "../../Helper/Loading";
import ErrorPage from "../../ErrorPage";
import OfflinePage from "../../OfflinePage";
import Head from "../../Helper/Head";

function SimpleDialog(props) {
  const {
    onClose,
    selectedValue,
    open,
    exerciciosData,
    exerciciosLoading,
    exerciciosError,
    index,
    field,
  } = props;

  const handleClose = () => {
    onClose(index, field, selectedValue);
  };

  const handleListItemClick = (index, field, value) => {
    onClose(index, field, value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      {field === "exercicio_ida" ? (
        <DialogTitle>Exercício de Ida</DialogTitle>
      ) : (
        <DialogTitle>Exercício de Volta</DialogTitle>
      )}
      <DialogContent dividers={scroll === "paper"}>
        <List sx={{ pt: 0 }}>
          {exerciciosLoading && <ListItem>Carregando...</ListItem>}
          {exerciciosError && <ListItem>Erro ao carregar dados.</ListItem>}
          {exerciciosData &&
            exerciciosData.map((exercicio, exercicioIndex) => (
              <Box key={exercicio.id} sx={{ minWidth: "25rem" }}>
                <ListItem disableGutters>
                  <ListItemButton
                    onClick={() => handleListItemClick(index, field, exercicio)}
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography variant="h6">{exercicio.nome}</Typography>
                    <Box sx={{ display: "flex" }}>
                      {exercicio.tipo_nado.map((tipo_nado) => (
                        <Typography
                          key={tipo_nado}
                          color="textSecondary"
                          sx={{ mr: "1rem" }}
                        >
                          {tipo_nado}
                        </Typography>
                      ))}
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      {exercicio.equipamentos.map((equipamento) => (
                        <Chip
                          key={equipamento}
                          label={equipamento}
                          sx={{ mt: "1rem", mr: "1rem" }}
                        />
                      ))}
                    </Box>
                  </ListItemButton>
                </ListItem>
                {exercicioIndex === 0 ||
                exercicioIndex !== exerciciosData.length - 1 ? (
                  <Divider variant="middle" />
                ) : null}
              </Box>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.number.isRequired,
  exerciciosData: PropTypes.array.isRequired,
  exerciciosLoading: PropTypes.bool.isRequired,
  exerciciosError: PropTypes.string,
  index: PropTypes.number.isRequired,
  field: PropTypes.string.isRequired,
};

const TreinoEdit = () => {
  const { data } = React.useContext(UserContext);
  const nome_treino = useForm();
  const tamanho_piscina = useForm("number");

  const [searchParams] = useSearchParams();
  const treino_id = searchParams.get("id");

  const [chegadas, setChegadas] = React.useState([]);
  const [errorChegadas, setErrorChegadas] = React.useState([]);

  const addChegada = () => {
    setChegadas([
      ...chegadas,
      {
        exercicio_ida: { id: "", nome: "", tipo_nado: "", equipamentos: "" },
        exercicio_volta: { id: "", nome: "", tipo_nado: "", equipamentos: "" },
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
    let newErrors = [...errorChegadas];

    const errorsValid = newErrors.every(
      (error) =>
        !error ||
        Object.values(error).every((fieldError) => fieldError === null)
    );

    const chegadasValid = chegadas.every((chegada, index) => {
      if (chegada.repeticoes === null || chegada.repeticoes === "") {
        newErrors[index].repeticoes = "Preencha um valor";
        return false;
      }
      return true;
    });

    setErrorChegadas(newErrors);

    return errorsValid && chegadasValid;
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
      const { url, options } = TREINO_PUT(
        {
          nome: nome_treino.value,
          tamanho_da_piscina: tamanho_piscina.value,
          chegadas: chegadas,
        },
        token,
        treino_id
      );
      const { response } = await request(url, options);
      if (response.ok) navigate(`/user/${data.username}/treino/${treino_id}`);
    }
  }

  const [open, setOpen] = React.useState(false);
  const [field, setField] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickOpen = (index, field) => {
    setField(field);
    setSelectedIndex(index);
    setOpen(true);
  };

  const handleClose = (index, field, value) => {
    setOpen(false);
    setChegadas((prevChegadas) => {
      const updatedChegadas = [...prevChegadas];
      updatedChegadas[index] = {
        ...updatedChegadas[index],
        [field]: {
          id: parseInt(value.id, 10),
          nome: value.nome,
          tipo_nado: value.tipo_nado,
          equipamentos: value.equipamentos,
        },
      };
      return updatedChegadas;
    });
  };

  const {
    data: exerciciosData,
    loading: exerciciosLoading,
    error: exerciciosError,
    request: exerciciosRequest,
  } = useFetch();

  const {
    data: treinoData,
    loading: treinoLoading,
    error: treinoError,
    request: treinoRequest,
  } = useFetch();

  React.useEffect(() => {
    async function getExercicios() {
      const token = window.localStorage.getItem("token");
      const { url, options } = EXERCICIOS_GET(token);
      const { response, json } = await exerciciosRequest(url, options);
    }
    getExercicios();

    async function getTreino() {
      const { url, options } = USER_TREINO_GET(data.username, treino_id);
      const { response, json } = await treinoRequest(url, options);
    }
    getTreino();
  }, []);

  React.useEffect(() => {
    if (treinoData) {
      nome_treino.setValue(treinoData.nome);
      tamanho_piscina.setValue(treinoData.tamanho_da_piscina);
      setChegadas(treinoData.exercicios);
      const initialErrors = treinoData.exercicios.map(() => ({
        exercicio_ida: null,
        exercicio_volta: null,
        repeticoes: null,
      }));
      setErrorChegadas(initialErrors);
    }
  }, [treinoData]);

  if (error && !navigator.onLine) return <OfflinePage />;
  if (treinoError) return <ErrorPage />;
  if (loading || treinoLoading) return <Loading />;
  if (data && treinoData && exerciciosData) {
    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem", mb: 10 }}>
        <Head title="Editar Treino" />
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
          Editar Treino
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
              <Box>
                <TextField
                  label="Exercício de Ida"
                  type="number"
                  name="exercicio_ida"
                  fullWidth
                  value={chegada.exercicio_ida.id}
                  onChange={(e) =>
                    handleChegadaChange(index, "exercicio_ida", e.target.value)
                  }
                  sx={{ mb: 2, display: "none" }}
                  error={errorChegadas[index]?.exercicio_ida !== null}
                  helperText={errorChegadas[index]?.exercicio_ida}
                  onBlur={() =>
                    validate(chegada.exercicio_ida.id, "exercicio_ida", index)
                  }
                  disabled
                />

                {chegada.exercicio_ida?.nome ? (
                  <Card
                    sx={{
                      my: 2,
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
                        Ida
                      </Typography>
                      <Typography variant="h6">
                        {chegada.exercicio_ida.nome}
                      </Typography>
                      <Box sx={{ display: "flex" }}>
                        {chegada.exercicio_ida.tipo_nado.map((tipo_nado) => (
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
                        {chegada.exercicio_ida.equipamentos.map(
                          (equipamento) => (
                            <Chip
                              key={equipamento}
                              label={equipamento}
                              sx={{ mr: 1 }}
                            />
                          )
                        )}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => handleClickOpen(index, "exercicio_ida")}
                        sx={{ width: { xs: "100%", md: "auto" } }}
                      >
                        Alterar Exercício
                      </Button>
                    </CardActions>
                  </Card>
                ) : (
                  <Card
                    sx={{
                      my: 2,
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
                        Ida
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        Selecione um Exercício
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => handleClickOpen(index, "exercicio_ida")}
                        sx={{ width: { xs: "100%", md: "auto" } }}
                      >
                        Adicionar Exercício
                      </Button>
                    </CardActions>
                  </Card>
                )}
                <SimpleDialog
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                  exerciciosData={exerciciosData}
                  exerciciosLoading={exerciciosLoading}
                  exerciciosError={exerciciosError}
                  index={selectedIndex}
                  field={field}
                />
              </Box>
              <Box>
                <TextField
                  label="Exercício de Volta"
                  type="number"
                  name="exercicio_volta"
                  fullWidth
                  value={chegada.exercicio_volta.id}
                  onChange={(e) =>
                    handleChegadaChange(
                      index,
                      "exercicio_volta",
                      e.target.value
                    )
                  }
                  sx={{ mb: 2, display: "none" }}
                  error={errorChegadas[index]?.exercicio_volta !== null}
                  helperText={errorChegadas[index]?.exercicio_volta}
                  onBlur={() =>
                    validate(
                      chegada.exercicio_volta.id,
                      "exercicio_volta",
                      index
                    )
                  }
                  disabled
                />
                {chegada.exercicio_volta?.nome ? (
                  <Card
                    sx={{
                      my: 2,
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
                        Ida
                      </Typography>
                      <Typography variant="h6">
                        {chegada.exercicio_volta.nome}
                      </Typography>
                      <Box sx={{ display: "flex" }}>
                        {chegada.exercicio_volta.tipo_nado.map((tipo_nado) => (
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
                        {chegada.exercicio_volta.equipamentos.map(
                          (equipamento) => (
                            <Chip
                              key={equipamento}
                              label={equipamento}
                              sx={{ mr: 1 }}
                            />
                          )
                        )}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() =>
                          handleClickOpen(index, "exercicio_volta")
                        }
                        sx={{ width: { xs: "100%", md: "auto" } }}
                      >
                        Alterar Exercício
                      </Button>
                    </CardActions>
                  </Card>
                ) : (
                  <Card
                    sx={{
                      my: 2,
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
                      <Typography variant="h6" color="textSecondary">
                        Selecione um Exercício
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() =>
                          handleClickOpen(index, "exercicio_volta")
                        }
                        sx={{ width: { xs: "100%", md: "auto" } }}
                      >
                        Adicionar Exercício
                      </Button>
                    </CardActions>
                  </Card>
                )}
                <SimpleDialog
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                  exerciciosData={exerciciosData}
                  exerciciosLoading={exerciciosLoading}
                  exerciciosError={exerciciosError}
                  index={selectedIndex}
                  field={field}
                />
              </Box>

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
  } else return null;
};

export default TreinoEdit;
