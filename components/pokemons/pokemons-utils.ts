import { NamedAPIResourceList, Pokemon, PokemonType } from "pokenode-ts";
import { pokemonInstance } from "~/apis/client";
import { parseOffsetLimitFromUrl } from "~/components/pokemons/pagination/pagination-utils";

export interface PokemonData {
  id: number;
  name: string;
  imgUrl: string | null;
  types: PokemonType[];
}

export function listPokemonsMapper(
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

export async function listPokemons(offset: number, limit: number) {
  const pokemons = await pokemonInstance.listPokemonForms(offset, limit);

  const pokemonDataList = await Promise.all<PokemonData>(
    pokemons.results.map(async (pokemon) => {
      const pokemonData = await pokemonInstance.getPokemonByName(pokemon.name);
      return pokemonDataMapper(pokemonData);
    }),
  );

  return listPokemonsMapper(pokemonDataList, pokemons);
}

interface FilterParams {
  name: string;
}

export async function filterPokemons(params: FilterParams) {
  const pokemons = await pokemonInstance.listPokemonForms();
  const filteredPokemons = pokemons.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(params.name.toLowerCase()),
  );

  // Fetch the individual Pokémon data for the filtered list
  const pokemonDataList = await Promise.all(
    filteredPokemons.map(async (pokemon) => {
      const pokemonData = await pokemonInstance.getPokemonByName(pokemon.name);
      return pokemonDataMapper(pokemonData);
    }),
  );

  return listPokemonsMapper(pokemonDataList, pokemons);
}

interface SortParams {
  offset: number;
  limit: number;
}

interface SortByNameParams extends SortParams {
  name: string;
}

export async function sortPokemonsByName(params: SortByNameParams) {
  const pokemons = await listPokemons(params.offset, params.limit);

  // Sort the Pokémon list by name
  const sortedPokemons = pokemons.results.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return sortedPokemons;
}
