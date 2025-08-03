import api from "@/lib/pokeapi";
import Link from "next/link";
import styles from "./page.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PokemonInfo from "./PokemonInfo";

interface EvolutionChainLink {
  species: {
    name: string;
  };
  evolves_to: EvolutionChainLink[];
}

// Função assíncrona que executa SSR e retorna os dados prontos
async function getPokemonData(name: string) {
  const pokemon = await api.getPokemonByName(name);
  const species = await api.getPokemonSpeciesByName(name);
  const evolutionChainUrl = species?.evolution_chain?.url;
  const evolutionChain = await fetch(evolutionChainUrl).then((res) => res.json());

  // Função para extrair a cadeia de evolução
  function extractEvolutionChain(chain: EvolutionChainLink): string[] {
    const evolutions: string[] = [];
    let current = chain;
    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to[0];
    }
    return evolutions;
  }

  const evolutions = extractEvolutionChain(evolutionChain.chain);
  const habitat = species?.habitat?.name;
  const color = species?.color?.name;
  const shape = species?.shape?.name;

  return { pokemon, evolutions, habitat, color, shape };
}

// A correção está aqui:
export default async function PokemonDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const resolvedParams = await params;
  const { pokemon, evolutions, habitat, color, shape } = await getPokemonData(
    resolvedParams.name
  );

  return (
    <main className={styles.detailContainer}>
      <Link href="/" className={styles.backLink}>
        <ArrowBackIcon sx={{ color: "#111" }} />
      </Link>

      <PokemonInfo
        name={pokemon.name}
        height={pokemon.height}
        weight={pokemon.weight}
        moves={pokemon.moves}
        abilities={pokemon.abilities}
        stats={pokemon.stats}
        evolutions={evolutions}
        habitat={habitat}
        color={color}
        shape={shape}
        sprites={pokemon.sprites}
        types={pokemon.types}
      />
    </main>
  );
}