import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useFetch from "../../../Hooks/useFetch";
import { EXERCICIO_DELETE } from "../../../api";

const ExercicioItem = ({ exercicio, setUpdate }) => {
  const { data, loading, error, request } = useFetch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const excluirExercicio = () => {
    async function excluir() {
      const token = window.localStorage.getItem("token");
      const { url, options } = EXERCICIO_DELETE(token, exercicio.id);
      const { response, json } = await request(url, options);
      if (response.ok) setUpdate((value) => value + 1);
    }
    excluir();
    handleClose();
  };

  return (
    <Card
      sx={{
        mb: "2rem",
        display: "flex",
        justifyContent: "space-between",
        minHeight: "136px",
      }}
    >
      <CardContent sx={{ alignSelf: "center" }}>
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
        {exercicio.equipamentos.map((equipamento) => (
          <Chip
            key={equipamento}
            label={equipamento}
            sx={{ mt: "1rem", mr: "1rem" }}
          />
        ))}
      </CardContent>
      <CardActions
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "space-around", sm: "auto" },
        }}
      >
        <Button
          component={RouterLink}
          to={`/conta/exercicios/editar?id=${exercicio.id}`}
          size="small"
          color="action"
          disabled={!exercicio.personalizado}
        >
          <EditIcon />
        </Button>
        <Button
          size="small"
          color="action"
          disabled={!exercicio.personalizado}
          onClick={handleClickOpen}
          sx={{ marginLeft: "0px !important" }}
        >
          <DeleteIcon />
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Excluir Exercício"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja excluir o exercício "{exercicio.nome}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={excluirExercicio} color="error" autoFocus>
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
};

export default ExercicioItem;
