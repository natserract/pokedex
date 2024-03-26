import type { PokemonStat, Pokemon, PokemonType } from "~/types/models";

export interface BaseParams {
  offset: number;
  limit: number;
}

export interface PokemonDataList extends Pick<Pokemon, "height" | "weight"> {
  id: number;
  name: string;
  types: PokemonType[];
  thumbnailUrl?: string | null;
}

export interface PokemonDataGet extends PokemonDataList {
  abilityName: string;
  coverUrl: string | null;
  description: string;
  stats: PokemonStat[];
}

export type SortType = "asc" | "desc";
