import api from '@/lib/pokeapi';
import Link from 'next/link';
import styles from './page.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

export default async function PokemonDetail({
    params,
}: {
    params: { name: string };
}) {
    const pokemon = await api.getPokemonByName(params.name);

    return (
        <main className={styles.detailContainer}>
            <Link href="/" className={styles.backLink}>
                <ArrowBackIcon sx={{ color: '#111' }} />
            </Link>

            <div className={styles.pokemonDetail}>
                <div className={styles.detailLayout}>
                    <div className={styles.imageColumn}>
                        <img
                            src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default || ''}
                            alt={pokemon.name}
                        />
                    </div>

                    <div className={styles.infoColumn}>
                        <h1 className={styles.pokemonTitle}>{pokemon.name}</h1>

                        <div className={styles.typesContainer}>
                            {pokemon.types.map((type) => {
                                const typeClass = `type${type.type.name.charAt(0).toUpperCase()}${type.type.name.slice(1)}`;
                                return (
                                    <span
                                        key={type.type.name}
                                        className={`${styles.typeBadge} ${styles[typeClass]}`}
                                    >
                                        {type.type.name}
                                    </span>
                                );
                            })}
                        </div>

                        <div className={styles.statsGrid}>
                            <div>
                                <h3>Height</h3>
                                <p>{(pokemon.height / 10).toFixed(1)} m</p>
                            </div>
                            <div>
                                <h3>Weight</h3>
                                <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
                            </div>
                            <div>
                                <h3>Abilities</h3>
                                <ul>
                                    {pokemon.abilities.map((ability) => (
                                        <li key={ability.ability.name}>
                                            {ability.ability.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3>Stats</h3>
                                <ul>
                                    {pokemon.stats.map((stat) => (
                                        <li key={stat.stat.name}>
                                            {stat.stat.name}: {stat.base_stat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}