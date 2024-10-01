import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import { BottomNavValueContext } from "../BottomNavContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PoolIcon from "@mui/icons-material/Pool";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);
  const { setBottomNavValue } = React.useContext(BottomNavValueContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
            onClick={() => {
              setBottomNavValue(null);
            }}
          >
            <PoolIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              MySwimmingApp
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }}></Box>

          {data ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Abrir opções">
                <Box
                  onClick={handleOpenUserMenu}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      mr: 1,
                      maxWidth: { xs: "10ch", sm: "20ch", md: "none" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.name}
                  </Typography>
                  <AccountCircle />
                </Box>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  component={RouterLink}
                  to="/conta"
                  onClick={() => {
                    setBottomNavValue("perfil");
                    setAnchorElUser(null);
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Perfil
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setBottomNavValue(null);
                    setAnchorElUser(null);
                    userLogout();
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Sair
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button
                variant={isMobile ? "outlined" : "text"}
                component={RouterLink}
                to="/login"
                color="inherit"
              >
                Login
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/login/criar"
                color="inherit"
                sx={{ display: { xs: "none", sm: "inline-flex" }, ml: 1 }}
              >
                Cadastrar
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
