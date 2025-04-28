"use client";
import * as React from "react";
import styles from "./page.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

type PokemonSprites = {
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
  front_default: string | null;
};

type PokemonInfoProps = {
  name: string;
  height: number;
  weight: number;
  habitat: string;
  moves: { move: { name: string } }[];
  color: string;
  shape: string;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  evolutions: string[];
  types: { type: { name: string } }[];
  sprites: PokemonSprites;
};

export default function PokemonInfo({
  name,
  height,
  weight,
  habitat,
  color,
  shape,
  abilities,
  stats,
  evolutions,
  moves,
  types,
  sprites,
}: PokemonInfoProps) {
  const [value, setValue] = React.useState("1");
  const [showAllMoves, setShowAllMoves] = useState(false);
  const [loading, setLoading] = useState(true); // Controla o estado de carregamento

  useEffect(() => {
    // Simula o carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Ajuste o tempo conforme necessário para simular o carregamento

    return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
  }, []);

  const handleShowAll = () => {
    setShowAllMoves(true);
  };

  const movesToShow = showAllMoves ? moves : moves.slice(0, 10);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Ajuste para tipo de Pokémon
  const typeClass = `type${types[0].type.name
    .charAt(0)
    .toUpperCase()}${types[0].type.name.slice(1)}`;

  return (
    <div className={styles.pokemonDetail}>
      {/* Quando o componente estiver carregando, o Skeleton será exibido. Quando terminar, o conteúdo real será renderizado */}
      {loading ? (
        <Stack
          spacing={2}
          maxWidth="800px"
          maxHeight={{ xs: "800px", sm: "442px" }}
          height={{sm: "360px"}}
          p="40px 30px"
          border="1px solid #eee"
          borderRadius="12px"
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", height: '100%' }}>
            <Stack
              width={{ xs: "100%", sm: "50%" }}
              sx={{
                '@media (max-width: 600px)': {
                  minHeight: '442px', // Aplica a altura mínima de 442px apenas em telas pequenas
                }, }}
            >
              <Skeleton
                sx={{ borderRadius: "12px", bgcolor: "#999" }}
                variant="rectangular"
                width="80%"
                height={25}
                animation="pulse"
              />
              <Stack spacing={2} sx={{ height: "100%" }}>
                <Box sx={{ display: "flex", gap: "10px", pt: "16px" }}>
                  <Skeleton
                    sx={{ borderRadius: "12px", bgcolor: "#999" }}
                    variant="rectangular"
                    width="85px"
                    height={25}
                    animation="pulse"
                  />
                  <Skeleton
                    sx={{ borderRadius: "12px", bgcolor: "#999" }}
                    variant="rectangular"
                    width="85px"
                    height={25}
                    animation="pulse"
                  />
                </Box>
                <Skeleton
                  sx={{
                    borderRadius: "99px",
                    bgcolor: "#999",
                    alignSelf: "center",
                    margin: "auto !important",
                  }}
                  variant="circular"
                  width="200px"
                  height="200px"
                  animation="pulse"
                />
              </Stack>
            </Stack>
            <Stack
              width={{ xs: "100%", sm: "50%" }}
              sx={{
                '@media (max-width: 600px)': {
                  minHeight: '400px', // Aplica a altura mínima de 442px apenas em telas pequenas
                }, }}
            >
              <Box sx={{ display: "flex", gap: "10px", pb: "16px" }}>
                <Skeleton
                  sx={{ borderRadius: "12px", bgcolor: "#999" }}
                  variant="rectangular"
                  width="25%"
                  height={25}
                  animation="pulse"
                />
                <Skeleton
                  sx={{ borderRadius: "12px", bgcolor: "#999" }}
                  variant="rectangular"
                  width="25%"
                  height={25}
                  animation="pulse"
                />
                <Skeleton
                  sx={{ borderRadius: "12px", bgcolor: "#999" }}
                  variant="rectangular"
                  width="25%"
                  height={25}
                  animation="pulse"
                />
                <Skeleton
                  sx={{ borderRadius: "12px", bgcolor: "#999" }}
                  variant="rectangular"
                  width="25%"
                  height={25}
                  animation="pulse"
                />
              </Box>
              <Skeleton
                sx={{
                  borderRadius: "12px",
                  bgcolor: "#999",
                  margin: "auto !important",
                }}
                variant="rectangular"
                width="100%"
                height={280}
                animation="pulse"
              />
            </Stack>
          </Box>
        </Stack>
      ) : (
        <div className={styles.detailLayout}>
          <div className={`${styles.imageColumn} ${styles[typeClass]}`}>
            <h1 className={styles.pokemonTitle}>{name}</h1>

            <div className={styles.typesContainer}>
              {types.map((type) => {
                const typeClass = `type${type.type.name
                  .charAt(0)
                  .toUpperCase()}${type.type.name.slice(1)}`;
                return (
                  <span
                    key={type.type.name}
                    className={`${styles.typeBadge} ${styles[typeClass]} ${styles[typeClass]}Badge`}
                  >
                    {type.type.name}
                  </span>
                );
              })}
            </div>
            <img
              src={sprites?.other?.["official-artwork"]?.front_default || ""}
              alt={name}
            />
          </div>

          <div className={styles.infoColumn}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    sx={{
                      "& .MuiTab-root": {
                        minWidth: "25%",
                        padding: "6px 12px",
                        marginRight: "0px",
                        color: "#ccc",
                      },
                      "& .Mui-selected ": {
                        color: "#111",
                      },
                    }}
                    className={styles.tabTitle}
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    textColor="inherit"
                  >
                    <Tab label="About" value="1" />
                    <Tab label="Stats" value="2" />
                    <Tab label="Evolution" value="3" />
                    <Tab label="Moves" value="4" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box display="flex" alignItems="flex-start" gap={2} mb="20px">
                    <Typography
                      variant="body2"
                      color="#ccc"
                      sx={{ width: "80px", textTransform: "capitalize" }}
                    >
                      Height
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {(height / 10).toFixed(1)}m
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="flex-start" gap={2} mb="20px">
                    <Typography
                      variant="body2"
                      color="#ccc"
                      sx={{ width: "80px", textTransform: "capitalize" }}
                    >
                      Weight
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {(weight / 10).toFixed(1)}kg
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="flex-start" gap={2} mb="20px">
                    <Typography
                      variant="body2"
                      color="#ccc"
                      sx={{ width: "80px", textTransform: "capitalize" }}
                    >
                      Habitat
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                    >
                      {habitat.split("-").join(" ")}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="flex-start" gap={2} mb="20px">
                    <Typography
                      variant="body2"
                      color="#ccc"
                      sx={{ width: "80px", textTransform: "capitalize" }}
                    >
                      Color
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                    >
                      {color}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="flex-start" gap={2} mb="20px">
                    <Typography
                      variant="body2"
                      color="#ccc"
                      sx={{ width: "80px", textTransform: "capitalize" }}
                    >
                      Shape
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                    >
                      {shape}
                    </Typography>
                  </Box>

                  {abilities.length > 0 && (
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      gap={2}
                      mb="20px"
                    >
                      <Typography
                        variant="body2"
                        color="#ccc"
                        sx={{ width: "80px", textTransform: "capitalize" }}
                      >
                        Abilities
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      >
                        {abilities.map((ability, index) => (
                          <React.Fragment key={ability.ability.name}>
                            {ability.ability.name.split("-").join(" ")}
                            {index !== abilities.length - 1 && ", "}
                          </React.Fragment>
                        ))}
                      </Typography>
                    </Box>
                  )}
                </TabPanel>

                <TabPanel value="2">
                  <div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {stats.map((stat) => {
                        const getColor = (value: number) => {
                          if (value > 80) return "#4caf50"; // verde
                          if (value < 40) return "#f44336"; // vermelho
                          return "#ff9800"; // laranja
                        };

                        const getName = (value: string) => {
                          const names: { [key: string]: string } = {
                            "special-attack": "Sp. Atk",
                            "special-defense": "Sp. Def",
                            attack: "Atk",
                            defense: "Def",
                            speed: "Speed",
                            hp: "HP",
                          };
                          return (
                            names[value] ||
                            value.charAt(0).toUpperCase() + value.slice(1)
                          );
                        };

                        return (
                          <li
                            key={stat.stat.name}
                            style={{ marginBottom: "20px" }}
                          >
                            <Box display="flex" alignItems="center" gap={2}>
                              <Typography
                                variant="body2"
                                color="#ccc"
                                sx={{
                                  width: "80px",
                                  textTransform: "capitalize",
                                }}
                              >
                                {getName(stat.stat.name)}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: "bold", width: "30px" }}
                              >
                                {stat.base_stat}
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={Math.min(
                                  (stat.base_stat / 150) * 100,
                                  100
                                )} // Assume 150 como máximo
                                sx={{
                                  flexGrow: 1,
                                  height: 8,
                                  borderRadius: 5,
                                  backgroundColor: "#eee",
                                  "& .MuiLinearProgress-bar": {
                                    backgroundColor: getColor(stat.base_stat),
                                  },
                                }}
                              />
                            </Box>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </TabPanel>

                <TabPanel value="3">
                  {evolutions.length > 0 ? (
                    evolutions.map((evolution, index) => (
                      <Box
                        display="flex"
                        alignItems="flex-start"
                        gap={2}
                        mb="20px"
                        key={index}
                      >
                        <Typography
                          variant="body2"
                          color="#ccc"
                          sx={{ width: "80px", textTransform: "capitalize" }}
                        >
                          {["First", "Second", "Third", "Fourth", "Fifth"][
                            index
                          ] || `${index + 1}th`}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {evolution}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <p>No evolutions found</p>
                  )}
                </TabPanel>

                <TabPanel value="4">
                  {moves.length > 0 && (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      gap={2}
                    >
                      <Box
                        display="flex"
                        alignItems="flex-start"
                        gap={2}
                        sx={{ maxHeight: "245px", overflowY: "auto" }}
                      >
                        <Typography
                          variant="body2"
                          color="#ccc"
                          sx={{ width: "80px", textTransform: "capitalize" }}
                        >
                          Moves
                        </Typography>
                        {movesToShow.map((moveObj, index) => (
                          <Typography
                            key={index}
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              textTransform: "capitalize",
                            }}
                            display="contents"
                          >
                            {moveObj.move.name.split("-").join(" ")}
                            {index !== movesToShow.length - 1 && ", "}
                          </Typography>
                        ))}
                      </Box>

                      {/* Botão Ver Mais */}
                      <Box mt={3} sx={{ ml: "auto" }}>
                        <Button
                          onClick={handleShowAll}
                          disabled={showAllMoves}
                          variant="contained"
                        >
                          Show all
                        </Button>
                      </Box>
                    </Box>
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}
