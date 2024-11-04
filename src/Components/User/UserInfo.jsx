import React from "react";
import { USER_PROFILE_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { UserContext } from "../../UserContext";
import UserInfoLoader from "../Helper/UserInfoLoader";
import ErrorPage from "../ErrorPage";

const UserInfo = () => {
  const [tabsValue, setTabsValue] = React.useState(0);

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const { username } = useParams();
  const { data: userData, loading: userLoading } =
    React.useContext(UserContext);
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function getUserProfileData() {
      const { url, options } = USER_PROFILE_GET(username);
      const { response, json } = await request(url, options);
    }
    getUserProfileData();
  }, [username]);

  React.useEffect(() => {
    if (!loading && data) {
      switch (window.location.pathname) {
        case `/user/${data.username}`:
          setTabsValue(0);
          break;
        case `/user/${data.username}/estatisticas`:
          setTabsValue(1);
          break;
        case `/user/${data.username}/historico`:
          setTabsValue(2);
          break;
        default:
          setTabsValue(null);
          break;
      }
    }
  }, [window.location.pathname, loading, data]);

  if (error) return <ErrorPage />;
  if (loading) return <UserInfoLoader />;
  if (data) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Avatar
            alt={data.username}
            src={data.avatar_url}
            sx={{ width: 120, height: 120 }}
          />
          <Typography variant="h5" sx={{ mt: "1rem" }}>
            {data.display_name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ fontStyle: "italic" }}
          >
            @{data.username}
          </Typography>

          <Box
            sx={{
              display: `${
                userData
                  ? userData.username === username
                    ? "block"
                    : "none"
                  : "none"
              }`,
              position: "absolute",
              top: "0",
              right: "0",
            }}
          >
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickMenu}
            >
              <ManageAccountsIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem component={RouterLink} to="/conta/alterar-nome">
                Alterar Nome de Exibição
              </MenuItem>
              <MenuItem component={RouterLink} to="/conta/alterar-foto">
                Alterar Foto de Perfil
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <Tabs value={tabsValue} onChange={handleTabsChange} centered>
          <Tab label="Perfil" component={RouterLink} to={`/user/${username}`} />
          <Tab
            label="Estatísticas"
            component={RouterLink}
            to={`/user/${username}/estatisticas`}
          />
          <Tab
            label="Histórico"
            component={RouterLink}
            to={`/user/${username}/historico`}
          />
        </Tabs>
      </>
    );
  } else return null;
};

export default UserInfo;
