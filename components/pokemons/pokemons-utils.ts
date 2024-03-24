import { Ability, NamedAPIResourceList, Pokemon } from "pokenode-ts";

import { pokemonInstance } from "~/apis/client";
import { parseOffsetLimitFromUrl } from "~/components/pokemons/shared/pagination/pagination-utils";
import type {
  PokemonDataList,
  PokemonDataGet,
  BaseParams,
  SortType,
} from "~/components/pokemons/shared/types";

export function pokemonsMapper(
  items: PokemonDataList[],
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

export function pokemonDataMapper(data: Pokemon): PokemonDataList {
  return {
    id: data.id,
    name: data.name,
    thumbnailUrl: data.sprites.front_default,
    types: data.types,
  };
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
    if (params.sort.byName) {
      pokemons = await sortPokemonsByName(pokemons, {
        byName: params.sort.byName,
      });
    }
  }

  const pokemonDataList = await Promise.all<PokemonDataList>(
    pokemons.results.map(async (pokemon) => {
      const pokemonData = await pokemonInstance.getPokemonByName(pokemon.name);
      return pokemonDataMapper(pokemonData);
    }),
  );

  return pokemonsMapper(pokemonDataList, pokemons);
}

export interface FilterParams {
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

interface SortParams {
  byName: SortType | undefined;
}

export interface SortByNameParams extends SortParams {}

export async function sortPokemonsByName(
  pokemons: NamedAPIResourceList,
  params: SortByNameParams,
): Promise<NamedAPIResourceList> {
  const sortedPokemons = pokemons.results.sort((a, b) =>
    params.byName == "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name),
  );

  return {
    ...pokemons,
    results: sortedPokemons,
  };
}

export interface GetPokemonParams {
  name: string;
}

export async function getPokemon({
  name,
}: GetPokemonParams): Promise<PokemonDataGet> {
  const pokemonData = await pokemonInstance.getPokemonByName(name);
  const pokemonAbilityData = await pokemonInstance.getAbilityById(
    pokemonData.id,
  );

  const abilityNameEn = pokemonAbilityData.names.find(
    ({ language }) => language.name === "en",
  );

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    height: pokemonData.height,
    weight: pokemonData.weight,
    abilityName: abilityNameEn?.name || "",
    description: pokemonAbilityData.effect_entries[0]?.effect || "",
    thumbnailUrl: pokemonData.sprites.front_default,
    coverUrl: pokemonData.sprites.other?.home.front_default || "",
    stats: pokemonData.stats,
    types: pokemonData.types,
  };
}
