import api from "@/lib/pokeapi";
import PokemonCards from "./PokemonCards";
import styles from "./page.module.css";
import PokemonPagination from "./PokemonPagination";
import PokemonSearch from "./PokemonSearch";

export default async function Home({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const currentPage = Number(
    typeof searchParams?.page === "string" ? searchParams.page : 1
  ) || 1;

  const limit = 20;
  const offset = (currentPage - 1) * limit;

  const pokemonList = await api.listPokemons(offset, limit);
  const totalPages = Math.ceil(pokemonList.count / limit);

  return (
    <main className={styles.pokedexContainer}>
      <h1 className={styles.title}>Pokédex</h1>
      <PokemonSearch />
      <div className={styles.pokemonGrid}>
        {pokemonList.results.map((pokemon, index) => (
          <PokemonCards key={index} name={pokemon.name} />
        ))}
      </div>
      <PokemonPagination totalPages={totalPages} currentPage={currentPage} />
    </main>
  );
}
