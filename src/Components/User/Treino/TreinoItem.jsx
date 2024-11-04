import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const TreinoItem = ({ treino }) => {
  let totalRepeticoes = 0;
  Object.keys(treino.repeticoes_por_tipo_de_nado).map(
    (tipo_de_nado) =>
      (totalRepeticoes += treino.repeticoes_por_tipo_de_nado[tipo_de_nado])
  );
  const cores = {
    Crawl: "#1976d2",
    Costas: "#fbc02d",
    Borboleta: "#c2185b",
    Peito: "#7b1fa2",
  };
  return (
    <Card
      sx={{
        mb: "2rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ alignSelf: "center", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{treino.nome}</Typography>
          <Typography variant="h6">{treino.distancia_total}m</Typography>
        </Box>
        <Typography variant="subtitle1" color="textSecondary">
          {treino.post_date}
        </Typography>
        <Box sx={{ display: "flex", width: "100%", my: 1 }}>
          {Object.keys(treino.repeticoes_por_tipo_de_nado).map(
            (tipo_de_nado) => (
              <Box
                key={tipo_de_nado}
                sx={{
                  width: `calc((${treino.repeticoes_por_tipo_de_nado[tipo_de_nado]}/${totalRepeticoes}) * 100%)`,
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
        {treino.equipamentos_utilizados.map((equipamentos_utilizado) => (
          <Chip
            key={equipamentos_utilizado}
            label={equipamentos_utilizado}
            sx={{ mt: "1rem", mr: "1rem" }}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default TreinoItem;
