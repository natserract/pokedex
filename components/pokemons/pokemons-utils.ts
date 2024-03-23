import { NamedAPIResourceList, Pokemon, PokemonType } from "pokenode-ts";

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

export function pokemonDataMapper(data: Pokemon) {
  return {
    id: data.id,
    name: data.name,
    imgUrl: data.sprites.front_default,
    types: data.types,
  };
}

interface BaseParams {
  offset: number;
  limit: number;
}

export interface ListPokemonsParams extends BaseParams {
  query?: FilterParams;
  sort?: SortParams;
}

export async function listPokemons(params: ListPokemonsParams) {
  let pokemons = await pokemonInstance.listPokemons(
    params.offset,
    params.limit,
  );

  if (params.query) {
    pokemons = await filterPokemons(pokemons, {
      name: encodeURIComponent(params.query.name as string),
    });
  }

  if (params.sort) {
    if (params.sort.name) {
      pokemons = await sortPokemonsByName(pokemons, {
        name: params.sort.name,
      });
    }
  }

  const pokemonDataList = await Promise.all<PokemonData>(
    pokemons.results.map(async (pokemon) => {
      const pokemonData = await pokemonInstance.getPokemonByName(pokemon.name);
      return pokemonDataMapper(pokemonData);
    }),
  );

  return pokemonsMapper(pokemonDataList, pokemons);
}

interface FilterParams {
  name: string;
}

export async function filterPokemons(
  pokemons: NamedAPIResourceList,
  params: FilterParams,
): Promise<NamedAPIResourceList> {
  const filteredPokemons = pokemons.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(params.name.toLowerCase()),
  );

  return {
    ...pokemons,
    results: filteredPokemons,
  };
}

export type SortType = "asc" | "desc";

interface SortParams {
  name: SortType | undefined;
}

interface SortByNameParams extends SortParams {}

export async function sortPokemonsByName(
  pokemons: NamedAPIResourceList,
  params: SortByNameParams,
): Promise<NamedAPIResourceList> {
  const sortedPokemons = pokemons.results.sort((a, b) =>
    params.name == "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name),
  );

  return {
    ...pokemons,
    results: sortedPokemons,
  };
}
