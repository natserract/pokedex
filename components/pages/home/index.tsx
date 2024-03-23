import { pokemonInstance } from "~/apis/client";
import { PokemonsCard } from "~/components/pokemons-card";

export async function Pokemons({}: {}) {
  const pokemons = await pokemonInstance.listPokemons(0, 20);

  return (
    <div className="">
      {pokemons.results.map((pokemon) => {
        return (
          <PokemonsCard
            key={pokemon.name}
            name={pokemon.name}
            imgUrl={pokemon.url}
          />
        );
      })}
    </div>
  );
}
