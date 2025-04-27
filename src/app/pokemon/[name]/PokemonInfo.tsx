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

type PokemonInfoProps = {
  height: number;
  weight: number;
  habitat: string;
  color: string;
  shape: string;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  evolutions: string[];
};

export default function PokemonInfo({
  height,
  weight,
  habitat,
  color,
  shape,
  abilities,
  stats,
  evolutions,
}: PokemonInfoProps) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
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
                sx={{ width: "80px", textTransform: "capitalize" }}
              >
                Habitat
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", textTransform: "capitalize" }}
              >
                {habitat.split('-').join(' ')}
              </Typography>
            </Box>

            <Box display="flex" alignItems="flex-start" gap={2} mb="20px">
              <Typography
                variant="body2"
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
          </TabPanel>
          <TabPanel value="2">
            <div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {stats.map((stat) => {
                  // Função para definir a cor com base no valor
                  const getColor = (value: number) => {
                    if (value > 80) return "#4caf50"; // verde
                    if (value < 40) return "#f44336"; // vermelho
                    return "#ff9800"; // laranja
                  };

                  const getName = (value: string) => {
                    if (value === "special-attack") return "Sp. Atk";
                    if (value === "special-defense") return "Sp. Def";
                    if (value === "attack") return "Atk";
                    if (value === "defense") return "Def";
                    if (value === "speed") return "Speed";
                    if (value === "hp") return "HP";
                    return value.charAt(0).toUpperCase() + value.slice(1); // Capitaliza o restante
                  };

                  return (
                    <li key={stat.stat.name} style={{ marginBottom: "20px" }}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography
                          variant="body2"
                          sx={{ width: "80px", textTransform: "capitalize" }}
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
                          value={Math.min((stat.base_stat / 150) * 100, 100)} // Assume 200 como máximo
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
            <div>
              <h3>Evolution Chain</h3>
              {evolutions.length > 0 ? (
                <ul>
                  {evolutions.map((evolution) => (
                    <li key={evolution}>{evolution}</li>
                  ))}
                </ul>
              ) : (
                <p>No evolutions found.</p>
              )}
            </div>
          </TabPanel>
          <TabPanel value="4">
            <div>
              <h3>Abilities</h3>
              <ul>
                {abilities.map((ability) => (
                  <li key={ability.ability.name}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
      <div className={styles.statsGrid}></div>
    </div>
  );
}
