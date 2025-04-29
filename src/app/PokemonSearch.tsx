"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import api from "@/lib/pokeapi";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";

interface Pokemon {
  name: string;
  url: string;
}

export default function PokemonSearch() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);

      try {
        const [data] = await Promise.all([
          api.listPokemons(0, 1000),
          new Promise((res) => setTimeout(res, 1000)), // garante loading de pelo menos 1s
        ]);

        const filtered = data.results.filter((pokemon: Pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
      } catch (error) {
        console.error("Failed to search pokémons", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (!mounted) return null;

  return (
    <Box
      width="100%"
      maxWidth="400px"
      mx="auto"
      sx={{
        position: { xs: "static", md: "absolute" },
        zIndex: { xs: 2, md: 2 },
        left: { xs: 0, md: "0" },
        right: { xs: 0, md: "0" },
        top: { xs: "24px", md: "24px" },
      }}
    >
      <TextField
        fullWidth
        label="Search for Pokémon"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        margin="normal"
        size="small"
      />
      {loading ? (
        <Box display="flex" justifyContent="center" mt={0} bgcolor="#f5f5f5" p={3}>
          <CircularProgress />
        </Box>
      ) : (
        <List
          sx={{
            maxHeight: "245px",
            overflowY: "auto",
            bgcolor: "#f5f5f5",
            position: { xs: "absolute", md: "inherit" },
            zIndex: 3,
          }}
        >
          {results.map((pokemon) => (
            <ListItem
              key={pokemon.name}
              component={NextLink}
              href={`/pokemon/${pokemon.name}`}
              sx={{
                textDecoration: "none",
                color: "inherit",
                "&:hover": { backgroundColor: "#1976d2", color: "white" },
                bgcolor: "#f5f5f5",
              }}
            >
              <ListItemText primary={pokemon.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
