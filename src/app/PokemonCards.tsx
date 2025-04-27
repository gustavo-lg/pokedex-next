import Link from 'next/link';
import api from '@/lib/pokeapi';
import styles from './page.module.css';

interface PokemonCardProps {
  name: string;
}

export default async function PokemonCard({ name }: PokemonCardProps) {
  const pokemon = await api.getPokemonByName(name);
  const typeClass = `type${pokemon.types[0].type.name.charAt(0).toUpperCase()}${pokemon.types[0].type.name.slice(1)}`;

  return (
    <Link href={`/pokemon/${name}`} className={styles.pokemonCard}>
      <div className={`${styles.cardContent} ${styles.typeBadge} ${styles[typeClass]}`}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h2 className={styles.pokemonName}>{name}</h2>
            <div className={styles.typesContainer}>
              {pokemon.types.map((type: any) => {
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
    </Link>
  );
}
