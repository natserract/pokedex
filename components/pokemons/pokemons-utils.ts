import { NamedAPIResourceList, PokemonType } from "pokenode-ts";
import { pokemonInstance } from "~/apis/client";
import { parseOffsetLimitFromUrl } from "~/components/pokemons/pagination/pagination-utils";

export interface PokemonData {
  id: number;
  name: string;
  imgUrl: string | null;
  types: PokemonType[];
}

export function pokemonsMapper(
  items: PokemonData[],
  data: NamedAPIResourceList,
) {
  return {
    count: data.count,
    next: data.next ? parseOffsetLimitFromUrl(data.next) : undefined,
    previous: data.previous
      ? parseOffsetLimitFromUrl(data.previous)
      : undefined,
    results: items.map((pokemon) => ({
      ...pokemon,
      ...data,
    })),
  };
}

export async function listPokemons(offset: number, limit: number) {
  const pokemons = await pokemonInstance.listPokemons(offset, limit);

  const pokemonDataList = await Promise.all<PokemonData>(
    pokemons.results.map(async (pokemon) => {
      const pokemonData = await pokemonInstance.getPokemonByName(pokemon.name);

      return {
        id: pokemonData.id,
        name: pokemon.name,
        imgUrl: pokemonData.sprites.front_default,
        types: pokemonData.types,
      };
    }),
  );

  return pokemonsMapper(pokemonDataList, pokemons);
}
