import React from "react";
import { USER_PROFILE_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material";
import TreinoItem from "./Treino/TreinoItem";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserContext } from "../../UserContext";
import UserInfo from "./UserInfo";
import TuneIcon from "@mui/icons-material/Tune";

const UserPage = () => {
  const { username } = useParams();
  const { data: userData, loading: userLoading } =
    React.useContext(UserContext);
  const { data, loading, error, request } = useFetch();

  const [anchorElMetas, setAnchorElMetas] = React.useState(null);
  const openMenuMetas = Boolean(anchorElMetas);
  const handleClickMenuMetas = (event) => {
    setAnchorElMetas(event.currentTarget);
  };
  const handleCloseMenuMetas = () => {
    setAnchorElMetas(null);
  };

  React.useEffect(() => {
    async function getUserProfileData() {
      const { url, options } = USER_PROFILE_GET(username);
      const { response, json } = await request(url, options);
    }
    getUserProfileData();
  }, [username]);

  if (error) return <div>Error</div>;
  if (loading && userLoading) return <div>Loading</div>;
  if (data) {
    const porcentagemSemanal =
      (Number(data.goals.weekly_progress) / Number(data.goals.weekly_goal)) *
      100;
    const porcentagemMensal =
      (Number(data.goals.monthly_progress) / Number(data.goals.monthly_goal)) *
      100;
    const porcentagemAnual =
      (Number(data.goals.yearly_progress) / Number(data.goals.yearly_goal)) *
      100;

    const WeeklyBar = styled("div")({
      backgroundColor: "#1976d2",
      width: "0%",
      height: "100%",
      animation: "WeeklyBar 0.5s forwards",
      "@keyframes WeeklyBar": {
        to: {
          width: `${porcentagemSemanal <= 100 ? porcentagemSemanal : 100}%`,
        },
      },
    });

    const MonthlyBar = styled("div")({
      backgroundColor: "#1976d2",
      width: "0%",
      height: "100%",
      animation: "MonthlyBar 0.5s forwards",
      "@keyframes MonthlyBar": {
        to: {
          width: `${porcentagemMensal <= 100 ? porcentagemMensal : 100}%`,
        },
      },
    });

    const YearlyBar = styled("div")({
      backgroundColor: "#1976d2",
      width: "0%",
      height: "100%",
      animation: "YearlyBar 0.5s forwards",
      "@keyframes YearlyBar": {
        to: {
          width: `${porcentagemAnual <= 100 ? porcentagemAnual : 100}%`,
        },
      },
    });

    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
        <UserInfo />
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="h5">Metas de Treinos</Typography>
            <Box
              sx={{
                display: `${
                  userData
                    ? userData.username === username
                      ? "block"
                      : "none"
                    : "none"
                }`,
              }}
            >
              <IconButton
                id="metas-button"
                aria-controls={open ? "metas-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickMenuMetas}
              >
                <TuneIcon />
              </IconButton>
              <Menu
                id="metas-menu"
                anchorEl={anchorElMetas}
                open={openMenuMetas}
                onClose={handleCloseMenuMetas}
                MenuListProps={{
                  "aria-labelledby": "metas-button",
                }}
              >
                <MenuItem component={RouterLink} to="/conta/alterar-metas">
                  Alterar Metas
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" color="textSecondary">
                Semanal
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {data.goals.weekly_progress} / {data.goals.weekly_goal}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)", height: "1rem" }}>
              <WeeklyBar></WeeklyBar>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" color="textSecondary">
                Mensal
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {data.goals.monthly_progress} / {data.goals.monthly_goal}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)", height: "1rem" }}>
              <MonthlyBar></MonthlyBar>
            </Box>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" color="textSecondary">
                Anual
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {data.goals.yearly_progress} / {data.goals.yearly_goal}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: "rgba(0, 0, 0, 0.1)", height: "1rem" }}>
              <YearlyBar></YearlyBar>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Último Treino
          </Typography>
          <TreinoItem treino={data.ultimo_treino}></TreinoItem>
        </Box>
      </Container>
    );
  } else return null;
};

export default UserPage;
