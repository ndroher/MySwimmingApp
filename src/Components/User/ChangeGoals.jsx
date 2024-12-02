import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "../Forms/Input";
import Waves from "@mui/icons-material/Waves";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { USER_PROFILE_GET, USER_GOALS_PUT } from "../../api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Loading from "../Helper/Loading";
import ErrorPage from "../ErrorPage";
import OfflinePage from "../OfflinePage";
import Head from "../Helper/Head";

const ChangeGoals = () => {
  const meta_semanal = useForm("number");
  const meta_mensal = useForm("number");
  const meta_anual = useForm("number");

  const { data: userData, loading: userLoading } =
    React.useContext(UserContext);
  const { data, loading, error, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userLoading && userData) {
      async function getUserProfileData() {
        const { url, options } = USER_PROFILE_GET(userData.username);
        const { response, json } = await request(url, options);
      }
      getUserProfileData();
    }
  }, [userLoading, userData]);

  React.useEffect(() => {
    if (data) {
      meta_semanal.setValue(data.goals.weekly_goal);
      meta_mensal.setValue(data.goals.monthly_goal);
      meta_anual.setValue(data.goals.yearly_goal);
    }
  }, [data]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      meta_semanal.validate() &&
      meta_mensal.validate() &&
      meta_anual.validate()
    ) {
      const token = window.localStorage.getItem("token");
      const { url, options } = USER_GOALS_PUT(
        {
          weekly_goal: meta_semanal.value,
          monthly_goal: meta_mensal.value,
          yearly_goal: meta_anual.value,
        },
        token
      );
      const { response } = await request(url, options);
      if (response.ok) navigate(`/user/${userData.username}`);
    }
  }

  if (error && !navigator.onLine) return <OfflinePage />;
  if (loading) return <Loading />;
  if (data)
    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
        <Head title="Alterar Metas" />
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
          Alterar Metas
        </Typography>

        <Box component="form" action="" onSubmit={handleSubmit}>
          <Input
            label="Meta Semanal"
            type="text"
            name="meta_semanal"
            fullWidth
            sx={{ mb: 2 }}
            {...meta_semanal}
          />

          <Input
            label="Meta Mensal"
            type="text"
            name="meta_mensal"
            fullWidth
            sx={{ mb: 2 }}
            {...meta_mensal}
          />

          <Input
            label="Meta Anual"
            type="text"
            name="meta_anual"
            fullWidth
            sx={{ mb: 2 }}
            {...meta_anual}
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

export default ChangeGoals;
