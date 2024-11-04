import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { USER_HISTORICO_GET } from "../../../api";
import useFetch from "../../../Hooks/useFetch";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Container from "@mui/material/Container";
import TreinoItem from "./TreinoItem";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import UserInfo from "../UserInfo";
import Loading from "../../Helper/Loading";

const TreinosListar = () => {
  const { username } = useParams();
  const { data, loading, error, request } = useFetch();
  const [update, setUpdate] = React.useState(0);

  React.useEffect(() => {
    async function getHistorico() {
      const { url, options } = USER_HISTORICO_GET(username);
      const { response, json } = await request(url, options);
    }
    getHistorico();
  }, [update]);

  if (error) return <div>{error}</div>;
  if (loading) return <Loading />;
  if (data)
    return (
      <Container maxWidth="lg" sx={{ paddingY: "2rem" }}>
        <UserInfo />
        <Box
          sx={{
            display: { sm: "flex" },
            justifyContent: "space-between",
            mt: "1rem",
            mb: "2rem",
          }}
        >
          <FormControl
            variant="outlined"
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <OutlinedInput
              id="buscar-treino"
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              }
              placeholder="Buscar Treino"
            />
          </FormControl>
        </Box>
        {data.map((treino) => (
          <Box
            key={treino.id}
            component={RouterLink}
            to={`/user/${username}/treino/${treino.id}`}
            sx={{ textDecoration: "none" }}
          >
            <TreinoItem treino={treino} setUpdate={setUpdate} />
          </Box>
        ))}
      </Container>
    );
  else return null;
};

export default TreinosListar;
