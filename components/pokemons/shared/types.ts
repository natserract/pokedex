import type { PokemonType, Pokemon, PokemonStat } from "pokenode-ts";

export interface BaseParams {
  offset: number;
  limit: number;
}

export interface PokemonDataList {
  id: number;
  name: string;
  types: PokemonType[];
  thumbnailUrl?: string | null;
}

export interface PokemonDataGet
  extends PokemonDataList,
    Pick<Pokemon, "height" | "weight"> {
  abilityName: string;
  coverUrl: string | null;
  description: string;
  stats: PokemonStat[];
}

export type SortType = "asc" | "desc";
