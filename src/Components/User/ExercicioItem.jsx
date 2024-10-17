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

const ExercicioItem = ({ exercicio }) => {
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
          sx={{ marginLeft: "0px !important" }}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExercicioItem;
