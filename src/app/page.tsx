import api from "@/lib/pokeapi";
import PokemonCards from "./PokemonCards";
import styles from "./page.module.css";
import { Suspense } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default async function Home() {
  const pokemonList = await api.listPokemons(0, 20);

  return (
    <main className={styles.pokedexContainer}>
      <h1 className={styles.title}>Pokédex</h1>

      <div className={styles.pokemonGrid}>
        {pokemonList.results.map((pokemon) => (
          <Suspense
            key={pokemon.name}
            fallback={
              <Box className={styles.pokemonCard}>
                <Stack spacing={2} maxWidth="224px" height="120px" p="15px" border="1px solid #eee" borderRadius="12px">
                  <Skeleton
                    sx={{ borderRadius: "12px", bgcolor: "#999" }}
                    variant="rectangular"
                    width="80%"
                    height={22}
                    animation="pulse"
                  />
                  <Stack direction="row" spacing={2} alignItems="center" sx={{justifyContent:"space-between"}}>
                    <Stack  spacing={2} alignItems="center">
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
                    </Stack>
                    <Skeleton
                      sx={{ bgcolor: "#999" }}
                      variant="circular"
                      width={50}
                      height={50}
                      animation="pulse"
                    />
                  </Stack>
                </Stack>
              </Box>
            }
          >
            <PokemonCards name={pokemon.name} />
          </Suspense>
        ))}
      </div>
    </main>
  );
}
