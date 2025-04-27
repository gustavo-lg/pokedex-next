"use client";
import * as React from "react";
import styles from "./page.module.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";

type PokemonInfoProps = {
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  evolutions: string[];
};

export default function PokemonInfo({
  height,
  weight,
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
            <div>
              <h3>Height</h3>
              <p>{(height / 10).toFixed(1)} m</p>
            </div>
            <div>
              <h3>Weight</h3>
              <p>{(weight / 10).toFixed(1)} kg</p>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div>
              <h3>Stats</h3>
              <ul>
                {stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
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
