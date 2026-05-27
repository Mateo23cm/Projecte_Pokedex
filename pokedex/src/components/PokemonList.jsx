import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getPokemonsWithDetails } from "../api/api";
import Grid from "@mui/material/Grid";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const data = await getPokemonsWithDetails(1025);
        setPokemons(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  if (loading) return <p>Carregant...</p>;

  return (
    <section className="llista_pokemon">
      <h2>Llistat de Pokemons</h2>

      <Grid container spacing={3}>
        {pokemons.map((pokemon) => (
          <Grid
            key={pokemon.id}
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            className="reixeta_pokemon"
          >
            <Link to={`/pokemon/${pokemon.id}`} className="targeta_pokemon">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="imatge_pokemon"
              />
              <p className="nom_pokemon">{pokemon.name}</p>
            </Link>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}