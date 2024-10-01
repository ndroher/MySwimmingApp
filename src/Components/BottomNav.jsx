import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import { BottomNavValueContext } from "../BottomNavContext";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import HistoryIcon from "@mui/icons-material/History";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import InsightsIcon from "@mui/icons-material/Insights";
import PersonIcon from "@mui/icons-material/Person";

export default function SimpleBottomNavigation() {
  const { data } = React.useContext(UserContext);

  const { bottomNavValue, setBottomNavValue } = React.useContext(
    BottomNavValueContext
  );

  React.useEffect(() => {
    if (!bottomNavValue) {
      switch (window.location.pathname) {
        case "/conta":
          setBottomNavValue("perfil");
          break;
        case "/estatisticas":
          setBottomNavValue("estatisticas");
          break;
        case "/historico":
          setBottomNavValue("historico");
          break;
        case "/exercicios":
          setBottomNavValue("exercicios");
          break;
        default:
          break;
      }
    }
  }, [window.location.pathname]);

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <StyledFab color={data ? "primary" : "inherit"} aria-label="add">
        <AddIcon />
      </StyledFab>

      <BottomNavigation
        value={bottomNavValue}
        onChange={(event, newValue) => {
          data ? setBottomNavValue(newValue) : setBottomNavValue(null);
        }}
      >
        <BottomNavigationAction
          label="Perfil"
          value="perfil"
          component={RouterLink}
          to={data ? "/conta" : "/login"}
          icon={<PersonIcon />}
        />
        <BottomNavigationAction
          label="Estatísticas"
          value="estatisticas"
          component={RouterLink}
          to={data ? "/estatisticas" : "/login"}
          icon={<InsightsIcon />}
        />
        <BottomNavigationAction
          label="Histórico"
          value="historico"
          component={RouterLink}
          to={data ? "/historico" : "/login"}
          icon={<HistoryIcon />}
        />
        <BottomNavigationAction
          label="Exercícios"
          value="exercicios"
          component={RouterLink}
          to={data ? "/exercicios" : "/login"}
          icon={<FitnessCenterIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
