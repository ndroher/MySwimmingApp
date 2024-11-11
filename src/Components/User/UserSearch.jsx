import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { USERS_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Container from "@mui/material/Container";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import Waves from "@mui/icons-material/Waves";
import Loading from "../Helper/Loading";
import ErrorPage from "../ErrorPage";
const UserSearch = () => {
  const { data, loading, error, request } = useFetch();
  const [update, setUpdate] = React.useState(0);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    async function getUsers() {
      const { url, options } = USERS_GET();
      const { response, json } = await request(url, options);
    }
    getUsers();
  }, []);

  if (error) return <ErrorPage />;
  if (loading) return <Loading />;
  if (data) {
    const users = data.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
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
          Buscar Usuário
        </Typography>
        <Box
          sx={{
            display: { sm: "flex" },
            justifyContent: "space-between",
            mt: "1rem",
            mb: "2rem",
          }}
        >
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              id="buscar-usuario"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              }
              placeholder="Pesquisar"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormControl>
        </Box>
        {search.length > 2 ? (
          users.length > 0 ? (
            users.map((user) => (
              <Card
                component={RouterLink}
                to={`/user/${user.username}`}
                key={user.username}
                sx={{
                  mb: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  textDecoration: "none",
                }}
              >
                <CardContent
                  sx={{
                    alignSelf: "center",
                    width: "100%",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Avatar
                    alt={user.username}
                    src={user.avatar_url}
                    sx={{ width: 64, height: 64 }}
                  />
                  <Box>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      @{user.username}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography color="textSecondary">
              Nenhum usuário encontrado.
            </Typography>
          )
        ) : (
          <Typography color="textSecondary">
            Insira pelo menos 3 caracteres para exibir os resultados da
            pesquisa.
          </Typography>
        )}
      </Container>
    );
  } else return null;
};

export default UserSearch;
