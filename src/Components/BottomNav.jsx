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
  const { login, data, loading } = React.useContext(UserContext);

  const { bottomNavValue, setBottomNavValue } = React.useContext(
    BottomNavValueContext
  );

  React.useEffect(() => {
    if (!loading && data) {
      switch (window.location.pathname) {
        case `/user/${data.username}`:
          setBottomNavValue("perfil");
          break;
        case `/user/${data.username}/estatisticas`:
          setBottomNavValue("estatisticas");
          break;
        case `/user/${data.username}/historico`:
          setBottomNavValue("historico");
          break;
        case "/conta/exercicios":
          setBottomNavValue("exercicios");
          break;
        default:
          setBottomNavValue(null);
          break;
      }
    }
  }, [window.location.pathname, loading, data]);

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
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }}
      elevation={3}
    >
      <StyledFab
        color={login ? "primary" : "inherit"}
        aria-label="add"
        component={RouterLink}
        to={login ? "/conta/novo-treino" : "/login"}
      >
        <AddIcon />
      </StyledFab>

      <BottomNavigation
        value={bottomNavValue}
        onChange={(event, newValue) => {
          login ? setBottomNavValue(newValue) : setBottomNavValue(null);
        }}
      >
        <BottomNavigationAction
          label="Perfil"
          value="perfil"
          component={RouterLink}
          to={login ? `/user/${data.username}` : "/login"}
          icon={<PersonIcon />}
        />
        <BottomNavigationAction
          label="Estatísticas"
          value="estatisticas"
          component={RouterLink}
          to={login ? `/user/${data.username}/estatisticas` : "/login"}
          icon={<InsightsIcon />}
        />
        <BottomNavigationAction
          label="Histórico"
          value="historico"
          component={RouterLink}
          to={login ? `/user/${data.username}/historico` : "/login"}
          icon={<HistoryIcon />}
        />
        <BottomNavigationAction
          label="Exercícios"
          value="exercicios"
          component={RouterLink}
          to={login ? "/conta/exercicios" : "/login"}
          icon={<FitnessCenterIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
