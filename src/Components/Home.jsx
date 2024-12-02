import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import video from "/assets/swimming-video.mp4";
import mockup1 from "/assets/mockup1.png";
import mockup2 from "/assets/mockup2.png";
import waveDivider from "/assets/wave-divider.svg";
import waveDivider2 from "/assets/wave-divider2.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as RouterLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Head from "../Components/Helper/Head";

const Home = () => {
  React.useEffect(() => {
    AOS.init();
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Head title="Home" />
      <Box
        sx={{
          position: "relative",
          height: `calc(100vh - 64px)`,
          overflow: "hidden",
          margin: "0",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            zIndex: "-1",
            position: "absolute",
            width: "auto",
            height: "auto",
            minHeight: "100%",
            minWidth: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "brightness(75%)",
          }}
        >
          <source src={video} type="video/mp4" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            color="#fff"
            gutterBottom={false}
            sx={{
              fontWeight: "700",
            }}
          >
            MySwimmingApp
          </Typography>
          <Typography color="#fff" sx={{ fontWeight: "500" }}>
            Monitore sua jornada, supere seus objetivos.
          </Typography>
          <Button
            component={RouterLink}
            to="/login/criar"
            variant="contained"
            sx={{ paddingX: 3, paddingY: 1.5 }}
          >
            Junte-se à comunidade!
          </Button>
        </Box>
      </Box>
      <Box
        component="img"
        src={waveDivider2}
        alt="Divider"
        sx={{
          display: "block",
          transform: "scaleX(-1)",
        }}
      />
      <Box sx={{ backgroundColor: "#1976d2" }}>
        <Typography
          data-aos="fade-down"
          variant={isMobile ? "h4" : "h3"}
          color="#fff"
          textAlign="center"
          fontFamily='"Calistoga", "Roboto", "Helvetica", "Arial", sans-serif;'
          sx={{ paddingTop: { xs: 3, lg: 0 } }}
        >
          O que oferecemos?
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#1976d2",
          paddingY: "2rem",
          position: "relative",
        }}
      >
        <div className="bubbles">
          <Box
            sx={{
              height: "60px",
              width: "60px",
              border: "2px solid rgba(255, 255, 255, 0.7)",
              borderRadius: "50px",
              position: "absolute",
              top: "90%",
              left: "10%",
            }}
            className="bubbleAnimate"
          >
            <Box
              sx={{
                height: "10px",
                width: "10px",
                borderRadius: "50px",
                background: "rgba(255, 255, 255, 0.5)",
                position: "absolute",
                top: "20%",
                right: "20%",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              height: "60px",
              width: "60px",
              border: "2px solid rgba(255, 255, 255, 0.7)",
              borderRadius: "50px",
              position: "absolute",
              top: "82%",
              right: "7%",
            }}
            className="bubbleAnimate2"
          >
            <Box
              sx={{
                height: "10px",
                width: "10px",
                borderRadius: "50px",
                background: "rgba(255, 255, 255, 0.5)",
                position: "absolute",
                top: "20%",
                right: "20%",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              height: "60px",
              width: "60px",
              border: "2px solid rgba(255, 255, 255, 0.7)",
              borderRadius: "50px",
              position: "absolute",
              top: "76%",
              right: "10%",
              display: { xs: "none", lg: "block" },
            }}
            className="bubbleAnimate"
          >
            <Box
              sx={{
                height: "10px",
                width: "10px",
                borderRadius: "50px",
                background: "rgba(255, 255, 255, 0.5)",
                position: "absolute",
                top: "20%",
                right: "20%",
              }}
            ></Box>
          </Box>
        </div>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", lg: "row-reverse" },
              gap: "1rem",
            }}
          >
            <Box
              data-aos="fade-left"
              sx={{
                maxWidth: "50%",
                position: "relative",
                my: { xs: 4, sm: 0 },
              }}
            >
              <Box
                className="breathing"
                sx={{
                  backgroundColor: "rgb(23, 105, 170)",
                  borderRadius: "50%",
                  width: { xs: "4rem", md: "15rem" },
                  height: { xs: "4rem", md: "15rem" },
                  position: "absolute",
                  left: { xs: `calc(50% - 2rem)`, md: `calc(50% - 7.5rem)` },
                  top: { xs: `calc(50% - 2rem)`, md: `calc(50% - 7.5rem)` },
                  zIndex: "0",
                }}
              ></Box>
              <Box
                component="img"
                src={mockup1}
                alt="Aplicativo em um Smartphone"
                sx={{ maxWidth: "100%", position: "relative" }}
              />
            </Box>
            <Box
              data-aos="fade-right"
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Typography
                variant={isMobile ? "h4" : "h3"}
                color="#fff"
                textAlign="center"
                fontFamily='"Calistoga", "Roboto", "Helvetica", "Arial", sans-serif;'
              >
                Monitore seus treinos
              </Typography>
              <Typography color="#fff" textAlign="center">
                Otimize seus treinos de natação com nosso aplicativo! Crie,
                personalize e monitore suas sessões, registrando exercícios,
                repetições, tipos de nado e distância percorrida. Acompanhe seu
                progresso e alcance seus objetivos com mais eficiência.
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Box
              data-aos="fade-right"
              sx={{
                maxWidth: "50%",
                position: "relative",
                my: { xs: 4, sm: 0 },
              }}
            >
              <Box
                className="breathing"
                sx={{
                  backgroundColor: "rgb(23, 105, 170)",
                  borderRadius: "50%",
                  width: { xs: "4rem", md: "15rem" },
                  height: { xs: "4rem", md: "15rem" },
                  position: "absolute",
                  left: { xs: `calc(50% - 2rem)`, md: `calc(50% - 7.5rem)` },
                  top: { xs: `calc(50% - 2rem)`, md: `calc(50% - 7.5rem)` },
                  zIndex: "0",
                }}
              ></Box>
              <Box
                component="img"
                src={mockup2}
                alt="Aplicativo em um Smartphone"
                sx={{ maxWidth: "100%", position: "relative" }}
              />
            </Box>
            <Box
              data-aos="fade-left"
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Typography
                variant={isMobile ? "h4" : "h3"}
                color="#fff"
                textAlign="center"
                fontFamily='"Calistoga", "Roboto", "Helvetica", "Arial", sans-serif;'
              >
                Visualize suas estatísticas
              </Typography>
              <Typography color="#fff" textAlign="center">
                Acompanhe seu desempenho de forma inteligente com gráficos
                detalhados, monitorando estatísticas como repetições por tipo de
                nado, distância diária, treinos semanais entre outros. Visualize
                seu progresso com clareza e ajuste seus treinos para alcançar
                novos resultados superando seus limites!
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "#1976d2" }}>
        <Typography
          data-aos="fade-down"
          variant={isMobile ? "h5" : "h3"}
          color="#fff"
          textAlign="center"
          fontFamily='"Calistoga", "Roboto", "Helvetica", "Arial", sans-serif;'
          sx={{ paddingBottom: { xs: 2, lg: 0 } }}
        >
          e muito mais!
        </Typography>
      </Box>
      <Box
        component="img"
        src={waveDivider}
        alt="Divider"
        sx={{
          display: "block",
        }}
      />
      <Box
        sx={{
          height: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(8, 37, 60)",
          gap: "2rem",
          paddingBottom: "100px",
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h3"}
          color="#fff"
          textAlign="center"
        >
          Pronto para melhorar seus treinos?<br></br>Comece a monitorar seu
          desempenho agora mesmo!
        </Typography>
        <Button
          data-aos="flip-up"
          component={RouterLink}
          to="/login/criar"
          variant="contained"
          sx={{ paddingX: 3, paddingY: 1.5 }}
        >
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
