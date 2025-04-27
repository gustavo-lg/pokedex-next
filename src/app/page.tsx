import api from '@/lib/pokeapi';
import Link from 'next/link';
import styles from './page.module.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default async function Home() {
  const pokemonList = await api.listPokemons(0, 20);

  return (
    <main className={styles.pokedexContainer}>
      <h1 className={styles.title}>Pokédex</h1>

      <div className={styles.pokemonGrid}>
        {pokemonList.results.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </main>
  );
}

async function PokemonCard({ name }: { name: string }) {
  const pokemon = await api.getPokemonByName(name);
  const typeClass = `type${pokemon.types[0].type.name.charAt(0).toUpperCase()}${pokemon.types[0].type.name.slice(1)}`;

  return (
    <Link href={`/pokemon/${name}`} className={styles.pokemonCard}>
      <div className={`${styles.cardContent} ${styles.typeBadge} ${styles[typeClass]}`}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h2 className={styles.pokemonName}>
              {name}
            </h2>
            <div className={styles.typesContainer}>
              {pokemon.types.map((type) => {
                const typeClass = `type${type.type.name.charAt(0).toUpperCase()}${type.type.name.slice(1)}`;
                return (
                  <span
                    key={type.type.name}
                    className={`${styles.typeBadge} ${styles[typeClass]}Badge`}
                  >
                    {type.type.name}
                  </span>
                );
              })}
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.imageContainer}>
              <img
                src={pokemon.sprites.front_default || ''}
                alt={name}
                className={styles.pokemonImage}
              />
            </div>
          </div>
        </div>
      </div>
    </Link >
  );
}