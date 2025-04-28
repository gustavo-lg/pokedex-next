"use client";
import Link from "next/link";
import api from "@/lib/pokeapi";
import styles from "./page.module.css";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Usando useSearchParams para acessar os parâmetros de URL

interface PokemonCardProps {
  name: string;
}

interface PokemonType {
  type: {
    name: string;
  };
}

export default function PokemonCard({ name }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Usando useSearchParams para acessar os parâmetros de URL
  const searchParams = useSearchParams();
  const page = searchParams.get("page"); // Agora usamos get() para acessar parâmetros

  // Garantir que se 'page' não existir, usamos '1' por padrão
  const currentPage = page ? parseInt(page) : 1;

  useEffect(() => {
    // Resetando o estado de loading sempre que a URL mudar
    setLoading(true);

    const fetchPokemon = async () => {
      try {
        const data = await api.getPokemonByName(name);
        setPokemon(data);
      } catch (err) {
        setError("Failed to load Pokémon");
        console.error(err);
      } finally {
        // Timeout para garantir que o loading seja desativado depois de 2 segundos
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    // Garantir que 'page' não seja null ou undefined antes de fazer a requisição
    if (currentPage) {
      fetchPokemon();
    } else {
      setError("Page parameter is missing");
      setLoading(false);
    }
  }, [name, currentPage]); // 'currentPage' é agora a dependência do useEffect

  if (loading) {
    return (
      <Box className={styles.pokemonCard}>
        <Stack
          spacing={2}
          maxWidth="224px"
          height="110px"
          p="15px"
          border="1px solid #eee"
          borderRadius="12px"
        >
          <Skeleton
            sx={{ borderRadius: "12px", bgcolor: "#999" }}
            variant="rectangular"
            width="80%"
            height={22}
            animation="pulse"
          />
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ justifyContent: "space-between" }}
          >
            <Stack spacing={2} alignItems="center">
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
              sx={{
                bgcolor: "#999",
                width: { xs: 30, sm: 50 },
                height: { xs: 30, sm: 50 },
              }}
              variant="circular"
              animation="pulse"
            />
          </Stack>
        </Stack>
      </Box>
    );
  }

  if (error || !pokemon) {
    return (
      <Box className={styles.pokemonCard}>
        <div className={`${styles.cardContent} ${styles.errorCard}`}>
          <h2 className={styles.pokemonName}>{name}</h2>
          <p>{error || "Pokémon not found"}</p>
        </div>
      </Box>
    );
  }

  const primaryType = pokemon.types[0]?.type?.name || "normal";
  const typeClass = `type${primaryType
    .charAt(0)
    .toUpperCase()}${primaryType.slice(1)}`; // Capitalizando o tipo
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default ||
    "/images/pokemon-fallback.png";

  return (
    <Link href={`/pokemon/${name}`} className={styles.pokemonCard}>
      <div className={`${styles.cardContent} ${styles[typeClass]}`}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h2 className={styles.pokemonName}>{name}</h2>
            <div className={styles.typesContainer}>
              {pokemon.types.map((type: PokemonType, index: number) => {
                const typeName = type.type.name;
                const typeClass = `type${typeName
                  .charAt(0)
                  .toUpperCase()}${typeName.slice(1)}`;
                return (
                  <span
                    key={`${type.type.name}-${index}`}
                    className={`${styles.typeBadge} ${
                      styles[`${typeClass}Badge`]
                    }`}
                  >
                    {typeName}
                  </span>
                );
              })}
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.imageContainer}>
              <Image
                src={imageUrl}
                alt={name}
                width={100}
                height={100}
                className={styles.pokemonImage}
                priority={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/pokemon-fallback.png";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
