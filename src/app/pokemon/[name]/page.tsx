import api from "@/lib/pokeapi";
import Link from "next/link";
import styles from "./page.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PokemonInfo from "./PokemonInfo";

export default async function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await api.getPokemonByName(params.name);
  const typeClass = `type${pokemon.types[0].type.name
    .charAt(0)
    .toUpperCase()}${pokemon.types[0].type.name.slice(1)}`;
  console.log(pokemon);

  const species = await api.getPokemonSpeciesByName(params.name);
  const evolutionChainUrl = species.evolution_chain.url;
  const evolutionChain = await fetch(evolutionChainUrl).then((res) =>
    res.json()
  );

  // Função para extrair a cadeia de evolução
  function extractEvolutionChain(chain: any): string[] {
    const evolutions: string[] = [];
    let current = chain;
    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to[0];
    }
    return evolutions;
  }

  const evolutions = extractEvolutionChain(evolutionChain.chain);

  return (
    <main className={styles.detailContainer}>
      <Link href="/" className={styles.backLink}>
        <ArrowBackIcon sx={{ color: "#111" }} />
      </Link>

      <div className={styles.pokemonDetail}>
        <div className={styles.detailLayout}>
          <div className={`${styles.imageColumn} ${styles[typeClass]}`}>
            <h1 className={styles.pokemonTitle}>{pokemon.name}</h1>

            <div className={styles.typesContainer}>
              {pokemon.types.map((type) => {
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
              src={
                pokemon.sprites.other?.["official-artwork"]?.front_default ||
                pokemon.sprites.front_default ||
                ""
              }
              alt={pokemon.name}
            />
          </div>

          <div className={styles.infoColumn}>
            <PokemonInfo
              height={pokemon.height}
              weight={pokemon.weight}
              abilities={pokemon.abilities}
              stats={pokemon.stats}
              evolutions={evolutions}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
