import { getAll as getAllPokemons } from "~/apis/pokemons";

export async function Pokemons({}: {}) {
  const pokemons = await getAllPokemons();

  return <div>{JSON.stringify(pokemons)}</div>;
}
