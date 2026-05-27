import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPokemon } from "../api/api";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await getPokemon(id);
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  if (loading) return <p>Carregant...</p>;
  if (!pokemon) return <p>No s'ha trobat el Pokémon.</p>;

  return (
    <section className="estat_pokemon">
      <div className="nom_estat">{pokemon.name}</div>
      
      <div className="sprites_pokemon">
        <div className="fila_sprites">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <img
            src={pokemon.sprites.back_default}
            alt={pokemon.name}
          />
        </div>
        <div className="fila_sprites">
          <img
            src={pokemon.sprites.front_shiny}
            alt={pokemon.name}
          />
          <img
            src={pokemon.sprites.back_shiny}
            alt={pokemon.name}
          />
        </div>
      </div>

      <div className="info_basica">
        <div className="caracteristica">
          <span className="etiqueta">Alçada</span>
          <span className="valor">{pokemon.height} m</span>
        </div>
        <div className="caracteristica">
          <span className="etiqueta">Pes</span>
          <span className="valor">{pokemon.weight} kg</span>
        </div>
      </div>

      <div className="tipus_container">
        <div className="etiqueta_seccion">Tipus</div>
        <div className="tipus_lista">
          {pokemon.types.map((type) => (
            <span key={type.type.name} className="tipus_badge">
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="stats_container">
        <div className="etiqueta_seccion">Estadístiques</div>
        <div className="stats_grid">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="stat_item">
              <span className="stat_nom">{stat.stat.name}</span>
              <span className="stat_valor">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="habilitats_container">
        <div className="etiqueta_seccion">Habilitats</div>
        <div className="habilitats_lista">
          {pokemon.abilities.map((ability) => (
            <span key={ability.ability.name} className="habilitat_badge">
              {ability.ability.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}